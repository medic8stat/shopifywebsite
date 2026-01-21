# White Pine Medical - Shopify Broadcast Theme

> **For AI Assistants:** This is your entry point. For detailed context, credentials, and commands, see [CLAUDE_CONTEXT.md](CLAUDE_CONTEXT.md).

## Project Overview
This is the Shopify storefront for **White Pine Medical**, a health and longevity company offering comprehensive health assessments and personalized wellness coaching powered by our next-generation electronic health system.

## Store Details
- **Store URL**: whitepinemedical.myshopify.com
- **Theme**: Broadcast 8.0.0
- **Theme ID**: 182960718119
- **GitHub Repo**: https://github.com/medic8stat/shopifywebsite

## Brand Colors
| Color | Hex | Usage |
|-------|-----|-------|
| White Pine Navy | `#1E3A5F` | Primary - headers, buttons, dark backgrounds |
| White Pine Blue | `#2563EB` | Accent - links, secondary buttons, highlights |
| White | `#FFFFFF` | Backgrounds |
| Light Blue | `#f0f7ff` | Light background accents |

## Color Schemes
- **scheme-1**: White background, navy text (default)
- **scheme-2**: Navy background, white text
- **scheme-3**: Light blue background, navy text
- **scheme-4**: Blue background, white text

## Key Files
- `config/settings_data.json` - Theme settings, colors, typography
- `templates/index.json` - Homepage sections and content
- `sections/group-header.json` - Header and announcement bar

## Homepage Sections (in order)
1. **Hero Slideshow** - "Live Better Longer" main banner
2. **Marquee Announcement** - Scrolling taglines
3. **Problem Statement** - "The Problem Most People Face"
4. **Feature Icons** - Built by Physicians, Technology-Driven Insight, Personalized Support
5. **Our Solution** - Image + text with product link
6. **5-Phase Assessment** - All 5 phases with images
7. **Turn Insights Into Action** - Coaching section
8. **Corporate Wellness** - Team health optimization
9. **Testimonials** - Client reviews
10. **FAQ** - Frequently asked questions

## Main Product
- **White Pine Medical Longevity Assessment** - The primary product/service
- Product link: `shopify://products/white-pine-medical-longevity-assessment`

## Development Workflow

### CRITICAL RULES - READ FIRST

> **🚨 ABSOLUTE RULE: NEVER PUSH TO THE LIVE THEME 🚨**
>
> **Live Theme ID: 182960161063** - DO NOT PUSH TO THIS THEME UNDER ANY CIRCUMSTANCES
>
> Always work with the **Broadcast theme (#182960718119)** for development and testing.
>
> If you push to the live theme, you WILL break the production website.

**Deployment Process:**
1. Make changes locally
2. Test with dev server
3. Push to GitHub
4. Push to Broadcast theme ONLY (ID: 182960718119)
5. When ready to go live: User will manually publish via Shopify Admin

### Start Dev Server
```bash
cd ~/shopify-themes/broadcast
shopify theme dev --store whitepinemedical.myshopify.com
```
This provides:
- Local preview: http://127.0.0.1:9292
- Auto-sync on file changes

### Push to Broadcast Theme (Development/Staging)
```bash
# ALWAYS use the Broadcast theme ID - NEVER the live theme
shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com
```

### Publish Broadcast Theme (Make it Live)
```bash
# Only when ready to deploy to production
shopify theme publish --theme 182960718119 --store whitepinemedical.myshopify.com
```

### Git Workflow
```bash
cd ~/shopify-themes/broadcast
git add .
git commit -m "Description of changes"
git push
```

### Theme IDs Reference

| Theme | ID | Role |
|-------|-----|------|
| **LIVE - NEVER TOUCH** | 182960161063 | PRODUCTION - NEVER PUSH TO THIS |
| Broadcast | 182960718119 | Development/Staging - PUSH HERE ONLY |

### Preview URLs

- **Broadcast (dev) preview:** <https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119>
- **Live site:** <https://www.whitepinemedical.ca>

### Verification After Deploy

After pushing to Broadcast, always verify changes at the preview URL:

```text
https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
```

The live site (whitepinemedical.ca) will NOT show changes until you publish the Broadcast theme.

## Important Notes
- Images are stored in Shopify CDN, referenced as `shopify://shop_images/filename.jpg`
- Section types must match files in `/sections/` directory
- Block types must match schema definitions in section files
- Color schemes are defined in `settings_data.json` under `color_schemes`

## Image Management

**Images added via Shopify Theme Editor persist across code pushes.** They're stored on Shopify's CDN and referenced by URL in `settings_data.json`.

**Best Practice:** Before making local edits to `settings_data.json`, pull the latest from Shopify to preserve any images added via the editor:

```bash
shopify theme pull --theme 182960718119 --store whitepinemedical.myshopify.com
```

This ensures you don't accidentally overwrite image references when pushing code changes.

## Documentation Files

| File | Purpose |
|------|---------|
| [CLAUDE.md](CLAUDE.md) | Quick reference (this file) |
| [CLAUDE_CONTEXT.md](CLAUDE_CONTEXT.md) | Full context, credentials, commands |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Component completion status |
| [KNOWN_ISSUES.md](KNOWN_ISSUES.md) | Bug tracking and issues |
| [JAMES_SESSION_QUICK_START.md](JAMES_SESSION_QUICK_START.md) | Session prompts for Claude |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

## Related Projects

- **EHR/Dashboard** (`/Users/jamesfrench/clinalytix-ehr-work`) - Uses same brand colors
  - Frontend: `apps/ehr-frontend/tailwind.config.js` contains the color definitions

## Content Source

Original content migrated from **TS Media Design** theme (Copy of TS Media Design, ID: 180310835495)
