import Link from 'next/link';
import AffiliateTable from '../components/AffiliateTable';

export default function Page() {
  return (
    <main>
      <div id="compare">
        <AffiliateTable />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-12">
        <Link
          href="/blueprint"
          className="block rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6 text-zinc-100 hover:border-emerald-400"
        >
          <span className="font-semibold text-emerald-300">Free download:</span> The 2026 B2B AI
          Multi-Agent Workflow Blueprint →
        </Link>
      </div>
    </main>
  );
}
