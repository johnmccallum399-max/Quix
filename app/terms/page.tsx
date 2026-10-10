import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Use' };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 leading-relaxed text-zinc-300">
      <h1 className="mb-6 text-3xl font-bold text-zinc-100">Terms of Use</h1>
      <p className="mb-4 text-sm text-zinc-400">
        Starter text. Have it reviewed before launch.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold text-zinc-100">Information only</h2>
      <p className="mb-4">
        Content on this site is general information, not financial, legal or professional advice.
        Commission rates, pricing and features are provided by third parties, change often, and may be
        out of date. Check the vendor&apos;s own pages before you buy or sign up.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold text-zinc-100">Estimates</h2>
      <p className="mb-4">
        Calculator outputs are illustrative estimates and are not guarantees or typical results.
      </p>
      <h2 className="mb-2 mt-6 text-xl font-semibold text-zinc-100">Liability</h2>
      <p>
        We provide this site as is, and are not liable for decisions made using it, to the extent
        permitted by law.
      </p>
    </main>
  );
}
