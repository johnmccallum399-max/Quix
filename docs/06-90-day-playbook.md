# Module 6: 90-day playbook (36 working days, 3 days a week)

"Day N" means the Nth working day. Calendar week = Days 1-3, 4-6, and so on. Each day is about 6-8 focused hours.

## Month 1: Days 1-12 (setup, compliance, onboarding)

| Day | Tasks |
|---|---|
| 1 | Pick the site name; buy the domain (~$12); create Cloudflare account; push this repo to GitHub; `npm install`; run locally |
| 2 | Deploy (Cloudflare Pages/OpenNext, or Vercel Pro if you accept the cost); connect domain; set env vars |
| 3 | Write About and Contact pages, privacy policy; review `/disclosure`; add analytics (Cloudflare Web Analytics, free) |
| 4 | Apply to the direct programs: Reclaim.ai, Woodpecker, Buzz.ai, Joiin, Alli AI, YourGPT, Thinkific, Expandi. Use your real site and an honest description |
| 5 | Create PartnerStack and any network accounts that host these programs (check which vendors use which network); complete tax/payout profiles |
| 6 | Sign up to each tool for a trial; log the exact terms on the affiliate page with date in a sheet (commission, cookie, payout threshold, restrictions) |
| 7 | Update `lib/affiliate-data.ts` with verified terms; fix any wrong numbers |
| 8 | Paste approved links into env vars; test every `/go/` link; run `npm run check-links` |
| 9 | Set up Systeme.io: sending domain DNS (SPF/DKIM/DMARC), double opt-in form, thank-you page |
| 10 | Build the 4 workflows in Make.com, test with real data, export (strip secrets) |
| 11 | Write the PDF Blueprint; assemble ZIP |
| 12 | Load the 5 emails, send test sequence to yourself; legal read-through of all pages |

Exit criteria: site live, links tracked, disclosures in place, at least 3 programs approved, lead magnet ready to launch.

## Month 2: Days 13-24 (publish 10 BOFU articles, launch list)

Ten articles over 12 days, using the Module 2 pipeline. Suggested set (adapt to keyword research):
1. Reclaim.ai vs other AI calendar assistants
2. Woodpecker vs alternatives for cold email
3. Buzz.ai review
4. Joiin vs spreadsheets for multi-entity reporting
5. Alli AI review: automated on-page SEO
6. YourGPT vs other no-code chatbot builders
7. Expandi vs other LinkedIn outreach tools
8. Thinkific vs other course platforms
9. Best B2B outreach tools (roundup linking to 2, 3, 7)
10. Best AI productivity tools for agencies (roundup linking to 1, 6)

| Days | Tasks |
|---|---|
| 13-15 | Keyword research with free tools (Google autocomplete, Search Console, AnswerThePublic free tier); produce articles 1-3 |
| 16 | Articles 4-5; submit sitemap to Search Console |
| 17 | Launch lead magnet: add CTA to every article and the homepage; announce on your own LinkedIn |
| 18-19 | Articles 6-7; check that emails 1-5 send correctly to a real signup |
| 20-21 | Articles 8-9; add FAQ schema |
| 22 | Article 10; internal-link audit |
| 23 | Review analytics: clicks on `/go/` links by slug (from host logs); signups; pages indexed |
| 24 | Fix the weakest page: rewrite the intro and verdict; republish with updated date |

Exit criteria: 10 articles live, sequence running, baseline numbers recorded.

## Month 3: Days 25-36 (CRO, community, partner outreach)

| Days | Tasks |
|---|---|
| 25-26 | CRO: test two CTA copy variants and table default sort on top 3 pages; one change at a time, 2 weeks each |
| 27 | Add comparison-table block into the top articles; improve screenshots |
| 28-29 | Create the community (Skool free tier or Discord); post 3 starter threads; invite from email 4 |
| 30 | Check which AI assistants cite you for the 10 target questions; log the answers |
| 31-32 | Email 3-5 of your best partner managers: share traffic, signups and conversions you have **actual** numbers for, and ask about higher tiers or bonus terms |
| 33 | Refresh the oldest 3 articles ("Last verified" and any changed pricing) |
| 34 | Link health + terms re-verification across all programs |
| 35 | Review: revenue by program, cost, hours, best pages; decide what to double down on |
| 36 | Plan next 90 days: 10 more articles, one comparison tool, first paid experiment only if revenue covers it |

## Metrics to track weekly
Impressions and clicks (Search Console), `/go/` clicks by slug, email signups and signup rate, sequence open and click rates, affiliate conversions and earnings per program, hours worked.

## Realism check
Most new affiliate sites take months to earn meaningfully. Sensible targets for day 90 are "10 indexed articles, a working list, and first conversions," not a specific income. Do not quote income projections publicly.
