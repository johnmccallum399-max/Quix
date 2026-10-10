import { NextRequest, NextResponse } from 'next/server';
import { buildRedirectUrl, isDisabled, isKnownSlug } from '../../../lib/links';

export const dynamic = 'force-dynamic';

const HEADERS = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' };

/**
 * /go/<slug> -> vendor affiliate link (307).
 * - Destination comes only from lib/links.ts (no open redirect).
 * - Only utm_* params are forwarded.
 * - Unknown slug -> 404. Disabled/misconfigured program -> back to the comparison table.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!isKnownSlug(slug)) {
    return new NextResponse('Not found', {
      status: 404,
      headers: { ...HEADERS, 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const target = isDisabled(slug) ? null : buildRedirectUrl(slug, req.nextUrl.searchParams);
  if (!target) {
    return NextResponse.redirect(new URL('/#compare', req.url), { status: 307, headers: HEADERS });
  }

  // Minimal click log for host logs. No IPs or cookies.
  console.log(
    JSON.stringify({
      event: 'affiliate_click',
      slug,
      utm_source: req.nextUrl.searchParams.get('utm_source'),
      utm_campaign: req.nextUrl.searchParams.get('utm_campaign'),
      ts: new Date().toISOString(),
    }),
  );

  return NextResponse.redirect(target, { status: 307, headers: HEADERS });
}

export const HEAD = GET;
