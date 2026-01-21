# White Pine Medical - Shopify Broadcast Theme

## Project Overview
This is the Shopify storefront for **White Pine Medical**, a health and longevity company offering AI-powered health assessments and personalized wellness coaching.

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
4. **Feature Icons** - Built by Physicians, AI-Driven Insight, Personalized Support
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

### Start Dev Server
```bash
cd ~/shopify-themes/broadcast
shopify theme dev --store whitepinemedical.myshopify.com
```
This provides:
- Local preview: http://127.0.0.1:9292
- Auto-sync on file changes

### Push to Shopify (without dev server)
```bash
shopify theme push --store whitepinemedical.myshopify.com
```

### Git Workflow
```bash
cd ~/shopify-themes/broadcast
git add .
git commit -m "Description of changes"
git push
```

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
