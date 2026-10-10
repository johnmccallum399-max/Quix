# Module 5: Compliance and risk

> Templates, not legal advice. Have a lawyer review before launch if you can; at minimum read the FTC's Endorsement Guides (16 CFR Part 255) and "Disclosures 101."

## 1. Site-wide disclosure statement (also at `/disclosure`)

> **Affiliate & Earnings Disclosure.** [Site name] participates in affiliate programs. When you click certain links on this site, marked "(Sponsored Link)", and buy or sign up, we may earn a commission from the company at no additional cost to you. We choose and rate tools based on our own testing and research, and commissions do not influence our ratings or rankings. Some companies we review have no affiliate program. Income figures and calculator results are illustrative estimates, not guarantees or typical results. Program terms, including commission rates, can change at any time.

Placement rules (16 CFR Part 255 "clear and conspicuous"):
- A banner at the top of every page that contains affiliate links, plus the label "(Sponsored Link)" directly next to each link or button.
- Plain language ("we may earn a commission"), not "partner" or "supported by."
- Same disclosure in emails, above the first affiliate link, and in video and social posts (spoken and on screen, not hidden in "see more").
- Disclosure must be visible on mobile without scrolling to find it.
- No fake reviews, no claims of testing you did not do, no undisclosed relationships with vendors (free accounts, equity, payments).

## 2. Amazon Associates (only if you recommend physical hardware)
Amazon requires a specific statement on your site: **"As an Amazon Associate I earn from qualifying purchases."** Use that wording, in addition to the generic disclosure. Rules to follow: do not cloak or shorten Amazon links outside Amazon's tools, do not put Amazon links in emails or PDFs, do not display prices unless fetched via Amazon's API, and re-read the current Operating Agreement; it has no special "AI disclosure" clause I can quote, so check it directly for current requirements on AI-generated content. If you do not recommend hardware, skip Amazon entirely.

## 3. Link cloaking
Short `/go/` links are fine for tracking and tidiness. They must never be used to hide the relationship: keep the "(Sponsored Link)" label and `rel="sponsored"`. Some programs forbid redirects through intermediate domains; check each program's terms.

## 4. Email and privacy
- CAN-SPAM: truthful subject lines, physical postal address, working unsubscribe honored within 10 business days (do it immediately). If you have EU/UK subscribers, use double opt-in and a privacy policy (GDPR/PECR).
- Publish a privacy policy covering analytics, forms and email provider.
- Do not buy lists.

## 5. Deliverability and platform-safety guidelines
Follow each platform's terms; staying inside them is the only durable approach.

**Email**
- Send from a dedicated subdomain (for example `mail.yourdomain.com`), never your primary domain. Set up SPF, DKIM and DMARC.
- Warm up over 3-4 weeks: roughly 10-20 emails/day to engaged contacts in week 1, doubling about weekly, while watching replies and bounces.
- Keep bounce rate under 2% and spam complaints under 0.1%. Stop and fix if either is exceeded.
- Newsletter list: opted-in contacts only. Remove non-openers after 90 days.

**Cold outreach (if you do it)**
- Small lists, relevant offers, an opt-out line, and honor opt-outs. Check B2B cold-email law for your recipients' countries before sending.
- Mailbox limits: stay conservatively below your provider's published sending limits (about 30-50/day per mailbox is a common cautious ceiling; verify with your provider).

**LinkedIn / social**
- Do not use automation that logs into your account or scrapes it; most platforms forbid it and enforce with account restrictions. Use the official APIs and scheduling tools instead.
- Post manually or through approved schedulers, reply to comments yourself, and avoid mass-DMing links.
- Manychat-style automations: use only on channels where the platform permits it, with the user's opt-in (comment-to-DM flows), and include the affiliate disclosure in the message.

## 6. Risk register
| Risk | Mitigation |
|---|---|
| Program terms change or end | Weekly link check; `DISABLED_PROGRAMS` switch; 90-day re-verification of rates |
| One program dominates income | Cap any one vendor to under 40% of promoted slots |
| Search traffic drop | Build the email list from day one |
| Inaccurate claim published | "Last verified" dates; correction log; fix within 48h |
| Account suspension on a network | Read each program's promotion rules (PartnerStack, direct programs) before applying |
