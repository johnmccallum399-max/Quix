#!/usr/bin/env node
/**
 * Link health monitor. Reads the affiliate destinations (env overrides first,
 * then the defaults in lib/links.ts) and flags dead or suspicious links.
 *
 * Usage: node scripts/check-links.mjs
 * Exit code 1 if any link fails, so CI (see .github/workflows/link-health.yml) goes red.
 * Output ends with a ready-to-paste DISABLED_PROGRAMS value for failed slugs.
 */
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../lib/links.ts', import.meta.url), 'utf8');
const block = src.match(/DEFAULT_DESTINATIONS[^{]*\{([\s\S]*?)\n\};/)[1];
const entries = [...block.matchAll(/'?([\w-]+)'?:\s*'(https:\/\/[^']+)'/g)];

const results = [];
for (const [, slug, def] of entries) {
  const envName = `AFFILIATE_URL_${slug.toUpperCase().replace(/-/g, '_')}`;
  const url = process.env[envName] || def;
  const problems = [];
  let status = 0;
  let finalUrl = url;
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (link-health-check)' },
      signal: AbortSignal.timeout(15000),
    });
    status = res.status;
    finalUrl = res.url;
    if (status >= 400) problems.push(`HTTP ${status}`);
    const origin = new URL(url).hostname.replace(/^www\./, '');
    if (!new URL(finalUrl).hostname.includes(origin.split('.').slice(-2).join('.'))) {
      problems.push(`redirected off-domain to ${new URL(finalUrl).hostname}`);
    }
  } catch (err) {
    problems.push(`request failed: ${err.cause?.code ?? err.message}`);
  }
  if (url.includes('affiliate_id')) problems.push('placeholder ref=affiliate_id still in use');
  results.push({ slug, url, status, finalUrl, problems });
}

for (const r of results) {
  console.log(`${r.problems.length ? 'FAIL' : ' ok '}  ${r.slug.padEnd(12)} ${r.status || '---'}  ${r.problems.join('; ')}`);
}
const failed = results.filter((r) => r.problems.length).map((r) => r.slug);
if (failed.length) {
  console.log(`\nTo stop sending traffic to broken links, set:\nDISABLED_PROGRAMS=${failed.join(',')}`);
  process.exit(1);
}
