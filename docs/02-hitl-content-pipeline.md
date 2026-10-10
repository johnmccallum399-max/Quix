# Module 2: Human-in-the-loop content pipeline

Target: 1 publishable BOFU comparison article per working day, 3 days a week. Each article is roughly 70% machine-assisted drafting and 30% human verification and original material. The human 30% is what makes the page rank and be worth citing; do not skip it.

## Stage 1: AI acceleration (about 2 hours)

Run these prompts in order in one chat. Replace `{{...}}`.

**P1: SERP intent extraction**
```
I'm writing a bottom-of-funnel comparison article targeting "{{keyword}}".
Here are the titles, H2s and "People also ask" questions from the top 10 results (pasted below).
1. Classify the dominant search intent and the reader's stage.
2. List the 10 questions a buyer needs answered before purchasing, ranked by importance.
3. List what every result covers (table stakes) and what none covers (gaps).
4. Propose 5 original angles that would require first-hand testing to write.
Output as markdown with these four headings. Do not invent statistics.

{{pasted SERP data}}
```

**P2: Comparison outline**
```
Using the gaps above, outline an article comparing {{tool A}}, {{tool B}} and {{tool C}} for {{reader}}.
Requirements: one-paragraph verdict at the top; a comparison matrix (rows = criteria, columns = tools);
one H2 per tool with sections "Best for", "Not for", "What we tested", "Pricing"; an FAQ of 6 questions
phrased as a buyer would ask them. Mark every place that needs first-hand evidence with [TEST NEEDED: what to test].
```

**P3: First draft**
```
Write the draft from this outline. Rules: plain, specific language; no superlatives without a stated reason;
short paragraphs; every factual claim about pricing, limits or features goes in a list titled "To verify" at the end
instead of being asserted; leave every [TEST NEEDED] marker in place; do not write any personal experience or
numbers I have not supplied. Disclose at the top: "This page contains sponsored (affiliate) links."
```

**P4: Self-critique**
```
Review the draft as a skeptical buyer. List: claims that sound generic or unsupported, places where two tools are
treated unequally, and any sentence that reads like marketing copy. Do not rewrite yet.
```

## Stage 2: Human quality gate (about 1 hour; all ten must pass before publishing)

1. **Tested it.** Each recommended tool was used by you for a real task, on a real account (free trial counts).
2. **Own screenshots.** At least 3 original screenshots per tool, cropped, with alt text describing the feature shown.
3. **Proprietary data.** One original number or result per article: setup time, emails sent, time saved, a pricing comparison you built. State how you measured it.
4. **Verified specs.** Every item in "To verify" checked against the vendor's pricing page or docs on the date of publishing; add "Last verified: YYYY-MM-DD".
5. **Personal verdict.** A short first-person verdict per tool, including at least one real drawback.
6. **Even-handed.** Ranking would be the same if commissions were swapped. If a tool has no affiliate program, it is still included where it deserves to be.
7. **Disclosure.** Banner at top, "(Sponsored Link)" beside every affiliate link, `rel="sponsored"` on all of them.
8. **Claims check.** No income promises, no "guaranteed", no unsourced statistics, no fabricated quotes or reviews.
9. **Quotes.** Any quote from a vendor or user is real, attributed and permission-checked, or removed.
10. **Read-aloud pass.** Read it once out loud. Cut anything you would not say to a prospect.

## GEO / LLMO formatting protocol

Nobody can *force* ChatGPT or Perplexity to cite a site. These formatting choices make a page easy to extract and quote, which is what you can control:

- **Answer first.** Put a 2-3 sentence direct answer under the H1 ("For cold-email teams on a budget, X is the best fit because...").
- **One question per H2/H3**, written as the buyer would ask it, followed by a self-contained 40-60 word answer.
- **Markdown comparison matrix** near the top: same criteria for every tool, units in every cell, "last verified" date in the caption.
- **Own data in a labeled block**: `**Our test:** sent 200 emails across 3 mailboxes; 94% reached primary inbox (method below).` Only real results.
- **Attributed quotes** in `>` blockquotes with name, role and source link.
- **Schema**: `ItemList` + `SoftwareApplication` (already in the table component), `FAQPage` for the FAQ block, `Article` with author, `datePublished` and `dateModified`.
- **Author page** with real credentials and a visible "Last updated" date; refresh each article every 90 days.
- **Allow crawlers.** Do not block major AI user agents in `robots.txt` if you want to be cited. (`/go/` stays blocked.)
- **Track it**: monthly, ask ChatGPT, Perplexity and Gemini your 10 target questions and log whether you are cited.

## Weekly cadence (3 days)
- Day A: SERP research + P1/P2 for 3 articles; run P3 for the first.
- Day B: Test tools, capture screenshots, finish quality gate on article 1; draft 2 and 3.
- Day C: Finish gate on 2 and 3, publish, internal-link, submit to search console, send to newsletter.
