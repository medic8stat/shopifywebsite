# James Session Quick Start Guide - Shopify Website

> **Gold Standard Workflow v3.0** - Updated 2026-01-21

Copy/paste these prompts when working with Claude on the White Pine Medical Shopify website.

---

## PROJECT REFERENCE

| Property | Value |
|----------|-------|
| **GitHub Repository** | `medic8stat/shopifywebsite` |
| **Local Path** | `/Users/jamesfrench/shopify-themes/broadcast` |
| **Store** | whitepinemedical.myshopify.com |
| **Theme** | Broadcast 8.0.0 |
| **Dev Theme ID** | 182960718119 (SAFE) |
| **Live Theme ID** | 178766348583 (NEVER PUSH) |

---

## UNIVERSAL SESSION START (Recommended)

Copy this entire block to start any Shopify session:

```
THIS IS SHOPIFY WEBSITE WORK - NOT EHR!

Repository: medic8stat/shopifywebsite
Local Path: /Users/jamesfrench/shopify-themes/broadcast
Store: whitepinemedical.myshopify.com
Dev Theme ID: 182960718119 (Broadcast) - SAFE
Live Theme ID: 178766348583 (TS Media Design) - NEVER PUSH

FIRST: Read the single source of truth:
/Users/jamesfrench/shopify-themes/broadcast/CLAUDE.md

Also check:
/Users/jamesfrench/shopify-themes/broadcast/KNOWN_ISSUES.md
/Users/jamesfrench/shopify-themes/broadcast/CHANGELOG.md

CRITICAL WORKFLOW RULES:

1. TWO TYPES OF CHANGES:
   - CODE (Liquid, CSS, JS): Claude edits locally → push
   - CONTENT (images, text, colors): User edits in Shopify Customizer

2. ALWAYS PULL BEFORE STARTING:
   cd ~/shopify-themes/broadcast
   shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

3. NEVER EDIT JSON FILES FOR CONTENT CHANGES:
   - DON'T edit templates/*.json to change images/text
   - DO tell user to use Shopify Admin → Themes → Customize

4. USE ENVIRONMENT-BASED PUSH (JSON auto-ignored):
   shopify theme push -e broadcast

5. NEVER PUSH TO PRODUCTION:
   FORBIDDEN: shopify theme push --theme 178766348583
   FORBIDDEN: shopify theme push -e production

6. VERIFY AT PREVIEW URL (not localhost):
   https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119

7. COMMIT AFTER EVERY UNIT OF WORK:
   git add -A && git commit -m "type(scope): description"
   git push

FILE PROTECTION (already configured):
- .shopifyignore protects JSON files during push
- shopify.theme.toml defines safe environments
```

---

## CONTENT/IMAGE CHANGE REQUEST

When user asks to change images, hero banners, text content, colors, or fonts:

```
THIS IS SHOPIFY WEBSITE WORK - NOT EHR!

Read: /Users/jamesfrench/shopify-themes/broadcast/CLAUDE.md

CONTENT CHANGES require Shopify Customizer - NOT code edits.

When user requests image/text/color changes, respond:

"This change requires Shopify Customizer. Please:
1. Go to https://admin.shopify.com/store/whitepinemedical/themes
2. Find the **Broadcast** theme (NOT the live theme)
3. Click **Customize**
4. Make your changes and click **Save**
5. Let me know when done and I'll sync to git."

After user confirms, run:
cd ~/shopify-themes/broadcast
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
git add -A && git commit -m "content: Update via Customizer"
git push
```

---

## CODE EDITING MODE

For Liquid templates, CSS, JavaScript, section schemas:

```
THIS IS SHOPIFY WEBSITE WORK - NOT EHR!

Read: /Users/jamesfrench/shopify-themes/broadcast/CLAUDE.md

CODE CHANGES WORKFLOW:

1. PULL FIRST (always):
   cd ~/shopify-themes/broadcast
   shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

2. MAKE CODE CHANGES:
   - Edit .liquid files in /sections/, /snippets/, /layout/
   - Edit .css/.js files in /assets/
   - DO NOT edit templates/*.json for content changes

3. PUSH TO SHOPIFY:
   shopify theme push -e broadcast

4. VERIFY:
   https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119

5. COMMIT:
   git add -A && git commit -m "type(scope): description"
   git push

CONTENT RULES (if editing text in Liquid):
- NO "AI" or "Artificial Intelligence" - use "next-generation electronic health system"
- NO "Shop Now" buttons - use "View Services"
- NO "elite/visionary/unmatched" language
- Coaching is "up to 12 months" (variable)
```

---

## STYLING / CSS MODE

```
THIS IS SHOPIFY WEBSITE WORK - NOT EHR!

Read: /Users/jamesfrench/shopify-themes/broadcast/CLAUDE.md

BRAND COLORS:
- Navy: #1E3A5F (primary - headers, buttons)
- Blue: #2563EB (accent - links, highlights)
- Banner Blue: #0066CC (website banner)
- Light Blue: #f0f7ff (backgrounds)
- White: #FFFFFF

COLOR SCHEMES (in settings_data.json - edit via Customizer):
- scheme-1: White bg, navy text (default)
- scheme-2: Navy bg, white text (dark sections)
- scheme-3: Light blue bg, navy text (highlighted)
- scheme-4: Blue bg, white text (CTA)

CSS FILES:
- /Users/jamesfrench/shopify-themes/broadcast/assets/custom-whitepine.css

WORKFLOW:
1. Pull first
2. Edit CSS files (NOT JSON for color scheme changes)
3. shopify theme push -e broadcast
4. Verify at preview URL
5. git add -A && git commit -m "style: description" && git push
```

---

## NEW SECTION/TEMPLATE MODE

```
THIS IS SHOPIFY WEBSITE WORK - NOT EHR!

Read: /Users/jamesfrench/shopify-themes/broadcast/CLAUDE.md

CREATING NEW SECTIONS (.liquid files):
1. Create file in /Users/jamesfrench/shopify-themes/broadcast/sections/
2. Include {% schema %} block defining settings
3. Push to Shopify: shopify theme push -e broadcast
4. Section becomes available in Customizer

CREATING NEW PAGE TEMPLATES (.json files):
1. Create file in /Users/jamesfrench/shopify-themes/broadcast/templates/
2. Name format: page.[handle].json
3. Push to Shopify: shopify theme push -e broadcast
4. Create page in Shopify Admin → Pages
5. Select the new template
6. Configure content via Customizer

EXISTING TEMPLATES:
- index.json (homepage)
- product.json (product page)
- page.about.json
- page.contact.json
- page.privacy-trust.json
- page.urgent-care.json

After creating:
git add -A && git commit -m "template: description" && git push
```

---

## QUICK COMMANDS REFERENCE

### Session Start (ALWAYS DO THIS)

```bash
cd ~/shopify-themes/broadcast
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
git status
```

### Push Code Changes

```bash
shopify theme push -e broadcast
git add -A && git commit -m "type(scope): description"
git push
```

### Session End

```bash
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
git add -A && git commit -m "session: End of session sync"
git push
```

### Start Dev Server (Optional)

```bash
shopify theme dev --store whitepinemedical.myshopify.com
# Preview at: http://127.0.0.1:9292
# NOTE: May show stale CDN content - verify at preview URL instead
```

### Fallback Push (if .shopifyignore not working)

```bash
shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com \
  --ignore "config/settings_data.json" \
  --ignore "templates/*.json" \
  --ignore "sections/group-*.json"
```

---

## TROUBLESHOOTING

### Changes Not Appearing

1. Clear browser cache: Cmd+Shift+R
2. Use incognito window
3. Check preview URL (not localhost): `?preview_theme_id=182960718119`
4. Wait for CDN (up to 2 hours)
5. Verify push succeeded in CLI output

### Hero Image Changes Lost

1. Did you edit JSON locally? DON'T. Use Customizer.
2. Did you push after Customizer changes? Pull first next time.
3. CDN caching: Wait or use incognito.

### Dev Server Shows Wrong Content

1. Stop dev server (Ctrl+C)
2. Pull latest from Shopify
3. Restart dev server
4. Hard refresh browser

---

## USER SHORTCUTS

| Command | Action |
|---------|--------|
| `JDI: [task]` | Just Do It - execute without explanation |
| `EF: [task]` | Explain First - outline plan, wait for approval |
| `Status check` | Report what's done, pending, blockers |
| `Session checkpoint` | Commit all, push, verify |
| `End of session` | Final commit, push, deploy |

---

## END OF SESSION CHECKLIST

```
END OF SESSION - Run from ~/shopify-themes/broadcast:

1. Pull latest from Shopify:
   shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

2. Check git status:
   git status (should show clean or have pulled changes)

3. Commit any changes:
   git add -A && git commit -m "session: End of session sync"

4. Push to GitHub:
   git push

5. Verify at preview URL:
   https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119

6. Update CHANGELOG.md if significant changes made
```

---

## THEME IDs - CRITICAL SAFETY

| Theme | ID | Status |
|-------|-----|--------|
| **Broadcast** | 182960718119 | SAFE - Push here |
| **TS Media Design** | 178766348583 | FORBIDDEN - Never push |

---

## URLS

| Purpose | URL |
|---------|-----|
| Preview (Dev) | https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119 |
| Live Site | https://www.whitepinemedical.ca |
| Shopify Admin | https://admin.shopify.com/store/whitepinemedical |
| Theme Editor | Shopify Admin → Online Store → Themes → Customize |

---

## FILE STRUCTURE

```
/Users/jamesfrench/shopify-themes/broadcast/
├── CLAUDE.md                 ← Single source of truth
├── KNOWN_ISSUES.md           ← Bug tracking
├── CHANGELOG.md              ← Version history
├── .shopifyignore            ← Protects JSON during push
├── shopify.theme.toml        ← Environment config
├── assets/                   ← CSS, JS
├── config/                   ← settings_data.json (PROTECTED)
├── layout/                   ← theme.liquid
├── sections/                 ← Section components
├── snippets/                 ← Reusable code
├── templates/                ← Page templates (PROTECTED)
└── archive/                  ← Archived docs
```

---

## RELATED SYSTEMS (Different Projects!)

| System | URL | Local Path |
|--------|-----|------------|
| **Shopify Website** | whitepinemedical.ca | ~/shopify-themes/broadcast |
| Patient Portal | portal.whitepinemedical.ca | ~/clinalytix-ehr-work |
| Clinician EHR | app.whitepinemedical.ca | ~/clinalytix-ehr-work |

---

## CONTACT INFO

| Type | Address |
|------|---------|
| General | info@whitepinemedical.ca |
| Bookings | bookings@whitepinemedical.ca |
| Privacy | privacy@whitepinemedical.ca |

---

**Version:** 3.0.0
**Last Updated:** 2026-01-21
