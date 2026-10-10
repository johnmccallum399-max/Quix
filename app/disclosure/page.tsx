import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Affiliate Disclosure' };

export default function DisclosurePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 leading-relaxed text-zinc-300">
      <h1 className="mb-6 text-3xl font-bold text-zinc-100">Affiliate &amp; Earnings Disclosure</h1>
      <p className="mb-4">
        B2B Automation Lab is supported by its readers. Many links on this site are affiliate links,
        marked &quot;(Sponsored Link)&quot;. If you click one and buy or sign up, we may earn a
        commission from the company at no additional cost to you.
      </p>
      <h2 className="mb-2 mt-8 text-xl font-semibold text-zinc-100">How this affects our content</h2>
      <p className="mb-4">
        We choose which tools to cover and how we rate them based on our own testing and research.
        Commission rates are shown for transparency and never change a rating or ranking. Some tools
        we cover have no affiliate program, and we will say so.
      </p>
      <h2 className="mb-2 mt-8 text-xl font-semibold text-zinc-100">Earnings figures</h2>
      <p className="mb-4">
        The calculator and any income figures on this site are illustrative estimates based on a
        program&apos;s advertised commission and average account value. They are not guarantees and
        are not typical results. Your results will depend on your audience, effort and the programs&apos;
        current terms, which can change at any time.
      </p>
      <h2 className="mb-2 mt-8 text-xl font-semibold text-zinc-100">Contact</h2>
      <p>Questions about this disclosure? Email the address listed on our contact page.</p>
    </main>
  );
}
