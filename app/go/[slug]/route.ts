import { NextRequest, NextResponse } from 'next/server';
import { buildRedirectUrl, isDisabled } from '../../../lib/links';

export const dynamic = 'force-dynamic';

const NO_INDEX = { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' };

/**
 * /go/<slug> -> vendor affiliate link.
 * - Destination comes only from lib/links.ts (no open redirect).
 * - Only utm_* params are forwarded.
 * - Unknown or disabled programs fall back to the comparison table.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const fallback = new URL('/#compare', req.url);

  if (isDisabled(slug)) {
    return NextResponse.redirect(fallback, { status: 302, headers: NO_INDEX });
  }

  const target = buildRedirectUrl(slug, req.nextUrl.searchParams);
  if (!target) {
    return NextResponse.redirect(fallback, { status: 302, headers: NO_INDEX });
  }

  // Minimal, privacy-friendly click log (visible in Vercel/Cloudflare logs). No IPs or cookies.
  console.log(
    JSON.stringify({
      event: 'affiliate_click',
      slug,
      utm_source: req.nextUrl.searchParams.get('utm_source'),
      utm_campaign: req.nextUrl.searchParams.get('utm_campaign'),
      ts: new Date().toISOString(),
    }),
  );

  return NextResponse.redirect(target, { status: 302, headers: NO_INDEX });
}

export const HEAD = GET;
