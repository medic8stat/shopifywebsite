# White Pine Medical - Shopify Broadcast Theme

> **For AI Assistants:** This is your entry point. Read the CRITICAL WORKFLOW RULES below before making ANY changes.

---

## CRITICAL WORKFLOW RULES - READ FIRST

### The Two Types of Changes

| Type | Examples | How to Make | Who Does It |
|------|----------|-------------|-------------|
| **CODE** | Liquid, CSS, JS, section schemas | Edit locally → Push | Claude Code |
| **CONTENT** | Images, text, colors, fonts | Shopify Customizer | User (via Admin) |

### Why This Matters

**Theme 2.0 stores content in JSON files.** When you `push`, local JSON overwrites remote JSON. This DESTROYS:
- Hero banner images
- Section text content
- Any changes made via Customizer

### The Golden Rules

1. **ALWAYS pull before starting work**
   ```bash
   cd ~/shopify-themes/broadcast
   shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
   ```

2. **NEVER edit JSON files for content changes**
   - DON'T edit `templates/*.json` to change images/text
   - DO use Shopify Admin → Themes → Customize

3. **Use environment-based push (JSON files auto-ignored)**
   ```bash
   shopify theme push -e broadcast
   ```

4. **NEVER push to production theme**
   - Live Theme ID: 178766348583 - FORBIDDEN
   - Broadcast Theme ID: 182960718119 - SAFE

5. **Verify at preview URL, not localhost**
   ```
   https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
   ```

---

## Project Overview

**White Pine Medical** - Shopify storefront for a health and longevity company.

| Property | Value |
|----------|-------|
| Store URL | whitepinemedical.myshopify.com |
| Theme | Broadcast 8.0.0 |
| Dev Theme ID | 182960718119 |
| Live Theme ID | 178766348583 (NEVER PUSH) |
| GitHub Repo | medic8stat/shopifywebsite |
| Local Path | ~/shopify-themes/broadcast |

---

## Quick Commands

### Session Start (ALWAYS DO THIS FIRST)
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

---

## For Content/Image Changes

**Claude Code should NOT edit JSON files for content changes.**

Instead, tell the user:
> "This change requires Shopify Customizer. Please go to:
> https://admin.shopify.com/store/whitepinemedical/themes
> Click 'Customize' on Broadcast theme, make your changes, and save."

After user confirms, pull and commit:
```bash
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
git add -A && git commit -m "content: Update via Customizer"
git push
```

---

## File Protection (Configured)

### .shopifyignore
Prevents push from overwriting:
- `config/settings_data.json`
- `templates/*.json`
- `sections/group-header.json`
- `sections/group-footer.json`

### shopify.theme.toml
Defines safe environments:
- `broadcast` - Development (SAFE)
- `production` - Live (NEVER USE)

---

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| White Pine Navy | `#1E3A5F` | Primary - headers, buttons |
| White Pine Blue | `#2563EB` | Accent - links, highlights |
| White | `#FFFFFF` | Backgrounds |
| Light Blue | `#f0f7ff` | Light background accents |

---

## Documentation Files

| File | Purpose |
|------|---------|
| [CLAUDE.md](CLAUDE.md) | Quick reference (this file) |
| [SHOPIFY_DEVELOPMENT_WORKFLOW.md](SHOPIFY_DEVELOPMENT_WORKFLOW.md) | **Complete workflow guide** |
| [CLAUDE_CONTEXT.md](CLAUDE_CONTEXT.md) | Full context, credentials |
| [KNOWN_ISSUES.md](KNOWN_ISSUES.md) | Bug tracking |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

---

## Theme IDs Reference

| Theme | ID | Role | Safe? |
|-------|-----|------|-------|
| Broadcast | 182960718119 | Development | YES |
| TS Media Design | 178766348583 | Live | NEVER |

---

## URLs

| Purpose | URL |
|---------|-----|
| Preview | https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119 |
| Live | https://www.whitepinemedical.ca |
| Admin | https://admin.shopify.com/store/whitepinemedical |

---

**Version:** 2.0.0
**Last Updated:** 2026-01-21
