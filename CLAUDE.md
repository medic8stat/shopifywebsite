# White Pine Medical - Shopify Theme Development Guide

> **For AI Assistants:** This is the single source of truth for Shopify website development. Follow these procedures EXACTLY.

---

## CRITICAL: The Two Types of Changes

| Type | Examples | How to Make | Who Does It |
|------|----------|-------------|-------------|
| **CODE** | Liquid, CSS, JS, section schemas | Edit locally → Push | Claude Code |
| **CONTENT** | Images, text, colors, fonts, logos | Shopify Customizer | User (via Admin) |

### Why This Matters

**Theme 2.0 stores content in JSON files:**
- `config/settings_data.json` - Global theme settings
- `templates/*.json` - Page-specific sections (hero images, text blocks)
- `sections/group-*.json` - Header/footer configurations

**When you `push`, local JSON overwrites remote JSON.** This DESTROYS any Customizer changes.

---

## The Golden Rules

### 1. ALWAYS Pull Before Starting Work

```bash
cd ~/shopify-themes/broadcast
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
```

### 2. NEVER Edit JSON Files for Content Changes

```
BAD:  Edit templates/index.json to change hero image URL
GOOD: Use Shopify Admin → Themes → Customize
```

### 3. Use Environment-Based Push

```bash
shopify theme push -e broadcast
```
JSON files are auto-ignored via `.shopifyignore` and `shopify.theme.toml`.

### 4. NEVER Push to Production Theme

```
FORBIDDEN: shopify theme push --theme 178766348583
FORBIDDEN: shopify theme push -e production
```

### 5. Verify at Preview URL (Not Localhost)

```
https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
```

---

## Project Overview

| Property | Value |
|----------|-------|
| Store URL | whitepinemedical.myshopify.com |
| Live Site | whitepinemedical.ca |
| Theme | Broadcast 8.0.0 |
| Dev Theme ID | 182960718119 (Broadcast) - SAFE |
| Live Theme ID | 178766348583 (TS Media Design) - NEVER PUSH |
| GitHub Repo | medic8stat/shopifywebsite |
| Local Path | ~/shopify-themes/broadcast |
| Shopify CLI | 3.89.0 |

---

## Session Workflows

### Starting a Session

```bash
cd ~/shopify-themes/broadcast
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
git status
```

### Making Code Changes (Liquid, CSS, JS)

```bash
# 1. Make changes to .liquid, .css, .js files (NOT JSON!)

# 2. Push to Broadcast theme
shopify theme push -e broadcast

# 3. Verify at preview URL
# https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119

# 4. Commit and push
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

After user confirms:

```bash
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
git add -A && git commit -m "content: Update via Customizer"
git push
```

### Ending a Session

```bash
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
git add -A && git commit -m "session: End of session sync"
git push
```

---

## File Protection Configuration

### .shopifyignore

Prevents push from overwriting:
- `config/settings_data.json`
- `templates/index.json`, `templates/page.*.json`, `templates/product.json`
- `sections/group-header.json`, `sections/group-footer.json`

### shopify.theme.toml

Defines environments:
- `broadcast` - Development theme (182960718119) with ignore rules
- `production` - Live theme (178766348583) - NEVER USE

---

## Troubleshooting

### Changes Not Appearing After Push

1. **Clear browser cache**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Use incognito window**: Test in private browsing
3. **Check preview URL**: Use `?preview_theme_id=182960718119` not localhost
4. **Wait for CDN**: Changes can take up to 2 hours to propagate
5. **Verify push succeeded**: Check CLI output for errors

### Hero Image Changes Not Appearing

1. **Did you edit JSON locally?** DON'T. Use Shopify Customizer.
2. **Did you push after Customizer changes?** That overwrote them. Pull first.
3. **CDN caching**: Wait up to 2 hours or try incognito mode.

### Dev Server Shows Wrong Content

1. Stop dev server (Ctrl+C)
2. Pull latest: `shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com`
3. Restart dev server: `shopify theme dev --store whitepinemedical.myshopify.com`
4. Hard refresh browser: Cmd+Shift+R

### .shopifyignore Not Working

Known Shopify CLI bug. Use explicit ignore:

```bash
shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com \
  --ignore "config/settings_data.json" \
  --ignore "templates/*.json" \
  --ignore "sections/group-*.json"
```

---

## Quick Commands Reference

| Action | Command |
|--------|---------|
| Pull from Shopify | `shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com` |
| Push to Broadcast | `shopify theme push -e broadcast` |
| Start dev server | `shopify theme dev --store whitepinemedical.myshopify.com` |
| List themes | `shopify theme list --store whitepinemedical.myshopify.com` |
| Git commit | `git add -A && git commit -m "type(scope): description"` |
| Git push | `git push` |

---

## URLs Reference

| Purpose | URL |
|---------|-----|
| Preview (Broadcast) | https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119 |
| Live Site | https://www.whitepinemedical.ca |
| Shopify Admin | https://admin.shopify.com/store/whitepinemedical |
| Theme Editor | Shopify Admin → Online Store → Themes → Customize |

---

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| White Pine Navy | `#1E3A5F` | Primary - headers, buttons, dark backgrounds |
| White Pine Blue | `#2563EB` | Accent - links, secondary buttons, highlights |
| Banner Blue | `#0066CC` | Website banner |
| White | `#FFFFFF` | Backgrounds |
| Light Blue | `#f0f7ff` | Light background accents |

### Color Schemes

| Scheme | Background | Text | Usage |
|--------|------------|------|-------|
| scheme-1 | White | Navy | Default content |
| scheme-2 | Navy | White | Dark sections, headers |
| scheme-3 | Light Blue | Navy | Highlighted sections |
| scheme-4 | Blue | White | CTA sections |

---

## File Structure

```
broadcast/
├── .shopifyignore           # Protects JSON during push
├── shopify.theme.toml       # Environment config
├── assets/                  # CSS, JS, images
│   └── custom-whitepine.css # Custom styles
├── config/
│   ├── settings_data.json   # Theme settings (PROTECTED)
│   └── settings_schema.json # Settings definitions
├── layout/
│   └── theme.liquid         # Main layout
├── sections/                # Section components
├── snippets/                # Reusable code
├── templates/               # Page templates (PROTECTED)
└── Documentation...
```

---

## Documentation Files

| File | Purpose |
|------|---------|
| CLAUDE.md | This file - single source of truth |
| KNOWN_ISSUES.md | Bug tracking |
| CHANGELOG.md | Version history |
| PROJECT_STATUS.md | Component completion |

---

## User Shortcuts

| Command | Action |
|---------|--------|
| `JDI: [task]` | Just Do It - execute without explanation |
| `EF: [task]` | Explain First - outline plan, wait for approval |
| `Status check` | Report what's done, pending, blockers |
| `Session checkpoint` | Commit all, sync versions |
| `End of session` | Final commit, push, verify deployment |

---

## Root Cause Analysis (January 2026)

We discovered why hero banners and content changes were disappearing:

1. **Theme 2.0 Architecture**: Content stored in JSON files, not just settings_data.json
2. **One-Way Sync**: `shopify theme push` OVERWRITES remote with local
3. **Missing Protection**: No `.shopifyignore` or `shopify.theme.toml` existed

**Solution:** Created file protection configs and established clear CODE vs CONTENT workflow separation.

---

**Version:** 3.0.0
**Last Updated:** 2026-01-21
**Primary Contact:** Dr. James French
