import 'server-only';
import { PROGRAMS } from './affiliate-data';

/**
 * Server-only affiliate destinations. Kept out of the client bundle so the
 * /go/<slug> redirect is the only public path to them.
 *
 * Replace the `ref=affiliate_id` values with your real tracking links, either
 * here or (preferred) via env vars named AFFILIATE_URL_<SLUG> with dashes as
 * underscores, e.g. AFFILIATE_URL_ALLIAI. Env vars win over defaults.
 */
const DEFAULT_DESTINATIONS: Record<string, string> = {
  reclaim: 'https://reclaim.ai/?ref=affiliate_id',
  woodpecker: 'https://woodpecker.co/?ref=affiliate_id',
  buzz: 'https://buzz.ai/?ref=affiliate_id',
  joiin: 'https://joiin.co/?ref=affiliate_id',
  alliai: 'https://alliai.com/?ref=affiliate_id',
  yourgpt: 'https://yourgpt.ai/?ref=affiliate_id',
  expandi: 'https://expandi.io/?ref=affiliate_id',
  thinkific: 'https://thinkific.com/?ref=affiliate_id',
};

/** Only these query keys are forwarded to the vendor. Everything else is dropped. */
export const FORWARDED_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export function envKey(slug: string): string {
  return `AFFILIATE_URL_${slug.toUpperCase().replace(/-/g, '_')}`;
}

export function isKnownSlug(slug: string): boolean {
  return PROGRAMS.some((p) => p.id === slug);
}

/** Comma-separated slugs in DISABLED_PROGRAMS are treated as expired/broken. */
export function isDisabled(slug: string): boolean {
  return (process.env.DISABLED_PROGRAMS ?? '')
    .split(',')
    .map((s) => s.trim())
    .includes(slug);
}

/** Resolve the destination for a known slug. Never derived from user input. */
export function getDestination(slug: string): string | null {
  if (!isKnownSlug(slug)) return null;
  const raw = process.env[envKey(slug)] ?? DEFAULT_DESTINATIONS[slug];
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Destination plus allow-listed UTM params from the incoming request. */
export function buildRedirectUrl(slug: string, incoming: URLSearchParams): string | null {
  const dest = getDestination(slug);
  if (!dest) return null;
  const url = new URL(dest);
  for (const key of FORWARDED_PARAMS) {
    const value = incoming.get(key);
    if (value && value.length <= 100) url.searchParams.set(key, value);
  }
  return url.toString();
}

export function allDestinations(): { slug: string; url: string | null }[] {
  return PROGRAMS.map((p) => ({ slug: p.id, url: getDestination(p.id) }));
}
