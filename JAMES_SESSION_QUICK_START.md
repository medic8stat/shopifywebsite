# James Session Quick Start Guide - Shopify Website

Copy/paste these prompts when working with Claude on the White Pine Medical Shopify website.

**GitHub Repository**: `medic8stat/shopifywebsite`
**Store**: whitepinemedical.myshopify.com
**Theme**: Broadcast 8.0.0

---

## HOW TO USE THIS GUIDE

1. **Pick ONE prompt** based on what you're doing
2. **Copy/paste the entire code block** at session start
3. **The prompt tells Claude exactly what to read** - no guessing
4. **Each prompt is self-contained** - includes rules and reminders

---

## UNIVERSAL SESSION START (Recommended Default)

Use this for general Shopify website work.

```
Read these files from shopify-themes/broadcast:
1. CLAUDE.md (quick overview)
2. CLAUDE_CONTEXT.md (credentials, commands, full context)
3. CHANGELOG.md (recent changes)
4. KNOWN_ISSUES.md (active issues)

CRITICAL RULES:
- NEVER push to live theme (TS Media Design #178766348583)
- ALWAYS push to Broadcast theme (#182960718119)
- COMMIT after every unit of work
- Test with `shopify theme dev` before pushing

Store: whitepinemedical.myshopify.com
```

---

## MODE-SPECIFIC PROMPTS

### 1. CONTENT EDITING MODE

Use when updating text, copy, or page content.

```
Read these files from shopify-themes/broadcast:
1. CLAUDE_CONTEXT.md - Content guidelines (Section 9)
2. templates/index.json - Homepage content
3. CHANGELOG.md - What's already been changed

CONTENT RULES:
- NO "AI" or "Artificial Intelligence" - use "next-generation electronic health system"
- NO "Shop Now" buttons - use "View Services"
- NO "elite/visionary/unmatched" language
- Coaching is "up to 12 months" (variable)
- Tone: Professional, physician-led, evidence-based

After changes:
1. COMMIT: git add -A && git commit -m "content: [description]"
2. PUSH: git push
3. DEPLOY: shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com
4. UPDATE: CHANGELOG.md
```

### 2. STYLING / CSS MODE

Use when working on colors, fonts, or visual styling.

```
Read these files from shopify-themes/broadcast:
1. CLAUDE_CONTEXT.md Section 5 - Brand Assets
2. config/settings_data.json - Theme color settings
3. assets/custom-whitepine.css - Custom styles

BRAND COLORS:
- Navy: #1E3A5F (primary)
- Blue: #2563EB (accent)
- Banner Blue: #0066CC (planned)
- Light Blue: #f0f7ff (backgrounds)

COLOR SCHEMES:
- scheme-1: White bg, navy text (default)
- scheme-2: Navy bg, white text (dark sections)
- scheme-3: Light blue bg, navy text (highlighted)
- scheme-4: Blue bg, white text (CTA)

After changes:
1. TEST: shopify theme dev --store whitepinemedical.myshopify.com
2. COMMIT: git add -A && git commit -m "style: [description]"
3. PUSH: git push
4. DEPLOY: shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com
```

### 3. PAGE TEMPLATE MODE

Use when creating new page templates or modifying existing ones.

```
Read these files from shopify-themes/broadcast:
1. CLAUDE_CONTEXT.md Section 7 - File Structure
2. templates/ - Existing templates for reference
3. sections/ - Available section types

TEMPLATE RULES:
- JSON templates go in templates/ folder
- Section types must match files in /sections/
- Block types must match schema in section files
- Reference images as shopify://shop_images/filename.jpg

EXISTING TEMPLATES:
- index.json (homepage)
- product.json (product page)
- page.privacy-trust.json (privacy page)
- page.urgent-care.json (urgent care)

After creating template:
1. CREATE page in Shopify Admin → Pages
2. SELECT the new template
3. COMMIT and PUSH
4. DEPLOY to Broadcast theme
```

### 4. HEADER / NAVIGATION MODE

Use when modifying header, menus, or navigation.

```
Read these files from shopify-themes/broadcast:
1. sections/group-header.json - Header configuration
2. CLAUDE_CONTEXT.md Section 8 - Page structure

HEADER COMPONENTS:
- Announcement bar (currently disabled)
- Main header with logo, menu, buttons
- Mobile menu

CURRENT BUTTONS:
- Patient Portal → portal.whitepinemedical.ca
- Clinician EHR → app.whitepinemedical.ca

MENUS (managed in Shopify Admin):
- Main menu: Shopify Admin → Content → Menus

After changes:
1. TEST mobile and desktop views
2. COMMIT and PUSH
3. DEPLOY to Broadcast theme
```

---

## QUICK COMMANDS

### Development

```bash
# Start local dev server
cd ~/shopify-themes/broadcast
shopify theme dev --store whitepinemedical.myshopify.com

# Preview at: http://127.0.0.1:9292
```

### Deployment

```bash
# Push to staging (Broadcast theme)
shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com

# Make live (publish Broadcast)
shopify theme publish --theme 182960718119 --store whitepinemedical.myshopify.com
```

### Git

```bash
# Commit
git add -A && git commit -m "type(scope): description"

# Push
git push

# Status
git status
```

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
END OF SESSION - Verify:

1. All changes committed?
   → git status (should show clean)

2. Pushed to GitHub?
   → git push

3. Pushed to Broadcast theme?
   → shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com

4. CHANGELOG.md updated?
   → Document what changed

5. KNOWN_ISSUES.md updated (if bug fixed)?
   → Mark issues as resolved
```

---

## THEME IDS - CRITICAL!

| Theme | ID | Action |
|-------|-----|--------|
| **Broadcast** | 182960718119 | ✅ PUSH HERE (dev/staging) |
| **TS Media Design** | 178766348583 | ❌ NEVER PUSH (live) |

---

## CONTACT INFO FOR CONTENT

| Type | Address |
|------|---------|
| General | info@whitepinemedical.ca |
| Bookings | bookings@whitepinemedical.ca |
| Privacy | privacy@whitepinemedical.ca |

---

## RELATED SYSTEMS

| System | URL |
|--------|-----|
| Patient Portal | portal.whitepinemedical.ca |
| Clinician EHR | app.whitepinemedical.ca |
| Main Website | whitepinemedical.ca |

---

**Last updated:** 2026-01-21
