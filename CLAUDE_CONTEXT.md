# CLAUDE_CONTEXT.md - Shopify Website Development Context

> **For AI Assistants:** This is your comprehensive context file. Read this for all Shopify website work.

---

## CRITICAL: Why Changes Were Being Lost

### Root Cause Analysis (January 2026)

We discovered why hero banners and other content changes were disappearing:

1. **Theme 2.0 Architecture**: Content is stored in JSON files, NOT just settings_data.json
   - `config/settings_data.json` - Global theme settings
   - `templates/*.json` - Page-specific sections (hero images, text blocks)
   - `sections/group-*.json` - Header/footer configurations

2. **One-Way Sync**: `shopify theme push` OVERWRITES remote with local
   - Customizer changes (images, text) are stored in JSON on Shopify
   - Local push destroys those changes with stale local JSON

3. **Missing Protection**: No `.shopifyignore` or `shopify.theme.toml` existed

### Solution Implemented

- Created `.shopifyignore` to protect JSON files during push
- Created `shopify.theme.toml` for environment-based deployments
- Established clear workflow separating CODE vs CONTENT changes

---

## 1. Project Overview

**White Pine Medical** - Public-facing Shopify website for a health and longevity company.

| Property | Value |
|----------|-------|
| Store URL | whitepinemedical.myshopify.com |
| Live Site | whitepinemedical.ca |
| Theme | Broadcast 8.0.0 |
| Dev Theme ID | 182960718119 (Broadcast) |
| Live Theme ID | 178766348583 (TS Media Design) - NEVER PUSH |
| GitHub Repo | medic8stat/shopifywebsite |
| Local Path | ~/shopify-themes/broadcast |
| Shopify CLI | 3.89.0 |

---

## 2. The Two Types of Changes

### Type A: CODE CHANGES (Claude Code handles these)

| What | Examples | Files |
|------|----------|-------|
| Templates | Layout structure, section schemas | `.liquid` files |
| Styles | CSS, SCSS | `/assets/*.css` |
| Scripts | JavaScript | `/assets/*.js` |
| Snippets | Reusable code | `/snippets/*.liquid` |
| New sections | Section schemas | `/sections/*.liquid` |

**Workflow:**
```bash
# 1. Pull first (ALWAYS)
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

# 2. Make code changes locally

# 3. Push (JSON files auto-ignored via .shopifyignore)
shopify theme push -e broadcast

# 4. Commit
git add -A && git commit -m "type(scope): description"
git push
```

### Type B: CONTENT CHANGES (User handles via Shopify Customizer)

| What | Examples | Where Stored |
|------|----------|--------------|
| Images | Hero banners, photos | `templates/*.json` |
| Text | Headings, paragraphs | `templates/*.json` |
| Colors | Theme colors | `config/settings_data.json` |
| Fonts | Typography | `config/settings_data.json` |
| Logo | Site logo | `config/settings_data.json` |
| Blocks | Section arrangements | `templates/*.json` |

**Workflow:**
1. User goes to Shopify Admin → Themes → Customize (on Broadcast theme)
2. Makes changes in visual editor
3. Clicks Save
4. Claude pulls and commits:
   ```bash
   shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
   git add -A && git commit -m "content: Update via Customizer"
   git push
   ```

---

## 3. Critical Development Rules

### NEVER PUSH TO LIVE THEME

```
FORBIDDEN: shopify theme push --theme 178766348583
FORBIDDEN: shopify theme push -e production
```

### ALWAYS Pull Before Starting

```bash
cd ~/shopify-themes/broadcast
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
```

### Use Environment-Based Push

```bash
# This automatically ignores JSON files per shopify.theme.toml
shopify theme push -e broadcast
```

### Verify at Preview URL (Not Localhost)

```
https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
```

The dev server (localhost:9292) may show stale CDN content.

---

## 4. File Protection Configuration

### .shopifyignore

Located at: `/Users/jamesfrench/shopify-themes/broadcast/.shopifyignore`

Prevents push from overwriting:
- `config/settings_data.json`
- `templates/index.json`
- `templates/page.about.json`
- `templates/page.contact.json`
- `templates/page.privacy-trust.json`
- `templates/page.urgent-care.json`
- `templates/product.json`
- `sections/group-header.json`
- `sections/group-footer.json`

### shopify.theme.toml

Located at: `/Users/jamesfrench/shopify-themes/broadcast/shopify.theme.toml`

Defines environments:
- `broadcast` - Development theme (182960718119) with ignore rules
- `production` - Live theme (178766348583) - NEVER USE

---

## 5. Complete Session Workflows

### Starting a Session

```bash
# 1. Navigate to theme directory
cd ~/shopify-themes/broadcast

# 2. ALWAYS pull latest from Shopify first
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

# 3. Check for any uncommitted changes
git status

# 4. (Optional) Start dev server for hot reloading
shopify theme dev --store whitepinemedical.myshopify.com
```

### Making Code Changes

```bash
# 1. Make changes to .liquid, .css, .js files (NOT JSON!)

# 2. Push to Broadcast theme
shopify theme push -e broadcast

# 3. Verify at preview URL
# https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119

# 4. Commit and push to GitHub
git add -A && git commit -m "type(scope): description"
git push
```

### When User Requests Content/Image Changes

**DO NOT edit JSON files.** Instead, respond:

> "This change requires Shopify Customizer. Please:
> 1. Go to https://admin.shopify.com/store/whitepinemedical/themes
> 2. Find the **Broadcast** theme (NOT the live theme)
> 3. Click **Customize**
> 4. Make your changes and click **Save**
> 5. Let me know when done and I'll sync to git."

Then after user confirms:
```bash
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
git add -A && git commit -m "content: Update via Customizer"
git push
```

### Ending a Session

```bash
# 1. Stop dev server if running (Ctrl+C)

# 2. Pull latest from Shopify (capture Customizer changes)
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

# 3. Commit all changes
git add -A && git commit -m "session: End of session sync"
git push

# 4. Verify at preview URL
# https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
```

---

## 6. Troubleshooting

### Changes Not Appearing After Push

1. **Clear browser cache**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Use incognito window**: Test in private browsing
3. **Check preview URL**: Use `?preview_theme_id=182960718119` not localhost
4. **Wait for CDN**: Changes can take up to 2 hours to propagate globally
5. **Verify push succeeded**: Check CLI output for errors

### Hero Image Changes Not Appearing

1. **Did you edit JSON locally?** DON'T. Use Shopify Customizer.
2. **Did you push after Customizer changes?** That overwrote them. Pull first.
3. **CDN caching**: Wait up to 2 hours or try incognito mode.

### Dev Server Shows Wrong Content

1. Stop dev server (Ctrl+C)
2. Pull latest: `shopify theme pull --theme 182960718119`
3. Restart dev server: `shopify theme dev`
4. Hard refresh browser: Cmd+Shift+R

### .shopifyignore Not Working

Known Shopify CLI bug. Use explicit ignore in push command:
```bash
shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com \
  --ignore "config/settings_data.json" \
  --ignore "templates/*.json" \
  --ignore "sections/group-*.json"
```

---

## 7. Quick Commands Reference

| Action | Command |
|--------|---------|
| Pull from Shopify | `shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com` |
| Push to Broadcast | `shopify theme push -e broadcast` |
| Push with explicit ignore | `shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com --ignore "config/*.json" --ignore "templates/*.json"` |
| Start dev server | `shopify theme dev --store whitepinemedical.myshopify.com` |
| List themes | `shopify theme list --store whitepinemedical.myshopify.com` |
| Check CLI version | `shopify version` |
| Git commit | `git add -A && git commit -m "type(scope): description"` |
| Git push | `git push` |

---

## 8. Theme IDs Reference

| Theme | ID | Role | Safe to Push? |
|-------|-----|------|---------------|
| Broadcast | 182960718119 | Development/Staging | YES |
| TS Media Design | 178766348583 | Live Production | NEVER |

---

## 9. URLs Reference

| Purpose | URL |
|---------|-----|
| Preview (Broadcast) | https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119 |
| Live Site | https://www.whitepinemedical.ca |
| Shopify Admin | https://admin.shopify.com/store/whitepinemedical |
| Theme Editor | Shopify Admin → Online Store → Themes → Customize |

---

## 10. Brand Assets

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| White Pine Navy | `#1E3A5F` | Primary - headers, buttons, dark backgrounds |
| White Pine Blue | `#2563EB` | Accent - links, secondary buttons, highlights |
| Banner Blue | `#0066CC` | Website banner |
| White | `#FFFFFF` | Backgrounds |
| Light Blue | `#f0f7ff` | Light background accents |

### Color Schemes (in settings_data.json)

| Scheme | Background | Text | Usage |
|--------|------------|------|-------|
| scheme-1 | White | Navy | Default content |
| scheme-2 | Navy | White | Dark sections, headers |
| scheme-3 | Light Blue | Navy | Highlighted sections |
| scheme-4 | Blue | White | CTA sections |

---

## 11. File Structure

```
broadcast/
├── .shopifyignore           # Protects JSON during push (NEW)
├── shopify.theme.toml       # Environment config (NEW)
├── assets/                  # CSS, JS, images
│   └── custom-whitepine.css # Custom White Pine styles
├── config/
│   ├── settings_data.json   # Theme settings (PROTECTED)
│   └── settings_schema.json # Settings definitions
├── layout/
│   └── theme.liquid         # Main layout wrapper
├── sections/                # Reusable section components
│   ├── group-header.json    # Header config (PROTECTED)
│   └── group-footer.json    # Footer config (PROTECTED)
├── snippets/                # Reusable code snippets
├── templates/               # Page templates (PROTECTED)
│   ├── index.json           # Homepage
│   ├── page.about.json      # About page
│   └── ...
└── Documentation files...
```

---

## 12. Documentation Files

| File | Purpose |
|------|---------|
| CLAUDE.md | Quick reference entry point |
| SHOPIFY_DEVELOPMENT_WORKFLOW.md | Complete workflow guide |
| CLAUDE_CONTEXT.md | This file - full context |
| KNOWN_ISSUES.md | Bug tracking |
| CHANGELOG.md | Version history |
| PROJECT_STATUS.md | Component completion |

---

## 13. User Shortcuts

| Command | Action |
|---------|--------|
| `JDI: [task]` | Just Do It - execute without explanation |
| `EF: [task]` | Explain First - outline plan, wait for approval |
| `Status check` | Report what's done, pending, blockers |
| `Session checkpoint` | Commit all, sync versions |
| `End of session` | Final commit, push, verify deployment |

---

**Version:** 2.0.0
**Last Updated:** 2026-01-21
**Primary Contact:** Dr. James French
