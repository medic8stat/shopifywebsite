# James Session Quick Start Guide - Shopify Website

> **Gold Standard Workflow v6.0** - Updated 2026-01-21

Copy/paste these prompts when working with Claude on the White Pine Medical Shopify website.

---

## CURRENT STATUS (v6.0.1)

**Broadcast theme is NOW LIVE** - Published 2026-01-21

| Page | Status | URL |
|------|--------|-----|
| Homepage | LIVE (8 sections) | whitepinemedical.myshopify.com |
| Services | LIVE (17 sections) | /pages/services |
| Privacy & Trust | LIVE | /pages/privacy-trust |
| Urgent Care | LIVE | /pages/urgent-care |

---

## PROJECT REFERENCE

| Property | Value |
|----------|-------|
| **GitHub Repository** | `medic8stat/shopifywebsite` |
| **Local Path** | `/Users/jamesfrench/shopify-themes/broadcast` |
| **Store** | whitepinemedical.myshopify.com |
| **Theme** | Broadcast 8.0.0 |
| **LIVE Theme ID** | **182960718119 (Broadcast) - NOW LIVE** |
| **Old Theme ID** | 178766348583 (TS Media Design) - DEPRECATED |

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

CRITICAL: THREE METHODS FOR CHANGES

1. CODE (Liquid, CSS, JS):
   - Edit files locally
   - shopify theme push -e broadcast
   - Commit and push

2. SETTINGS (colors, fonts, global settings):
   - node shopify-content.mjs pull-settings
   - Edit config/settings_data.json
   - node shopify-content.mjs push-settings
   - Commit and push

3. SECTION CONTENT (hero text, images, section order):
   - node shopify-content.mjs pull templates/index.json
   - Edit the JSON file
   - node shopify-content.mjs push templates/index.json
   - Commit and push

NO SHOPIFY CUSTOMIZER NEEDED - Claude controls everything via scripts.

NEVER PUSH TO PRODUCTION:
FORBIDDEN: shopify theme push --theme 178766348583

COMMIT AFTER EVERY UNIT OF WORK:
git add -A && git commit -m "type(scope): description"
git push
```

---

## THREE CHANGE METHODS - QUICK REFERENCE

### Method 1: CODE Changes (Liquid, CSS, JS)

```bash
cd ~/shopify-themes/broadcast
# Edit .liquid, .css, .js files
shopify theme push -e broadcast
git add -A && git commit -m "type(scope): description"
git push
```

### Method 2: SETTINGS Changes (Colors, Fonts)

```bash
cd ~/shopify-themes/broadcast
node shopify-content.mjs pull-settings
# Edit config/settings_data.json
node shopify-content.mjs push-settings
git add -A && git commit -m "style: description"
git push
```

### Method 3: SECTION CONTENT Changes (Hero, Text, Images)

```bash
cd ~/shopify-themes/broadcast
node shopify-content.mjs pull templates/index.json
# Edit templates/index.json
node shopify-content.mjs push templates/index.json
git add -A && git commit -m "content: description"
git push
```

---

## SCRIPT COMMANDS

```bash
# List all themes
node shopify-content.mjs list-themes

# Settings (config/settings_data.json)
node shopify-content.mjs pull-settings
node shopify-content.mjs push-settings

# Any theme file
node shopify-content.mjs pull <filename>
node shopify-content.mjs push <filename>

# Examples
node shopify-content.mjs pull templates/index.json
node shopify-content.mjs push templates/page.about.json
node shopify-content.mjs pull sections/group-header.json
```

---

## KEY FILES AND HOW TO EDIT THEM

| File | What It Controls | How to Edit |
|------|------------------|-------------|
| `config/settings_data.json` | Colors, fonts, global settings | `pull-settings` / `push-settings` |
| `templates/index.json` | Homepage sections | `pull` / `push` |
| `templates/page.*.json` | Page sections | `pull` / `push` |
| `sections/group-header.json` | Header/nav | `pull` / `push` |
| `sections/group-footer.json` | Footer | `pull` / `push` |
| `assets/*.css` | Stylesheets | Direct edit + code push |
| `sections/*.liquid` | Section templates | Direct edit + code push |
| `snippets/*.liquid` | Reusable code | Direct edit + code push |

---

## SESSION START

```bash
cd ~/shopify-themes/broadcast
git pull
node shopify-content.mjs pull-settings
git status
```

---

## SESSION END

```bash
cd ~/shopify-themes/broadcast
git add -A && git commit -m "session: End of session sync"
git push
```

---

## BRAND COLORS

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | `#1E3A5F` | Primary - headers, buttons |
| Blue | `#2563EB` | Accent - links, highlights |
| Banner Blue | `#0066CC` | Website banner |
| Light Blue | `#f0f7ff` | Backgrounds |
| White | `#FFFFFF` | Backgrounds |

---

## TROUBLESHOOTING

### Changes Not Appearing

1. Clear browser cache: Cmd+Shift+R
2. Use incognito window
3. Check preview URL: `?preview_theme_id=182960718119`
4. Wait for CDN (up to 2 hours)

### JSON Changes Not Appearing

1. Did you push? Use `node shopify-content.mjs push <filename>`
2. Did you pull first? Always pull before editing
3. Check for JSON syntax errors

### Script Errors

1. Ensure authenticated: `shopify theme list --store whitepinemedical.myshopify.com`
2. If not: `shopify auth login --store whitepinemedical.myshopify.com`

---

## URLS

| Purpose | URL |
|---------|-----|
| Live Site | whitepinemedical.myshopify.com |
| Domain | whitepinemedical.ca |
| Services | whitepinemedical.myshopify.com/pages/services |
| Privacy & Trust | whitepinemedical.myshopify.com/pages/privacy-trust |
| Urgent Care | whitepinemedical.myshopify.com/pages/urgent-care |
| Shopify Admin | admin.shopify.com/store/whitepinemedical |

---

## USER SHORTCUTS

| Command | Action |
|---------|--------|
| `JDI: [task]` | Just Do It - execute without explanation |
| `EF: [task]` | Explain First - outline plan, wait for approval |
| `Status check` | Report what's done, pending, blockers |
| `Session checkpoint` | Commit all, sync versions |
| `End of session` | Final commit, push, verify |

---

## THEME IDs - UPDATED

| Theme | ID | Status |
|-------|-----|--------|
| **Broadcast** | 182960718119 | **NOW LIVE** - Primary theme |
| **TS Media Design** | 178766348583 | DEPRECATED - No longer used |

---

## API TOKEN NOTE

**Not needed.** The `shopify-content.mjs` script uses Shopify CLI's existing authentication.

We attempted to create a Shopify Admin API custom app but discovered:
- Partners Dashboard shows Client ID/Secret, not Admin API tokens
- Shopify CLI stores auth in macOS Keychain (not extractable)
- Solution: CLI wrapper script that uses existing auth

The `shopify-admin-api.mjs` script exists but requires a token. Use `shopify-content.mjs` instead.

---

**Version:** 6.0.1
**Last Updated:** 2026-01-21
