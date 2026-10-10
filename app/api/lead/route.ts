import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * POST { name, email, company? }  (company is a honeypot; real users leave it empty)
 *
 * Forwards the lead as JSON to LEAD_WEBHOOK_URL (a Systeme.io automation webhook,
 * MailerLite, Make.com, Zapier...). If no webhook is configured the lead is NOT
 * stored anywhere, so outside development we return 503 instead of pretending success.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }

  const { name, email, company } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: pretend success so bots learn nothing.
  if (typeof company === 'string' && company.trim() !== '') {
    return NextResponse.json({ success: true, message: 'Blueprint dispatched' });
  }

  const cleanName = typeof name === 'string' ? name.trim().slice(0, 100) : '';
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase().slice(0, 254) : '';

  if (!cleanName) {
    return NextResponse.json({ success: false, message: 'Please enter your name' }, { status: 400 });
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid email address' },
      { status: 400 },
    );
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[lead] (dev, no LEAD_WEBHOOK_URL set)', { name: cleanName, email: cleanEmail });
      return NextResponse.json({ success: true, message: 'Blueprint dispatched (dev mode)' });
    }
    console.error('[lead] LEAD_WEBHOOK_URL is not configured; lead not captured');
    return NextResponse.json(
      { success: false, message: 'Signup is temporarily unavailable. Please try again soon.' },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        source: 'blueprint-lead-magnet',
        consent: true,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error('[lead] webhook failed', err);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, message: 'Blueprint dispatched' });
}
