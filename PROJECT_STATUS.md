# PROJECT_STATUS.md - White Pine Medical Shopify Website

> ⚠️ **WARNING: THIS IS SHOPIFY WEBSITE DOCUMENTATION**
>
> Repository: `medic8stat/shopifywebsite` | Store: whitepinemedical.myshopify.com
>
> **NOT** the EHR Platform (`medic8stat/praxis_ehr`)

> **Current Status:** Live and actively maintained
> **Last Updated:** 2026-06-11
> **Version:** 6.1.1
> **Theme:** Broadcast 8.0.0 — **ID 182960718119 is the PUBLISHED LIVE theme** (TS Media Design 178766348583 is deprecated)

---

## Quick Status Summary

| Area | Status | Notes |
|------|--------|-------|
| Homepage | ✅ Live | Hero links to /pages/services; studio headshots in About Physician + Prioritize tile |
| Services Page | ✅ Live | 4 pathway options incl. **Physician Deep Dive (Option 2)**; 10 assessment categories; 0 em-dashes |
| Dr. James French Page | ✅ Live | **at /pages/about-dr-james-french** (NOT /pages/dr-james-french); studio headshot hero |
| Privacy & Trust | ✅ Live | **at /pages/privacy-and-trust** (NOT /pages/privacy-trust) |
| Urgent Care | ✅ Live | /pages/urgent-care |
| Corporate Wellness | ✅ Live | /pages/corporate-wellness-longevity-services; seated headshot |
| Contact | ✅ Live | Emails plain text (mailto links = nice-to-have) |
| Footer | ✅ Live | Customer Care column has real links (text block, not admin menu); newsletter copy on-brand |
| Social icons | ✅ Live | FB / X (@grade1view) / YouTube (@JamesFrenchmedic8); IG+TikTok hidden until accounts exist |
| Products | ⚠️ Partial | 30 products live, **no product images**; 4 descriptions still carry em-dashes (admin edit) |
| Janice MacPherson feedback (2026-06-11) | ✅ 6/6 closed | All items verified live |

## Last Session (2026-06-11, session 2)

Full site audit (dead links, social, watermark hunt across all 22 images) then fixes: killed the sitewide gift-card 404 and the hero's link to the deprecated product, swapped all four Dr. French photo slots to the new studio headshots, shipped the Physician Deep Dive as Option 2 on the services page (story-led copy, hourly private billing, enquiry CTA), and gave the Customer Care footer column real links. The session also caught a live Shopify order that never reached the EHR CRM — root-caused and fixed in praxis_ehr (ISS-361/362/363, API v2.64.37→40): webhook registered + two payload parsing bugs fixed, info@ added to lead-email search, SLA-breach sweep + overdue UI built. `shopify-content.mjs` push commands gained `--allow-live` (Broadcast is now the live theme; non-interactive pushes were dying on a CLI prompt).

## Next Actions

1. **James approvals pending:** Janice reply draft; apology drafts for Geoffrey (need his email from the Shopify order page), Tidal Hearing + Balance (sharpen after reading their email in the CRM, now possible), and Ester. All drafted 2026-06-11, in chat transcript.
2. **James to confirm:** Shelley Wood (15d) and Hilary Alward (76d) qualified leads — handled offline or genuinely missed?
3. **Photo system:** replacements for the 4 off-brand tiles (genetics robot hand, metabolic chem lab, mental-health couple, Option 1 hologram) + 30 product images. GPT brand brief exists (premium clinic, real people, navy accents, no sci-fi).
4. **Admin-side cleanups:** delete/replace old product's green "Live Better Longer" image; unpublish stray "Contact us - new client enquiry" page; 4 product descriptions with em-dashes; optionally unpublish empty News blog.
5. **Verify Facebook icon** lands on the right page (one logged-in click).
6. praxis_ehr: ISS-364 redesign batch (task system); 15-min overdue-task triage with James now that the Overdue tile is live.

## Blockers

- Apology/Janice emails: waiting on James approval (hard rule: nothing sends unapproved)
- Product images: waiting on photo decisions (shoot vs licensed vs generated set)

## Key References

| Item | Value |
|------|-------|
| LIVE theme ID | 182960718119 (Broadcast) — pushes go live immediately; script uses `--allow-live` |
| Preview URL trick | not needed; Broadcast IS live |
| Page handles | about-dr-james-french, privacy-and-trust, corporate-wellness-longevity-services, services, urgent-care, contact, about |
| Unpublished templates | page.for-business, page.faq (exist in repo, no pages created) |
| Social | FB profile.php?id=61588985084710 · x.com/grade1view · youtube.com/@JamesFrenchmedic8 |
| Settings gotcha | settings_data.json TOP-LEVEL keys are live; presets.Broadcast is mirrored only (see CLAUDE.md) |

---

**Version history:** 6.1.1 (2026-06-11 session 2) · 6.1.0 (2026-06-11 Janice fixes) · 6.0.x (2026-01 restructure) — full detail in CHANGELOG.md
