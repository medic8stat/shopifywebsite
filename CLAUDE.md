# White Pine Medical - Shopify Broadcast Theme

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

> **NEVER push directly to the live theme (TS Media Design #178766348583)!**
>
> Always work with the **Broadcast theme (#182960718119)** for development and testing.

**Deployment Process:**
1. Make changes locally
2. Test with dev server
3. Push to GitHub
4. Push to Broadcast theme (NOT live theme)
5. When ready to go live: **Publish the Broadcast theme**

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
| Broadcast | 182960718119 | Development/Staging - PUSH HERE |
| TS Media Design | 178766348583 | Live - NEVER PUSH DIRECTLY |

## Important Notes
- Images are stored in Shopify CDN, referenced as `shopify://shop_images/filename.jpg`
- Section types must match files in `/sections/` directory
- Block types must match schema definitions in section files
- Color schemes are defined in `settings_data.json` under `color_schemes`

## Related Projects
- **EHR/Dashboard** (`/Users/jamesfrench/clinalytix-ehr-work`) - Uses same brand colors
  - Frontend: `apps/ehr-frontend/tailwind.config.js` contains the color definitions

## Content Source
Original content migrated from **TS Media Design** theme (Copy of TS Media Design, ID: 180310835495)
