# Shopify Development Workflow - Gold Standard

> **For AI Assistants & Developers:** This is the definitive guide for working with the White Pine Medical Shopify theme. Follow these procedures EXACTLY to avoid losing customizer settings, images, and content.

---

## The Root Cause of Our Issues

### Why Changes Were Being Lost

1. **Theme 2.0 Architecture**: Settings are stored in MULTIPLE files:
   - `config/settings_data.json` - Global theme settings
   - `templates/*.json` - Page-specific section configurations (INCLUDING HERO IMAGES)
   - `sections/group-*.json` - Header/footer configurations

2. **One-Way Sync**: `shopify theme push` OVERWRITES remote files with local versions
   - Local code changes push TO Shopify
   - Customizer changes (images, text) do NOT sync back to local
   - Result: Pushing destroys any images/content added via Customizer

3. **Missing Protection**: We had no `.shopifyignore` or `shopify.theme.toml` to protect JSON files

---

## Two Types of Changes (CRITICAL TO UNDERSTAND)

### Type A: CODE CHANGES (Claude Code handles these)
- Liquid templates (`.liquid` files)
- CSS/SCSS files in `/assets`
- JavaScript files in `/assets`
- New section schemas (the `{% schema %}` blocks)
- Snippets

**Workflow:** Edit locally → Push to Shopify → Changes appear immediately

### Type B: CONTENT/IMAGE CHANGES (Shopify Customizer handles these)
- Hero banner images
- Section text content
- Logo and favicon
- Color scheme selections
- Font selections
- Block arrangements within sections

**Workflow:** Make changes in Shopify Admin → Theme Customizer → Save

---

## The Golden Rules

### Rule 1: NEVER Edit JSON Files Locally for Content Changes
```
BAD:  Edit templates/index.json to change hero image URL
GOOD: Use Shopify Admin → Themes → Customize to change hero image
```

### Rule 2: ALWAYS Pull Before Starting Work
```bash
cd ~/shopify-themes/broadcast
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
```
This syncs any Customizer changes to your local files.

### Rule 3: Use Environment-Specific Push Commands
```bash
# SAFE: Push to Broadcast (development) theme
shopify theme push -e broadcast

# The .shopifyignore and shopify.theme.toml protect JSON files automatically
```

### Rule 4: NEVER Push to Production Theme
```
FORBIDDEN: shopify theme push --theme 178766348583
FORBIDDEN: shopify theme push -e production
```

### Rule 5: Verify Changes at Preview URL (Not Localhost)
```
Preview URL: https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
```
The dev server (localhost:9292) may show stale content due to CDN caching.

---

## Complete Development Workflow

### Starting a New Session

```bash
# 1. Navigate to theme directory
cd ~/shopify-themes/broadcast

# 2. ALWAYS pull latest from Shopify first
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

# 3. Check git status
git status

# 4. Start dev server (optional - for hot reloading)
shopify theme dev --store whitepinemedical.myshopify.com
```

### Making Code Changes (Liquid, CSS, JS)

```bash
# 1. Make your code changes to .liquid, .css, .js files

# 2. Test locally with dev server
# Preview at: http://127.0.0.1:9292

# 3. Push to Broadcast theme (JSON files are automatically ignored)
shopify theme push -e broadcast

# 4. Verify at preview URL
# https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119

# 5. Commit to git
git add -A && git commit -m "type(scope): description"
git push
```

### Making Content/Image Changes (Hero Banners, Text, etc.)

```bash
# 1. DO NOT edit JSON files locally!

# 2. Go to Shopify Admin
# https://admin.shopify.com/store/whitepinemedical/themes

# 3. Click "Customize" on Broadcast theme (NOT the live theme)

# 4. Make your changes in the visual editor
# - Upload images
# - Edit text
# - Rearrange blocks

# 5. Click "Save" in Customizer

# 6. Pull changes to local for git backup
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

# 7. Commit the pulled JSON changes
git add -A && git commit -m "content: Update via Customizer"
git push
```

### Ending a Session

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Pull latest from Shopify (capture any Customizer changes)
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com

# 3. Commit all changes
git add -A && git commit -m "session: End of session sync"
git push

# 4. Verify at preview URL
# https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
```

---

## File Protection Configuration

### .shopifyignore (Created)
Located at: `/Users/jamesfrench/shopify-themes/broadcast/.shopifyignore`

This file prevents `shopify theme push` from overwriting these files:
- `config/settings_data.json`
- `templates/*.json` (all template JSON files)
- `sections/group-header.json`
- `sections/group-footer.json`

### shopify.theme.toml (Created)
Located at: `/Users/jamesfrench/shopify-themes/broadcast/shopify.theme.toml`

This file defines environments:
- `broadcast` - Development theme (182960718119) - SAFE
- `production` - Live theme (178766348583) - NEVER USE

---

## Troubleshooting

### Changes Not Appearing After Push

1. **Clear browser cache**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Use incognito window**: Test in private browsing
3. **Check preview URL**: Use `?preview_theme_id=182960718119` not localhost
4. **Wait for CDN**: Changes can take up to 2 hours to propagate globally
5. **Verify push succeeded**: Check CLI output for errors

### Hero Image Changes Not Appearing

1. **Did you edit JSON locally?** DON'T. Use Shopify Customizer instead.
2. **Did you push after Customizer changes?** That overwrote them. Pull first, then push.
3. **CDN caching**: Add `?v=2` to image URL or wait for propagation

### settings_data.json Conflicts

1. **ALWAYS pull before push**
2. **Never edit settings_data.json locally** for content changes
3. **If you must edit schema-related settings**, pull first, edit, push with caution

### Dev Server Shows Wrong Content

1. **Stop dev server** (Ctrl+C)
2. **Pull latest**: `shopify theme pull --theme 182960718119`
3. **Restart dev server**: `shopify theme dev`
4. **Hard refresh browser**: Cmd+Shift+R

---

## Quick Reference Commands

| Action | Command |
|--------|---------|
| Pull from Shopify | `shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com` |
| Push to Broadcast | `shopify theme push -e broadcast` |
| Start dev server | `shopify theme dev --store whitepinemedical.myshopify.com` |
| List themes | `shopify theme list --store whitepinemedical.myshopify.com` |
| Check CLI version | `shopify version` |
| Git commit | `git add -A && git commit -m "type(scope): description"` |
| Git push | `git push` |

---

## Theme IDs Reference

| Theme | ID | Role | Safe to Push? |
|-------|-----|------|---------------|
| **Broadcast** | 182960718119 | Development/Staging | YES |
| **TS Media Design** | 178766348583 | Live Production | NEVER |

---

## URLs Reference

| Purpose | URL |
|---------|-----|
| Preview (Broadcast) | https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119 |
| Live Site | https://www.whitepinemedical.ca |
| Shopify Admin | https://admin.shopify.com/store/whitepinemedical |
| Theme Editor | Shopify Admin → Online Store → Themes → Customize |

---

## What Claude Code Should Do

### For Code Changes (Liquid, CSS, JS):
1. Pull from Shopify first
2. Make code changes
3. Push to Broadcast theme
4. Commit to git

### For Content/Image Changes:
1. **DO NOT edit JSON files**
2. Tell the user: "This change requires Shopify Customizer. Please go to [Admin URL] and make the change there."
3. After user confirms change, pull from Shopify and commit

### For New Sections/Templates:
1. Create new `.liquid` or `.json` files locally
2. Push to Shopify
3. User configures content via Customizer
4. Pull and commit

---

**Version:** 1.0.0
**Created:** 2026-01-21
**Based on:** Comprehensive research of Shopify CLI issues, GitHub issues, and best practices
