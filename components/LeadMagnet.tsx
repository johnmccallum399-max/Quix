'use client';

import { useId, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function LeadMagnet() {
  const nameId = useId();
  const emailId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company }),
      });
      const data: { success: boolean; message: string } = await res.json();
      if (!res.ok || !data.success) {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <section
      aria-labelledby="lead-magnet-heading"
      className="rounded-2xl border border-emerald-400/30 bg-zinc-900/60 p-6 sm:p-8"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Free download
      </p>
      <h2 id="lead-magnet-heading" className="text-2xl font-bold text-zinc-100 sm:text-3xl">
        The 2026 B2B AI Multi-Agent Workflow Blueprint
      </h2>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Importable JSON templates and trigger logic for four common sales-ops workflows, plus a
        checklist for the ways automations fail silently.
      </p>

      {status === 'success' ? (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-4 text-emerald-100"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
          <p>Check your inbox. The Blueprint is on its way, followed by a short email series.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" noValidate>
          <div>
            <label htmlFor={nameId} className="sr-only">
              Name
            </label>
            <input
              id={nameId}
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            />
          </div>
          <div>
            <label htmlFor={emailId} className="sr-only">
              Business email
            </label>
            <input
              id={emailId}
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Business email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            />
          </div>
          {/* Honeypot: hidden from people and assistive tech */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              name="company"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:opacity-60"
          >
            {status === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {status === 'submitting' ? 'Sending…' : 'Send me the Blueprint'}
          </button>
          {status === 'error' && (
            <p role="alert" className="text-sm text-rose-400 sm:col-span-3">
              {message}
            </p>
          )}
          <p className="text-xs text-zinc-400 sm:col-span-3">
            By signing up you agree to receive the Blueprint and occasional emails. Unsubscribe any
            time. Some emails recommend software we may earn a commission on; see our{' '}
            <a href="/disclosure" className="text-emerald-400 underline underline-offset-2">
              disclosure
            </a>
            .
          </p>
        </form>
      )}
    </section>
  );
}
