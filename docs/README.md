# B2B Automation Lab: build guide

## What is in this repo
| Path | Purpose |
|---|---|
| `lib/programs.ts` | Single source of truth for the 8 programs (public data) |
| `lib/links.ts` | Server-only affiliate destinations, UTM allow-list, disabled-program switch |
| `components/AffiliateTable.tsx` | Comparison table, ROI calculator, FTC banner, JSON-LD |
| `app/go/[slug]/route.ts` | Cloaked redirect `/go/<slug>`, forwards `utm_*` only, `noindex` |
| `app/blueprint/page.tsx` | Lead-magnet landing page |
| `app/disclosure/page.tsx` | Full disclosure page |
| `scripts/check-links.mjs` + `.github/workflows/link-health.yml` | Weekly link health check |
| `docs/` | Pipeline, funnel copy, compliance, 90-day playbook |

## Run it
```
npm install
cp .env.example .env.local   # then fill in real affiliate links
npm run dev
```

## Budget: $120 (realistic plan)
| Item | Cost |
|---|---|
| Domain (.com, 1 year) | ~$12 |
| Hosting: Cloudflare Pages / Workers free tier | $0 |
| Email + landing page: Systeme.io free plan | $0 |
| Automation: Make.com free tier | $0 |
| Business inbox / sending domain DNS (Cloudflare) | $0 |
| **Reserve** (screenshots tool, one month of any paid tool you must test, 1 month of Vercel Pro if you choose it) | ~$108 |

Two things to check before you rely on the free tiers:
1. **Vercel Hobby is for non-commercial use.** An affiliate site is commercial, so on Vercel you would need Pro (about $20/month). Cloudflare's free tier allows commercial use, so use that, or budget for Pro from the reserve. This app uses a Route Handler, so on Cloudflare deploy with the OpenNext Cloudflare adapter, or run it on Vercel Pro.
2. **Free plan limits change.** Confirm Systeme.io and Make.com free-tier limits (contacts, emails, operations) on their pricing pages before launch.

## Facts to treat with care
The market statistics in the original brief (AI content converting at 0.8% vs 3.2% for hybrid, 5.4x organic lift, 40% higher AI-answer visibility) have no cited source. Use them as internal hypotheses to test, never as public claims. The commission rates, cookie windows and average account values are also unverified: confirm each on the vendor's current affiliate terms before publishing, and log the date you checked.

## Environment variables
See `.env.example`. Never commit `.env.local`.
