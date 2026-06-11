# Customer Feedback Fix Plan — 2026-06-11

Source: feedback from Janice MacPherson (Wallace McCain Institute), received 2026-06-11, viewing the live site on iPhone 13/15. Plus two additions from James: a Deep Dive service description is missing from the services area, and several photos need replacing.

Repo: `medic8stat/shopifywebsite`, cloned to `/Users/jamesfrench/shopifywebsite-work`. Live theme: Broadcast 8.0.0 (ID 182960718119) at whitepinemedical.ca. Repo verified in sync with live content (em-dash counts and section structure match the live HTML exactly).

---

## Audit results — every item confirmed

| # | Feedback item | Root cause (verified in code) | Fix |
|---|---|---|---|
| 1 | Assessment-domain titles wrap to 2 lines on iPhone | `templates/index.json` → `section-services-preview` has `layout_mobile: "2"` — two tiles per row on a ~390 px phone leaves ~170 px per tile; "Cardiovascular" etc. can't fit | Set `layout_mobile: "1"` (one tile per row on phones) |
| 2 | Em-dashes read as AI-generated | 10 in `templates/index.json` (hero subtitle, What We Do ×2, How Care Works "2. Prioritize", Why White Pine Is Different ×3, Dr. French bio, Trust & Safety FAQ ×2), 23 in `templates/page.services.json`, 4 in product titles in `products-import.csv` | Rewrite all prose em-dashes (comma / period / colon). Convert title separators ("Genetic Panel — Nutrigenetics") to colons. Product titles also need updating in Shopify admin since they appear in cart/checkout |
| 3 | "View Services" button under Dr. James French goes nowhere | `section-about-physician` buttons block: `button_text: "View Services"` but `button_url: ""` → theme renders dead `href="#!"` | Set `button_url: "/pages/services"` |
| 4 | "Have Questions?" has no concierge link | `section-cta` ("Ready to Begin?") — **none of the 3 columns have any link** (this section's column blocks don't support buttons; only rich text) | Add inline links in the text of all three columns: Start with a Physician → booking/contact; Explore Assessments → `/pages/services`; Have Questions? → "Contact the concierge team" → `/pages/contact` |
| 5 | Instagram/TikTok icons go to Shopify's accounts | `config/settings_data.json` still has theme defaults: `https://instagram.com/shopify`, `https://tiktok.com/@shopify` | Replace with real White Pine handles (input needed), or blank them to hide the icons until accounts exist |
| 6 | "Customer Care" footer heading is empty and links nowhere | `sections/group-footer.json` → Customer Care column is a menu block with `linklist: ""` — no navigation menu assigned | Create a "Customer Care" menu in Shopify admin (Contact, FAQ, Urgent Care, Privacy & Trust) and assign it; or delete the empty column. Menus are store data — cannot be created from the code side |
| 7 | No Deep Dive service description (James) | Zero mentions of "deep dive" anywhere on the services page | New pathway card on `/pages/services` matching the Option 1/2/3 style, optionally + dedicated page and purchasable product (copy + price input needed) |
| 8 | Photos need changing (James) | Homepage uses placeholder/stock files: `unnamed.jpg` (Cardiovascular tile), `fos-research-chem-bio-2.jpg` (chemistry stock on Metabolic tile), several `pexels-*` stock photos, `Screenshot_2025-02-21_112632.png`, `4.jpg`, `iStock-1311840964.jpg` | James names target images + supplies replacements; upload via admin Files, then re-point the JSON references |

Bonus finding (not in Janice's list): the "Stay in Touch" footer block still has Shopify's default copy — "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals." Wrong tone for a medical practice; rewrite while in there. (Janice reported an em-dash "under Stay in touch" — none exists there; the default copy is likely what registered as off.)

---

## Execution phases

**Phase 0 — one-time setup (James, ~5 min total)**
- `shopify auth login` browser approval on this machine (CLI 4.1.0 freshly installed; repo was last worked on from a different setup)
- Create the "Customer Care" navigation menu in Shopify admin (Online Store → Navigation)
- Provide: real Instagram/TikTok URLs (or "hide icons"), Deep Dive price/positioning, list of photos to swap + replacement files

**Phase 1 — text, link, and layout fixes (code-side, one batch)**
1. Pull fresh copies of the four files from the live theme before editing (golden rule — guard against drift since January): `templates/index.json`, `templates/page.services.json`, `config/settings_data.json`, `sections/group-footer.json`
2. Apply items 1–6 + newsletter copy
3. Push each file back with `node shopify-content.mjs push <file>` — **changes are live immediately** (Broadcast is the published theme)
4. Verify: re-scan live HTML for em-dashes (expect 0 prose occurrences), click every fixed link, phone-width device emulation for the Assessment Domains grid
5. Commit + push to git

**Phase 2 — Deep Dive service (draft → James review → build)**
Draft copy from the established deep-dive offering (records review, specialist-report analysis, physician synthesis, written plan). James reviews before it ships.

**Phase 3 — photos + product titles (admin-side, with James)**
Upload replacement images to Shopify admin Files, re-point JSON references; fix the 4 em-dash product titles in admin (or CSV re-import).

## Open items / inputs needed
- [x] Shopify CLI auth on this machine (2026-06-11)
- [x] **Phase 1 SHIPPED 2026-06-11** — all text/link/layout fixes live and verified (0 em-dashes on homepage + services, dead button fixed, 3 CTA links added, mobile 1-per-row, newsletter copy). 57 em-dashes removed across 8 templates; products-import.csv cleaned (9 more)
- [ ] Instagram / TikTok URLs (or hide) → then edit `config/settings_data.json` current block + push-settings
- [ ] Customer Care menu created in admin → then set `linklist` handle in `sections/group-footer.json` + push
- [ ] 4 live product descriptions still have em-dashes (admin edit): Metabolic Flexibility, Reaction Time, Lower Limb Power, Psychiatric Screening Online
- [ ] Deep Dive: price, bookable-vs-inquiry, copy sign-off
- [ ] Photo list + replacement files
