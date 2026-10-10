'use client';

import { useId, useMemo, useState } from 'react';
import {
  BadgeCheck,
  Calculator,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  Infinity as InfinityIcon,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  X,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Category =
  | 'AI & Productivity'
  | 'Sales & Cold Outreach'
  | 'FinTech & Reporting'
  | 'SEO & Search'
  | 'Course & Community';

type CategoryFilter = 'All Tools' | Category;

type SortKey = 'commission' | 'cookie' | 'rating' | 'payout';

/** lifetime = pays for the life of the referral; capped12 = first 12 months only;
 *  unspecified = program says "recurring" without a stated term (confirm before promoting). */
type DurationType = 'lifetime' | 'capped12' | 'unspecified';

interface AffiliateProgram {
  id: string;
  name: string;
  category: Category;
  /** Commission text exactly as advertised by the program. */
  commissionLabel: string;
  /** Decimal rate used by the calculator and the "Highest Commission" sort. */
  commissionRate: number;
  durationType: DurationType;
  cookieDays: number;
  payoutNote?: string;
  /** Average monthly account value in USD. */
  avgMonthlyValue: number;
  tag: string;
  rating: number;
  features: string[];
  affiliateUrl: string;
  verdict: string;
  pros: string[];
  cons: string[];
}

/* -------------------------------------------------------------------------- */
/*  Dataset                                                                   */
/* -------------------------------------------------------------------------- */

const CATEGORIES: CategoryFilter[] = [
  'All Tools',
  'AI & Productivity',
  'Sales & Cold Outreach',
  'FinTech & Reporting',
  'SEO & Search',
  'Course & Community',
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'commission', label: 'Highest Commission' },
  { value: 'cookie', label: 'Longest Cookie Window' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'payout', label: 'Estimated Monthly Payout' },
];

const PROGRAMS: AffiliateProgram[] = [
  {
    id: 'reclaim-ai',
    name: 'Reclaim.ai',
    category: 'AI & Productivity',
    commissionLabel: '25% - 40% Recurring (12 Mos)',
    commissionRate: 0.4,
    durationType: 'capped12',
    cookieDays: 90,
    payoutNote: '40% (Workplace) + $1 bonus per Workplace signup',
    avgMonthlyValue: 120,
    tag: "Editor's Choice",
    rating: 4.9,
    features: ['Smart Calendar Sync', 'Habit & Meeting Defense', 'Slack Integration'],
    affiliateUrl: 'https://reclaim.ai/?ref=affiliate_id',
    verdict:
      'A calendar assistant that sells itself to anyone with a crowded schedule. The 90-day cookie gives long-consideration team buyers time to convert, and the top-tier rate applies to Workplace plans.',
    pros: [
      'Longest cookie window in the set, tied with two others at 90 days',
      'Top rate of 40% on Workplace plans, plus a per-signup bonus',
      'Easy to demo in a screen recording or a short tutorial',
    ],
    cons: [
      'Commission stops after 12 months per referral',
      'Lower average account value than the sales and finance tools',
    ],
  },
  {
    id: 'woodpecker',
    name: 'Woodpecker.co',
    category: 'Sales & Cold Outreach',
    commissionLabel: '20% Lifetime Recurring',
    commissionRate: 0.2,
    durationType: 'lifetime',
    cookieDays: 30,
    avgMonthlyValue: 500,
    tag: 'Highest Lifetime LTV',
    rating: 4.8,
    features: ['Automated Deliverability', 'Condition-Based Sequences', 'Team Inbox Rotation'],
    affiliateUrl: 'https://woodpecker.co/?ref=affiliate_id',
    verdict:
      'Lifetime recurring commission on a high-value account is the strongest compounding play here. The short cookie means your content needs to drive decisions quickly.',
    pros: [
      'Pays for as long as the customer stays subscribed',
      'High average account value',
      'Strong fit for agencies that recommend tools to clients',
    ],
    cons: [
      'Shortest cookie window (30 days)',
      'Headline rate is lower than several competitors',
    ],
  },
  {
    id: 'buzz-ai',
    name: 'Buzz.ai',
    category: 'Sales & Cold Outreach',
    commissionLabel: '30% Recurring (12 Mos)',
    commissionRate: 0.3,
    durationType: 'capped12',
    cookieDays: 60,
    avgMonthlyValue: 500,
    tag: 'High-Ticket Sales',
    rating: 4.7,
    features: ['AI Multichannel Outreach', 'LinkedIn Automation', 'Enriched Lead Scraping'],
    affiliateUrl: 'https://buzz.ai/?ref=affiliate_id',
    verdict:
      'A strong first-year payout per referral thanks to the combination of a 30% rate and a high account value. Best for audiences already running outbound.',
    pros: [
      'High first-year payout per referral',
      'Mid-length 60-day cookie',
      'Multichannel positioning appeals to sales teams',
    ],
    cons: [
      'Commission is capped at 12 months',
      'Outreach automation draws compliance scrutiny; audiences need guidance',
    ],
  },
  {
    id: 'joiin',
    name: 'Joiin',
    category: 'FinTech & Reporting',
    commissionLabel: '40% - 50% Recurring (12 Mos)',
    commissionRate: 0.5,
    durationType: 'capped12',
    cookieDays: 90,
    avgMonthlyValue: 350,
    tag: 'Top Commission Rate',
    rating: 4.8,
    features: ['Multi-Entity Consolidation', 'Xero/QBO/Sage Sync', 'Executive Reporting'],
    affiliateUrl: 'https://joiin.co/?ref=affiliate_id',
    verdict:
      'The highest rate in the benchmark, paired with a 90-day cookie. The audience is narrower (accountants and finance leads managing multiple entities), but each conversion is valuable.',
    pros: [
      'Highest commission rate in the set',
      '90-day cookie suits slow finance-team purchase cycles',
      'Clear niche with little overlap from other tools here',
    ],
    cons: [
      'Commission capped at 12 months',
      'Smaller addressable audience than general productivity tools',
    ],
  },
  {
    id: 'alli-ai',
    name: 'Alli AI',
    category: 'SEO & Search',
    commissionLabel: '20% Recurring (12 Mos)',
    commissionRate: 0.2,
    durationType: 'capped12',
    cookieDays: 60,
    avgMonthlyValue: 420,
    tag: 'AEO / GEO Automated',
    rating: 4.6,
    features: ['Automated On-Page Tuning', 'AI Search Engine Optimization', 'CMS-Agnostic Script'],
    affiliateUrl: 'https://alliai.com/?ref=affiliate_id',
    verdict:
      'A timely pick for audiences worried about AI-search visibility. The rate is modest, but the account value is high enough to keep per-referral payouts competitive.',
    pros: [
      'High average account value',
      'Works across CMS platforms, so it suits mixed-stack agencies',
      'Topical for AI-search (AEO / GEO) content',
    ],
    cons: [
      'Lowest rating in the set',
      '20% for 12 months is the least generous commission structure here',
    ],
  },
  {
    id: 'yourgpt',
    name: 'YourGPT AI',
    category: 'AI & Productivity',
    commissionLabel: 'Up to 20% Recurring',
    commissionRate: 0.2,
    durationType: 'unspecified',
    cookieDays: 30,
    avgMonthlyValue: 150,
    tag: 'Best AI Chatbot',
    rating: 4.7,
    features: ['No-Code Chatbot Agents', 'Omnichannel WhatsApp/Web', 'Auto-Ticket Resolution'],
    affiliateUrl: 'https://yourgpt.ai/?ref=affiliate_id',
    verdict:
      'An approachable no-code chatbot builder with broad small-business appeal. The program advertises "up to" 20%, so confirm your actual tier and recurring term before forecasting.',
    pros: [
      'No-code positioning makes it easy to explain to non-technical buyers',
      'Omnichannel support including WhatsApp',
    ],
    cons: [
      'Short 30-day cookie',
      'Rate is "up to" 20% and the recurring term is not stated',
      'Lower account value than most of the set',
    ],
  },
  {
    id: 'expandi',
    name: 'Expandi',
    category: 'Sales & Cold Outreach',
    commissionLabel: '20% - 30% Recurring (12 Mos)',
    commissionRate: 0.3,
    durationType: 'capped12',
    cookieDays: 60,
    avgMonthlyValue: 99,
    tag: 'LinkedIn Growth',
    rating: 4.7,
    features: ['Smart Sequences', 'Cloud-Based Safety', 'Dynamic GIF Personalization'],
    affiliateUrl: 'https://expandi.io/?ref=affiliate_id',
    verdict:
      'A low-friction LinkedIn automation tool that is easy to recommend at its price point. Per-referral earnings are smaller, so it works best when volume is the strategy.',
    pros: [
      'Low price point lowers the barrier to sign up',
      'Good fit for solo founders and small agencies',
    ],
    cons: [
      'Lowest account value in the set',
      'Commission capped at 12 months',
      'Rate is a 20%-30% range; the tier you qualify for may vary',
    ],
  },
  {
    id: 'thinkific',
    name: 'Thinkific',
    category: 'Course & Community',
    commissionLabel: '30% Lifetime Recurring',
    commissionRate: 0.3,
    durationType: 'lifetime',
    cookieDays: 90,
    avgMonthlyValue: 149,
    tag: 'Best Course Platform',
    rating: 4.8,
    features: ['Custom Domains', 'Zero Transaction Fees', 'Integrated Memberships'],
    affiliateUrl: 'https://thinkific.com/?ref=affiliate_id',
    verdict:
      'The only program in the set combining a 90-day cookie with lifetime recurring commission. Creators tend to stay on their course platform, which makes the lifetime term especially valuable.',
    pros: [
      'Lifetime recurring commission',
      '90-day cookie',
      'Natural fit for creator and educator audiences',
    ],
    cons: [
      'Mid-range account value',
      'Competitive category with many alternative platforms',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const monthlyPayoutPerReferral = (p: AffiliateProgram) => p.avgMonthlyValue * p.commissionRate;

const durationLabel = (d: DurationType) =>
  d === 'lifetime' ? 'Lifetime' : d === 'capped12' ? '12-Month Capped' : 'Recurring (term unstated)';

function siteOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}

/** Serialises JSON for a <script> tag without allowing "</script>" or HTML comments to break out. */
function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .split(String.fromCharCode(0x2028))
    .join('\\u2028')
    .split(String.fromCharCode(0x2029))
    .join('\\u2029');
}

function buildComparison(program: AffiliateProgram, all: AffiliateProgram[]): string {
  const own = monthlyPayoutPerReferral(program);
  const peers = all.filter((p) => p.category === program.category && p.id !== program.id);

  if (peers.length > 0) {
    const best = peers.reduce((a, b) =>
      monthlyPayoutPerReferral(b) > monthlyPayoutPerReferral(a) ? b : a,
    );
    const diff = own - monthlyPayoutPerReferral(best);
    const dir = diff >= 0 ? 'more' : 'less';
    return `Versus ${best.name}, the top-paying alternative in ${program.category}: ${program.name} earns ${usd.format(
      Math.abs(diff),
    )}/mo ${dir} per referral (${usd.format(own)} vs ${usd.format(
      monthlyPayoutPerReferral(best),
    )}), with a ${program.cookieDays}-day vs ${best.cookieDays}-day cookie.`;
  }

  const avg = all.reduce((sum, p) => sum + monthlyPayoutPerReferral(p), 0) / all.length;
  const diff = own - avg;
  return `${program.name} has no direct competitor in this table. Against the average of all listed programs (${usd.format(
    avg,
  )}/mo per referral), it earns ${usd.format(Math.abs(diff))}/mo ${diff >= 0 ? 'more' : 'less'} per referral.`;
}

/* -------------------------------------------------------------------------- */
/*  Small presentational pieces                                               */
/* -------------------------------------------------------------------------- */

function Rating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-zinc-100">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
      <span className="font-semibold">{value.toFixed(1)}</span>
      <span className="text-zinc-400">/ 5.0</span>
      <span className="sr-only">rating</span>
    </span>
  );
}

function AffiliateCta({ program }: { program: AffiliateProgram }) {
  const tipId = useId();
  return (
    <div className="flex flex-col items-start gap-1">
      <a
        href={program.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-400 px-3.5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        Try {program.name}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab, affiliate link)</span>
      </a>
      <span className="group relative inline-block">
        <span
          tabIndex={0}
          aria-describedby={tipId}
          onClick={(e) => e.stopPropagation()}
          className="cursor-help rounded text-xs text-zinc-400 underline decoration-dotted underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          (Affiliate Link)
        </span>
        <span
          id={tipId}
          role="tooltip"
          className="pointer-events-none invisible absolute left-0 top-full z-20 mt-1 w-64 rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-xs leading-relaxed text-zinc-200 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
        >
          This is a referral link. If you sign up through it, we may earn a commission at no
          additional cost to you.
        </span>
      </span>
    </div>
  );
}

function ProgramDetails({
  program,
  all,
  onUseInCalculator,
}: {
  program: AffiliateProgram;
  all: AffiliateProgram[];
  onUseInCalculator: (id: string) => void;
}) {
  return (
    <div className="grid gap-6 border-t border-zinc-800 bg-zinc-950/40 p-5 md:grid-cols-2">
      <div className="space-y-5">
        <section>
          <h4 className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <BadgeCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            Why We Picked It
          </h4>
          <p className="text-sm leading-relaxed text-zinc-400">{program.verdict}</p>
        </section>

        <section>
          <h4 className="mb-2 text-sm font-semibold text-zinc-100">Key Features</h4>
          <ul className="space-y-1.5">
            {program.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-3">
          <h4 className="mb-1 flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            Direct Comparison
          </h4>
          <p className="text-sm leading-relaxed text-zinc-300">{buildComparison(program, all)}</p>
        </div>
      </div>

      <div className="space-y-5">
        <section>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <ThumbsUp className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            Pros
          </h4>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-300 marker:text-emerald-400">
            {program.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <ThumbsDown className="h-4 w-4 text-rose-400" aria-hidden="true" />
            Cons
          </h4>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-300 marker:text-rose-400">
            {program.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap items-start gap-4">
          <AffiliateCta program={program} />
          <button
            type="button"
            onClick={() => onUseInCalculator(program.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3.5 py-2 text-sm font-medium text-zinc-200 transition hover:border-emerald-400 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Use in calculator
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export default function AffiliateTable() {
  const [category, setCategory] = useState<CategoryFilter>('All Tools');
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('commission');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [calcOpen, setCalcOpen] = useState(true);
  const [referrals, setReferrals] = useState(10);
  const [calcToolId, setCalcToolId] = useState(PROGRAMS[0].id);

  const calcPanelId = useId();
  const searchId = useId();
  const sortId = useId();
  const referralsId = useId();
  const toolSelectId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PROGRAMS.filter((p) => {
      if (category !== 'All Tools' && p.category !== category) return false;
      if (!q) return true;
      return [p.name, p.category, p.tag, ...p.features].some((s) => s.toLowerCase().includes(q));
    });

    const sorted = [...list];
    sorted.sort((a, b) => {
      switch (sortKey) {
        case 'commission':
          return (
            b.commissionRate - a.commissionRate ||
            monthlyPayoutPerReferral(b) - monthlyPayoutPerReferral(a)
          );
        case 'cookie':
          return b.cookieDays - a.cookieDays || b.commissionRate - a.commissionRate;
        case 'rating':
          return b.rating - a.rating || b.commissionRate - a.commissionRate;
        case 'payout':
          return monthlyPayoutPerReferral(b) - monthlyPayoutPerReferral(a);
      }
    });
    return sorted;
  }, [category, query, sortKey]);

  const calcTool = PROGRAMS.find((p) => p.id === calcToolId) ?? PROGRAMS[0];
  const mrr = referrals * calcTool.avgMonthlyValue * calcTool.commissionRate;
  const arr = mrr * 12;

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'B2B SaaS Affiliate Program Comparison',
      description:
        'Benchmark comparison of B2B SaaS affiliate programs by commission, cookie window and average account value.',
      numberOfItems: PROGRAMS.length,
      itemListElement: PROGRAMS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: p.name,
          applicationCategory: 'BusinessApplication',
          applicationSubCategory: p.category,
          operatingSystem: 'Web',
          url: siteOrigin(p.affiliateUrl),
          description: `${p.tag}. Key features: ${p.features.join(', ')}.`,
          featureList: p.features,
          review: {
            '@type': 'Review',
            author: { '@type': 'Organization', name: 'Editorial Team' },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: p.rating,
              bestRating: 5,
              worstRating: 1,
            },
            reviewBody: p.verdict,
          },
        },
      })),
    }),
    [],
  );

  const toggle = (id: string) => setExpandedId((cur) => (cur === id ? null : id));

  const useInCalculator = (id: string) => {
    setCalcToolId(id);
    setCalcOpen(true);
  };

  return (
    <section
      aria-labelledby="affiliate-table-heading"
      className="min-h-screen bg-zinc-950 text-zinc-100"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            B2B Automation Lab
          </p>
          <h2
            id="affiliate-table-heading"
            className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl"
          >
            B2B SaaS Affiliate Program Comparison
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-400">
            Compare commission structures, cookie windows and estimated payouts, then forecast your
            own earnings with the calculator.
          </p>
        </header>

        {/* Calculator */}
        <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/60">
          <h3>
            <button
              type="button"
              onClick={() => setCalcOpen((o) => !o)}
              aria-expanded={calcOpen}
              aria-controls={calcPanelId}
              className="flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                <Calculator className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                Commission &amp; ROI Calculator
              </span>
              <ChevronDown
                className={`h-5 w-5 text-zinc-400 transition-transform ${
                  calcOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
          </h3>

          {calcOpen && (
            <div id={calcPanelId} className="border-t border-zinc-800 p-5">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor={toolSelectId} className="mb-1.5 block text-sm font-medium">
                    Selected Tool
                  </label>
                  <select
                    id={toolSelectId}
                    value={calcToolId}
                    onChange={(e) => setCalcToolId(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                  >
                    {PROGRAMS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.commissionLabel}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={referralsId}
                    className="mb-1.5 flex items-center justify-between text-sm font-medium"
                  >
                    <span>Monthly Paying Referrals</span>
                    <output htmlFor={referralsId} className="font-semibold text-emerald-400">
                      {referrals}
                    </output>
                  </label>
                  <input
                    id={referralsId}
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={referrals}
                    onChange={(e) => setReferrals(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer accent-emerald-400"
                  />
                  <div className="mt-1 flex justify-between text-xs text-zinc-400">
                    <span>1</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              <div
                className="mt-6 grid gap-4 sm:grid-cols-3"
                role="group"
                aria-label="Calculator results"
                aria-live="polite"
              >
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    Estimated Monthly Recurring Revenue
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">{usd.format(mrr)}</p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {referrals} × {usd.format(calcTool.avgMonthlyValue)} ×{' '}
                    {Math.round(calcTool.commissionRate * 100)}%
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    Estimated Annual Contract Value
                  </p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">{usd.format(arr)}</p>
                  <p className="mt-1 text-xs text-zinc-400">MRR × 12</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                  <p className="text-xs uppercase tracking-wide text-zinc-400">
                    Cookie &amp; Commission Type
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-bold text-zinc-100">
                    {calcTool.durationType === 'lifetime' ? (
                      <InfinityIcon className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <Clock className="h-6 w-6 text-amber-400" aria-hidden="true" />
                    )}
                    {durationLabel(calcTool.durationType)}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {calcTool.cookieDays}-day cookie window
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                Illustrative estimates only, not a guarantee or typical result. Figures assume every
                referral stays subscribed at the average account value shown.
                {calcTool.durationType === 'capped12' &&
                  ' This program pays for 12 months per referral, so the annual figure reflects a single year of commissions per referral.'}
                {calcTool.durationType === 'unspecified' &&
                  ' This program does not state how long commissions recur; confirm the terms before relying on the annual figure.'}{' '}
                Actual earnings depend on your traffic, conversion rate and the program&apos;s
                current terms.
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mb-4 space-y-4">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                    active
                      ? 'border-emerald-400 bg-emerald-400 text-zinc-950'
                      : 'border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search tools, categories or features
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, categories or features…"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 py-2.5 pl-9 pr-9 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-400 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor={sortId} className="whitespace-nowrap text-sm text-zinc-400">
                Sort by
              </label>
              <select
                id={sortId}
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-zinc-400" role="status" aria-live="polite">
            Showing {filtered.length} of {PROGRAMS.length} programs
          </p>
        </div>

        {/* FTC disclosure — immediately above the table header */}
        <div
          role="note"
          aria-label="Affiliate disclosure"
          className="mb-4 rounded-lg border-l-4 border-amber-400 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-50"
        >
          <strong className="font-semibold text-amber-300">
            Transparency &amp; Earnings Disclosure:
          </strong>{' '}
          We independently review and benchmark business software. When you sign up through our
          links, we may earn an affiliate commission at no additional cost to you. Commissions never
          impact our editorial evaluations.
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-10 text-center">
            <p className="font-semibold">No programs match your filters.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('All Tools');
              }}
              className="mt-3 text-sm text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl border border-zinc-800 md:block">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  B2B SaaS affiliate programs compared by commission, cookie window, average account
                  value and rating. Select a row to expand details.
                </caption>
                <thead className="bg-zinc-900 text-xs uppercase tracking-wide text-zinc-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Tool
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Commission
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Cookie
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Avg. Account
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Est. Payout / Referral
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Rating
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      <span className="sr-only">Visit</span>
                    </th>
                  </tr>
                </thead>
                {filtered.map((p) => {
                  const open = expandedId === p.id;
                  const detailsId = `details-table-${p.id}`;
                  return (
                    <tbody key={p.id} className="border-t border-zinc-800">
                      <tr
                        onClick={() => toggle(p.id)}
                        className={`cursor-pointer transition hover:bg-zinc-800/50 ${
                          open ? 'bg-zinc-800/50' : 'bg-zinc-900/60'
                        }`}
                      >
                        <th scope="row" className="px-4 py-4 font-normal">
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-controls={detailsId}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(p.id);
                            }}
                            className="flex items-start gap-2 rounded text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                          >
                            <ChevronDown
                              className={`mt-1 h-4 w-4 shrink-0 text-zinc-400 transition-transform ${
                                open ? 'rotate-180' : ''
                              }`}
                              aria-hidden="true"
                            />
                            <span>
                              <span className="block font-semibold text-zinc-100">{p.name}</span>
                              <span className="block text-xs text-zinc-400">{p.category}</span>
                              <span className="mt-1.5 inline-block rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/30">
                                {p.tag}
                              </span>
                            </span>
                          </button>
                        </th>
                        <td className="px-4 py-4">
                          <span className="block font-medium text-zinc-100">
                            {p.commissionLabel}
                          </span>
                          <span className="block text-xs text-zinc-400">
                            {durationLabel(p.durationType)}
                          </span>
                          {p.payoutNote && (
                            <span className="block text-xs text-zinc-400">{p.payoutNote}</span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-zinc-300">
                          {p.cookieDays} days
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-zinc-300">
                          {usd.format(p.avgMonthlyValue)}/mo
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-emerald-400">
                          {usd.format(monthlyPayoutPerReferral(p))}/mo
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <Rating value={p.rating} />
                        </td>
                        <td className="px-4 py-4">
                          <AffiliateCta program={p} />
                        </td>
                      </tr>
                      {open && (
                        <tr id={detailsId} className="bg-zinc-900/60">
                          <td colSpan={7} className="p-0">
                            <ProgramDetails
                              program={p}
                              all={PROGRAMS}
                              onUseInCalculator={useInCalculator}
                            />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  );
                })}
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="space-y-4 md:hidden">
              {filtered.map((p) => {
                const open = expandedId === p.id;
                const detailsId = `details-card-${p.id}`;
                return (
                  <li
                    key={p.id}
                    className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-100">{p.name}</h3>
                          <p className="text-xs text-zinc-400">{p.category}</p>
                        </div>
                        <Rating value={p.rating} />
                      </div>
                      <span className="mt-2 inline-block rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/30">
                        {p.tag}
                      </span>

                      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div className="col-span-2">
                          <dt className="text-xs uppercase tracking-wide text-zinc-400">
                            Commission
                          </dt>
                          <dd className="font-medium text-zinc-100">
                            {p.commissionLabel}
                            <span className="block text-xs font-normal text-zinc-400">
                              {durationLabel(p.durationType)}
                              {p.payoutNote ? ` · ${p.payoutNote}` : ''}
                            </span>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-400">Cookie</dt>
                          <dd className="text-zinc-200">{p.cookieDays} days</dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-zinc-400">
                            Avg. Account
                          </dt>
                          <dd className="text-zinc-200">{usd.format(p.avgMonthlyValue)}/mo</dd>
                        </div>
                        <div className="col-span-2">
                          <dt className="text-xs uppercase tracking-wide text-zinc-400">
                            Est. Payout / Referral
                          </dt>
                          <dd className="font-semibold text-emerald-400">
                            {usd.format(monthlyPayoutPerReferral(p))}/mo
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                        <AffiliateCta program={p} />
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={detailsId}
                          onClick={() => toggle(p.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3.5 py-2 text-sm font-medium text-zinc-200 hover:border-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                        >
                          {open ? 'Hide details' : 'Show details'}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    {open && (
                      <div id={detailsId}>
                        <ProgramDetails
                          program={p}
                          all={PROGRAMS}
                          onUseInCalculator={useInCalculator}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <p className="mt-6 text-xs leading-relaxed text-zinc-400">
          Commission rates, cookie windows and account values are benchmarks and may change; always
          confirm current terms with each program before promoting it. Ratings reflect our editorial
          evaluation.
        </p>
      </div>
    </section>
  );
}
