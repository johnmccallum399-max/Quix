import type { Metadata } from 'next';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The 2026 B2B AI Multi-Agent Workflow Blueprint',
  description:
    'Free: importable JSON and Make.com scenario schemas for lead research, outreach, scheduling and reporting workflows, with a failure-mode checklist for each.',
};

const BULLETS = [
  'Four importable workflow templates (JSON + Make.com scenario schemas): lead research, outreach follow-up, meeting scheduling and weekly reporting',
  'A one-page agent hand-off map: which agent owns each step, what it receives and what it must return',
  'A failure-mode checklist for every workflow: the 7 places multi-step automations break and how to catch them',
  'A human-approval gate pattern, so no email, invoice or CRM write goes out unreviewed',
  'A tool-cost worksheet to check a workflow pays for itself before you build it',
];

export default function BlueprintPage() {
  const signupUrl = process.env.NEXT_PUBLIC_SIGNUP_URL ?? '#';
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Free download
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
        Stop babysitting your automations. Build B2B workflows that run, and tell you when they
        don&apos;t.
      </h1>
      <p className="mt-5 text-lg text-zinc-400">
        The 2026 B2B AI Multi-Agent Workflow Blueprint: ready-to-import JSON and Make.com schemas for
        the workflows small B2B teams automate first, plus the checklists that keep them from
        failing silently.
      </p>

      <ul className="mt-8 space-y-3">
        {BULLETS.map((b) => (
          <li key={b} className="flex items-start gap-3 text-zinc-300">
            <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h2 className="text-xl font-semibold text-zinc-100">Who it&apos;s for</h2>
        <p className="mt-2 text-zinc-400">
          Founders, agency owners and operators who already know what they want to automate and want
          a tested starting structure instead of a blank canvas. You&apos;ll need a free Make.com
          account; no paid plan is required to import the templates.
        </p>
      </div>

      <a
        href={signupUrl}
        className="mt-10 inline-flex w-full items-center justify-center rounded-xl bg-emerald-400 px-6 py-4 text-lg font-semibold text-zinc-950 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:w-auto"
      >
        Send me the free Blueprint
      </a>
      <p className="mt-3 text-sm text-zinc-400">
        You&apos;ll also get a short email series on automating B2B workflows. Unsubscribe in one
        click, any time. Some emails recommend software we may earn a commission on; see our{' '}
        <a href="/disclosure" className="text-emerald-400 underline underline-offset-2">
          disclosure
        </a>
        .
      </p>
    </main>
  );
}
