/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type Category =
  | 'AI & Productivity'
  | 'Sales & Outreach'
  | 'FinTech & Reporting'
  | 'SEO & Search'
  | 'Course & Community';

export type CategoryFilter = 'All Tools' | Category;

export type SortKey = 'commission' | 'cookie' | 'rating' | 'payout';

/** lifetime = pays for the life of the referral; capped12 = first 12 months only;
 *  unspecified = program says "recurring" without a stated term (confirm before promoting). */
export type DurationType = 'lifetime' | 'capped12' | 'unspecified';

export interface AffiliateProgram {
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
  /** Official site origin (public). Real affiliate destinations live in lib/links.ts. */
  officialUrl: string;
  verdict: string;
  pros: string[];
  cons: string[];
}

/* -------------------------------------------------------------------------- */
/*  Dataset                                                                   */
/* -------------------------------------------------------------------------- */

export const CATEGORIES: CategoryFilter[] = [
  'All Tools',
  'AI & Productivity',
  'Sales & Outreach',
  'FinTech & Reporting',
  'SEO & Search',
  'Course & Community',
];

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'commission', label: 'Highest Commission' },
  { value: 'cookie', label: 'Longest Cookie' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'payout', label: 'Estimated Monthly Value' },
];

export const PROGRAMS: AffiliateProgram[] = [
  {
    id: 'reclaim',
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
    officialUrl: 'https://reclaim.ai',
    features: ['Smart Calendar Sync', 'Habit & Meeting Defense', 'Slack Integration'],
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
    category: 'Sales & Outreach',
    commissionLabel: '20% Lifetime Recurring',
    commissionRate: 0.2,
    durationType: 'lifetime',
    cookieDays: 30,
    avgMonthlyValue: 500,
    tag: 'Highest Lifetime LTV',
    rating: 4.8,
    officialUrl: 'https://woodpecker.co',
    features: ['Automated Deliverability', 'Condition-Based Sequences', 'Team Inbox Rotation'],
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
    id: 'buzz',
    name: 'Buzz.ai',
    category: 'Sales & Outreach',
    commissionLabel: '30% Recurring (12 Mos)',
    commissionRate: 0.3,
    durationType: 'capped12',
    cookieDays: 60,
    avgMonthlyValue: 500,
    tag: 'High-Ticket Sales',
    rating: 4.7,
    officialUrl: 'https://buzz.ai',
    features: ['AI Multichannel Outreach', 'LinkedIn Automation', 'Enriched Lead Scraping'],
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
    officialUrl: 'https://joiin.co',
    features: ['Multi-Entity Consolidation', 'Xero/QBO/Sage Sync', 'Executive Reporting'],
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
    id: 'alliai',
    name: 'Alli AI',
    category: 'SEO & Search',
    commissionLabel: '20% Recurring (12 Mos)',
    commissionRate: 0.2,
    durationType: 'capped12',
    cookieDays: 60,
    avgMonthlyValue: 420,
    tag: 'AEO / GEO Automated',
    rating: 4.6,
    officialUrl: 'https://alliai.com',
    features: ['Automated On-Page Tuning', 'AI Search Engine Optimization', 'CMS-Agnostic Script'],
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
    officialUrl: 'https://yourgpt.ai',
    features: ['No-Code Chatbot Agents', 'Omnichannel WhatsApp/Web', 'Auto-Ticket Resolution'],
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
    category: 'Sales & Outreach',
    commissionLabel: '20% - 30% Recurring (12 Mos)',
    commissionRate: 0.3,
    durationType: 'capped12',
    cookieDays: 60,
    avgMonthlyValue: 99,
    tag: 'LinkedIn Growth',
    rating: 4.7,
    officialUrl: 'https://expandi.io',
    features: ['Smart Sequences', 'Cloud-Based Safety', 'Dynamic GIF Personalization'],
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
    officialUrl: 'https://thinkific.com',
    features: ['Custom Domains', 'Zero Transaction Fees', 'Integrated Memberships'],
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


export function getProgramBySlug(slug: string): AffiliateProgram | undefined {
  return PROGRAMS.find((p) => p.id === slug);
}

export function getAllCategories(): CategoryFilter[] {
  return CATEGORIES;
}
