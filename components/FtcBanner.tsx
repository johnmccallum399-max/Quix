import Link from 'next/link';

/**
 * Clear & conspicuous affiliate disclosure (16 CFR Part 255). Server component,
 * rendered immediately above the comparison table. Kept at readable size and
 * contrast on purpose: a tiny grey line would not meet the "conspicuous" standard.
 */
export default function FtcBanner() {
  return (
    <div
      role="note"
      aria-label="Affiliate disclosure"
      className="mb-4 rounded-lg border border-zinc-800 border-l-4 border-l-amber-400 bg-zinc-900 px-4 py-3 text-sm leading-relaxed text-zinc-200"
    >
      <strong className="font-semibold text-amber-300">
        Earnings &amp; Affiliate Transparency:
      </strong>{' '}
      We benchmark B2B software independently. We may earn a commission when you register through
      our links at no additional charge to you.{' '}
      <Link href="/#methodology" className="text-emerald-400 underline underline-offset-2">
        Learn how we test
      </Link>
      .
    </div>
  );
}
