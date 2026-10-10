import AffiliateTable from '../components/AffiliateTable';
import JsonLdSchema from '../components/JsonLdSchema';
import LeadMagnet from '../components/LeadMagnet';

const METHOD_STEPS = [
  {
    title: 'Machine-assisted research',
    body: 'We use AI to speed up the slow parts: reading documentation, drafting comparison outlines and spotting gaps in what other reviews cover.',
  },
  {
    title: 'Hands-on testing',
    body: 'A person signs up, uses each tool for a real task and records what worked, what broke and what it cost. Drafts that nobody tested do not get published.',
  },
  {
    title: 'Verification and dates',
    body: 'Prices, limits and commission terms are checked against the vendor’s own pages and stamped with the date we checked them.',
  },
  {
    title: 'Independence',
    body: 'Commission rates appear in the table for transparency. They do not change a tool’s rating or position in our editorial verdicts.',
  },
];

export default function Page() {
  return (
    <main>
      <JsonLdSchema />

      <header className="mx-auto max-w-7xl px-4 pb-4 pt-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          B2B Automation Lab
        </p>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          The B2B Automation Lab: Benchmarks &amp; High-ROI Workflows for 2026
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Compare software and affiliate programs side by side, then estimate what a tool could earn
          or save you before you commit.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <LeadMagnet />
      </div>

      <div id="compare">
        <AffiliateTable />
      </div>

      <section id="methodology" className="mx-auto max-w-7xl scroll-mt-8 px-4 pb-16">
        <h2 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
          How we test: humans in the loop
        </h2>
        <p className="mt-2 max-w-3xl text-zinc-400">
          AI helps us move faster, but it does not do the evaluating. Pages built only from
          machine-written text tend to be generic and often wrong about the details that matter
          when you are buying, so every recommendation here passes through a person who has used the
          tool.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {METHOD_STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <span className="text-sm font-semibold text-emerald-400">Step {i + 1}</span>
              <h3 className="mt-1 text-lg font-semibold text-zinc-100">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
