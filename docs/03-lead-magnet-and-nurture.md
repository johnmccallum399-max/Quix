# Module 3: Lead magnet and 5-day nurture

Mailing-list setup: Systeme.io free plan (hosted form + automation rule that starts the sequence when a contact signs up). Use double opt-in, include your postal address and an unsubscribe link in every email (CAN-SPAM).

## Lead magnet blueprint: "The 2026 B2B AI Multi-Agent Workflow Blueprint"
Format: PDF (12-16 pages) + ZIP of importable files. Build it from workflows you have actually run; do not ship a template you have not imported and tested.

1. **How to read this** (1 page): the agent hand-off map notation.
2. **The 5 principles**: one job per agent; structured output between steps; a human gate before anything external; log every run; fail loudly.
3. **Workflow 1: Lead research.** Trigger: new row in a sheet. Steps: enrich company, summarize site, score fit, write result back. Includes `lead-research.blueprint.json`.
4. **Workflow 2: Outreach follow-up.** Draft only; a human approves before sending. Includes the approval-gate pattern.
5. **Workflow 3: Meeting scheduling and prep.** Calendar event creates a prep brief.
6. **Workflow 4: Weekly reporting.** Pull numbers, narrate changes, post to Slack/email.
7. **Failure-mode checklist** (7 items): schema drift, silent empty outputs, rate limits, duplicate sends, stale data, prompt injection from scraped text, credentials expiry.
8. **Cost worksheet**: operations per run x runs per month vs. hours saved.
9. **Next steps**: links to the comparison table and a booking link for consulting.

Files in the ZIP: four Make.com scenario blueprints exported from your own account, four generic JSON schemas for the agent outputs, and the worksheet as a CSV. Remove all API keys and webhook URLs before export.

## Landing page copy
Live in `app/blueprint/page.tsx`. Headline: *Stop babysitting your automations. Build B2B workflows that run, and tell you when they don't.* CTA: *Send me the free Blueprint.* It makes no results claims. Add testimonials only when you have real ones, with permission.

## 5-day sequence

**Email 1: immediately**
Subject: Your Blueprint is inside (and why most workflows fail)

Hi {{first_name}},

Here's your Blueprint: {{download_link}}

Before you open it, the single most useful idea in it: most automations don't fail loudly. They fail by quietly doing the wrong thing. An outreach step sends a draft nobody read. A scraper returns an empty field and the next step happily writes "N/A" into your CRM. A rate limit hits at 2 a.m. and nothing runs for a week.

Three habits prevent most of it:
1. Every step returns structured output you can check, not free text.
2. Anything that leaves your company (email, invoice, post) passes through a human.
3. Every run is logged somewhere you actually look.

Start with Workflow 1 in the guide. It takes about 30 minutes to import and run.

Reply and tell me what you're trying to automate first. I read every response.

{{your_name}}

---
You're receiving this because you requested the Blueprint. {{postal_address}} · Unsubscribe: {{unsubscribe_link}}

**Email 2: day 2**
Subject: How I stopped my calendar from running me

Hi {{first_name}},

Today: calendar automation, and one tool I use for it. Disclosure: Reclaim.ai has an affiliate program and I may earn a commission if you sign up through my link. I'd cover it either way, and I'll tell you where it falls short.

The problem: a B2B calendar gets eaten by other people's meetings while your own focus work and follow-ups get squeezed out.

What Reclaim does: it syncs your calendars, protects time for tasks and habits, and reschedules around meetings automatically. It also integrates with Slack.

Teardown (from my own testing; add your real setup time, what you protected, and what annoyed you here before sending).

Where it fits in the Blueprint: Workflow 3 uses your calendar as the trigger for a prep brief.

Try it here (Sponsored Link): {{reclaim_link}}

Tomorrow: automating cold outreach without wrecking your domain.

{{your_name}}

**Email 3: day 3**
Subject: Cold outreach automation without burning your domain

Hi {{first_name}},

Disclosure first: Woodpecker has an affiliate program and I may earn a commission if you sign up via my link. It doesn't change what I tell you.

Outreach automation fails in two ways: too much volume too soon, and bad targeting. A sane setup:
- Warm new sending domains for 2-4 weeks before real campaigns.
- Keep daily volume per mailbox low and increase gradually.
- Target small, well-researched lists. Use Workflow 1 from the Blueprint to research, then personalize.
- Add an opt-out line and honor it immediately.

Woodpecker is built around deliverability and conditional sequences (for example, branch on whether someone opened or replied), and it rotates sending across team inboxes. It's priced for teams doing outreach seriously, so it won't suit someone sending ten emails a week.

My test: (insert your real campaign setup and results, or say you haven't run one yet).

See Woodpecker (Sponsored Link): {{woodpecker_link}}

Next: a calculator to check whether any tool is worth it.

{{your_name}}

**Email 4: day 4**
Subject: Is that tool worth it? Run the numbers

Hi {{first_name}},

Before you pay for any tool, estimate the return. I built a calculator that does it: {{site_url}}/#compare

Pick a tool, set how many paying customers you could realistically send or sell to, and see the monthly and annual figure. It's an illustration based on advertised terms, not a promise.

If you're considering promoting tools yourself, it works the same way for affiliate commissions, and the table lists commission, cookie length and how long payments last.

I'm also opening a small community for people building B2B automations: {{community_link}}. Share a workflow, get feedback, ask questions.

{{your_name}}

**Email 5: day 5**
Subject: Want me to build it with you?

Hi {{first_name}},

If you've imported a workflow from the Blueprint, great. If you've got stuck, that's normal.

I do a limited number of implementation projects: we pick one workflow, I build it with approval gates and logging, and hand it over with documentation. Details and a booking link: {{booking_link}}

Not ready? No problem. You'll keep getting occasional emails from me, and you can leave any time.

{{your_name}}

Merge fields in `{{ }}` are filled by Systeme.io (name, links) or by you once, before activating. Fill every bracketed "your test" line with real results; delete the line if you have none.
