# White Pine Medical - Shopify Theme Development Guide

> **For AI Assistants:** This is the single source of truth for Shopify website development. Follow these procedures EXACTLY.

---

## CRITICAL: Three Methods for Changes

| Change Type | Method | Tool | Example |
|-------------|--------|------|---------|
| **CODE** | Edit locally → push | Shopify CLI | Liquid, CSS, JS files |
| **SETTINGS** | Pull → edit JSON → push | shopify-content.mjs | Colors, fonts, global settings |
| **SECTION CONTENT** | Pull → edit JSON → push | shopify-content.mjs | Hero text, images, section order |

**No more Shopify Customizer needed.** Claude Code controls everything via scripts.

---

## CONCRETE EXAMPLE: Change Hero Text and Preview It

**Scenario:** You want to change the hero headline on the homepage from "Current Text" to "New Text".

### Step 1: Open Terminal and Navigate
```bash
cd ~/shopify-themes/broadcast
```

### Step 2: Pull the Current Template
```bash
node shopify-content.mjs pull templates/index.json
```

### Step 3: Open the File and Find the Text
```bash
# Open in VS Code (or your editor)
code templates/index.json
```

Search for the text you want to change. Hero text is usually in a section like:
```json
"section-slideshow-nested": {
  "settings": {
    "title": "Current Text Here"
  }
}
```

### Step 4: Edit the Text
Change the value to your new text:
```json
"title": "New Text Here"
```

Save the file.

### Step 5: Push the Change to Shopify
```bash
node shopify-content.mjs push templates/index.json
```

### Step 6: Preview in Browser
Open this URL in your browser:
```
https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
```

**If you don't see the change:**
1. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. Try incognito/private window
3. Wait 1-2 minutes for CDN

### Step 7: Commit Your Change
```bash
git add -A && git commit -m "content: Update hero headline"
git push
```

---

## CONCRETE EXAMPLE: Change a Color

**Scenario:** You want to change the accent color from blue to a different shade.

### Step 1: Pull Settings
```bash
cd ~/shopify-themes/broadcast
node shopify-content.mjs pull-settings
```

### Step 2: Open and Edit Settings
```bash
code config/settings_data.json
```

Search for color values (they look like `"#2563EB"`). Find the one you want to change.

### Step 3: Push and Preview
```bash
node shopify-content.mjs push-settings
```

Preview at: `https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119`

### Step 4: Commit
```bash
git add -A && git commit -m "style: Update accent color"
git push
```

---

## Method 1: CODE Changes (Liquid, CSS, JS)

```bash
cd ~/shopify-themes/broadcast

# 1. Make changes to .liquid, .css, .js files
# 2. Push to Shopify
shopify theme push -e broadcast

# 3. Verify at preview URL
# https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119

# 4. Commit
git add -A && git commit -m "type(scope): description"
git push
```

---

## Method 2: SETTINGS Changes (Colors, Fonts, Global Settings)

Uses `shopify-content.mjs` script - no API token needed, uses Shopify CLI auth.

```bash
cd ~/shopify-themes/broadcast

# 1. Pull current settings from Shopify
node shopify-content.mjs pull-settings

# 2. Edit config/settings_data.json locally
# Example: Change color value in the JSON

# 3. Push settings back to Shopify
node shopify-content.mjs push-settings

# 4. Verify at preview URL
# 5. Commit
git add -A && git commit -m "style: Update colors"
git push
```

---

## Method 3: SECTION CONTENT Changes (Hero Text, Images, Section Order)

```bash
cd ~/shopify-themes/broadcast

# 1. Pull the template file
node shopify-content.mjs pull templates/index.json

# 2. Edit templates/index.json locally
# Change text, image URLs, section order, etc.

# 3. Push back to Shopify
node shopify-content.mjs push templates/index.json

# 4. Verify and commit
git add -A && git commit -m "content: Update homepage hero"
git push
```

---

## Available Script Commands

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

## Why This Approach Works

**Problem Solved:** Previously, `shopify theme push` would overwrite Customizer changes because JSON files were included in push.

**Solution:**
1. `.shopifyignore` protects JSON during regular code pushes
2. `shopify-content.mjs` allows targeted pull/push of specific JSON files
3. No need for Shopify Customizer - everything controlled via CLI

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
git pull
node shopify-content.mjs pull-settings
git status
```

### Ending a Session

```bash
cd ~/shopify-themes/broadcast
git add -A && git commit -m "session: End of session sync"
git push
```

---

## Golden Rules

### 1. ALWAYS Pull Before Editing JSON

```bash
node shopify-content.mjs pull-settings
# or
node shopify-content.mjs pull templates/index.json
```

### 2. Use Environment-Based Push for Code

```bash
shopify theme push -e broadcast
```
JSON files are auto-ignored via `.shopifyignore`.

### 3. NEVER Push to Production Theme

```bash
# FORBIDDEN:
shopify theme push --theme 178766348583
shopify theme push -e production
```

### 4. Commit After Every Unit of Work

```bash
git add -A && git commit -m "type(scope): description"
git push
```

---

## File Protection Configuration

### .shopifyignore

Prevents code push from overwriting:
- `config/settings_data.json`
- `templates/*.json`
- `sections/group-header.json`, `sections/group-footer.json`

### shopify.theme.toml

Defines environments:
- `broadcast` - Development theme (182960718119) with ignore rules
- `production` - Live theme (178766348583) - NEVER USE

---

## Key Files

| File | Purpose | Edit Via |
|------|---------|----------|
| `config/settings_data.json` | Global colors, fonts, settings | `pull-settings` / `push-settings` |
| `templates/index.json` | Homepage sections and content | `pull` / `push` |
| `templates/page.*.json` | Page-specific sections | `pull` / `push` |
| `sections/group-header.json` | Header/navigation config | `pull` / `push` |
| `sections/group-footer.json` | Footer config | `pull` / `push` |
| `assets/custom-whitepine.css` | Custom CSS | Direct edit + code push |
| `sections/*.liquid` | Section templates | Direct edit + code push |

---

## Quick Commands Reference

| Action | Command |
|--------|---------|
| Pull settings | `node shopify-content.mjs pull-settings` |
| Push settings | `node shopify-content.mjs push-settings` |
| Pull any file | `node shopify-content.mjs pull <filename>` |
| Push any file | `node shopify-content.mjs push <filename>` |
| Push code | `shopify theme push -e broadcast` |
| List themes | `node shopify-content.mjs list-themes` |
| Git commit | `git add -A && git commit -m "type(scope): description"` |

---

## URLs Reference

| Purpose | URL |
|---------|-----|
| Preview (Broadcast) | https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119 |
| Live Site | https://www.whitepinemedical.ca |
| Shopify Admin | https://admin.shopify.com/store/whitepinemedical |

---

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| White Pine Navy | `#1E3A5F` | Primary - headers, buttons, dark backgrounds |
| White Pine Blue | `#2563EB` | Accent - links, secondary buttons, highlights |
| Banner Blue | `#0066CC` | Website banner |
| White | `#FFFFFF` | Backgrounds |
| Light Blue | `#f0f7ff` | Light background accents |

---

## Troubleshooting

### Changes Not Appearing After Push

1. Clear browser cache: Cmd+Shift+R
2. Use incognito window
3. Check preview URL: `?preview_theme_id=182960718119`
4. Wait for CDN (up to 2 hours)
5. Verify push succeeded in CLI output

### JSON Changes Not Appearing

1. Did you push the JSON file? Use `node shopify-content.mjs push <filename>`
2. Did you pull first? Always pull before editing
3. Check for JSON syntax errors

### Script Errors

1. Ensure you're authenticated: `shopify theme list --store whitepinemedical.myshopify.com`
2. If not authenticated: `shopify auth login --store whitepinemedical.myshopify.com`

---

## Documentation Files

| File | Purpose |
|------|---------|
| CLAUDE.md | This file - single source of truth |
| KNOWN_ISSUES.md | Bug tracking |
| CHANGELOG.md | Version history |
| JAMES_SESSION_QUICK_START.md | Quick reference for sessions |

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

## API Token Note (Historical)

**Not needed.** We attempted to set up a Shopify Admin API custom app token but discovered:
1. The Shopify Partners Dashboard (partners.shopify.com) shows Client ID/Secret, not Admin API tokens
2. The Shopify CLI stores auth in macOS Keychain, not extractable
3. Solution: `shopify-content.mjs` wraps Shopify CLI commands, using its existing auth

The `shopify-admin-api.mjs` script exists but requires a token. Use `shopify-content.mjs` instead.

---

**Version:** 5.0.0
**Last Updated:** 2026-01-21
**Primary Contact:** Dr. James French
