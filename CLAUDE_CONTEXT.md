# CLAUDE_CONTEXT.md - Shopify Website Development Context

> **For AI Assistants:** This is your comprehensive context file. Read this first for any Shopify website work.

---

## 1. Project Overview

**White Pine Medical** - Public-facing Shopify website for a health and longevity company.

| Property | Value |
|----------|-------|
| **Store URL** | whitepinemedical.myshopify.com |
| **Live Site** | whitepinemedical.ca |
| **Theme** | Broadcast 8.0.0 |
| **Dev Theme ID** | 182960718119 (Broadcast) |
| **Live Theme ID** | 178766348583 (TS Media Design) - NEVER PUSH DIRECTLY |
| **GitHub Repo** | medic8stat/shopifywebsite |
| **Local Path** | ~/shopify-themes/broadcast |

---

## 2. Critical Development Rules

### NEVER PUSH TO LIVE THEME

```
⚠️ CRITICAL: NEVER push directly to the live theme (TS Media Design #178766348583)!

Always work with the Broadcast theme (#182960718119) for development.
```

### Deployment Process

1. Make changes locally
2. Test with dev server: `shopify theme dev`
3. Push to GitHub: `git push`
4. Push to Broadcast theme (staging): `shopify theme push --theme 182960718119`
5. When ready to go live: Publish Broadcast theme

### Commit After Every Unit of Work

```bash
git add -A && git commit -m "type(scope): Description"
git push
```

---

## 3. Credentials & Access

### Shopify Store Access

| Property | Value |
|----------|-------|
| **Store** | whitepinemedical.myshopify.com |
| **Admin URL** | https://admin.shopify.com/store/whitepinemedical |
| **Theme Editor** | Shopify Admin → Online Store → Themes |
| **Pages** | Shopify Admin → Online Store → Pages |
| **Menus** | Shopify Admin → Content → Menus |

> **TODO:** Add Shopify admin credentials when provided

### GitHub Repository

| Property | Value |
|----------|-------|
| **Repo** | medic8stat/shopifywebsite |
| **Branch** | main |
| **Clone URL** | https://github.com/medic8stat/shopifywebsite.git |

### Shopify CLI Authentication

```bash
# Login to Shopify (if needed)
shopify auth login --store whitepinemedical.myshopify.com

# Verify connection
shopify theme list --store whitepinemedical.myshopify.com
```

---

## 4. Theme IDs Reference

| Theme | ID | Role | Safe to Push? |
|-------|-----|------|---------------|
| **Broadcast** | 182960718119 | Development/Staging | ✅ YES |
| **TS Media Design** | 178766348583 | Live Production | ❌ NEVER |

---

## 5. Brand Assets

### Brand Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| White Pine Navy | `#1E3A5F` | `--color-navy` | Primary - headers, buttons, dark backgrounds |
| White Pine Blue | `#2563EB` | `--color-blue` | Accent - links, secondary buttons, highlights |
| Banner Blue | `#0066CC` | `--color-banner` | Website banner (planned) |
| White | `#FFFFFF` | `--color-white` | Backgrounds |
| Light Blue | `#f0f7ff` | `--color-light-blue` | Light background accents |

### Color Schemes (in settings_data.json)

| Scheme | Background | Text | Usage |
|--------|------------|------|-------|
| scheme-1 | White | Navy | Default content |
| scheme-2 | Navy | White | Dark sections, headers |
| scheme-3 | Light Blue | Navy | Highlighted sections |
| scheme-4 | Blue | White | CTA sections |

### Logo Locations

| Asset | Location | Notes |
|-------|----------|-------|
| Main Logo | Shopify CDN | Set in theme settings |
| Favicon | Shopify CDN | Set in theme settings |

> **TODO:** Add specific logo file paths when provided

---

## 6. Quick Commands

### Development Server (Local Preview)

```bash
cd ~/shopify-themes/broadcast
shopify theme dev --store whitepinemedical.myshopify.com
# Preview at http://127.0.0.1:9292
```

### Push to Staging (Broadcast Theme)

```bash
cd ~/shopify-themes/broadcast
shopify theme push --theme 182960718119 --store whitepinemedical.myshopify.com
```

### Publish to Production

```bash
# Only when changes are tested and approved!
shopify theme publish --theme 182960718119 --store whitepinemedical.myshopify.com
```

### Git Workflow

```bash
cd ~/shopify-themes/broadcast
git add -A
git commit -m "type(scope): Description of changes"
git push
```

### Theme List (Verify Theme IDs)

```bash
shopify theme list --store whitepinemedical.myshopify.com
```

---

## 7. File Structure

```
broadcast/
├── assets/                  # CSS, JS, images
│   └── custom-whitepine.css # Custom White Pine styles
├── config/
│   └── settings_data.json   # Theme settings, colors, typography
├── layout/
│   └── theme.liquid         # Main layout wrapper
├── sections/                # Reusable section components
│   ├── group-header.json    # Header configuration
│   └── ...
├── snippets/                # Reusable code snippets
├── templates/               # Page templates
│   ├── index.json           # Homepage
│   ├── page.privacy-trust.json  # Privacy & Trust page
│   ├── page.urgent-care.json    # Urgent Care page
│   └── product.json         # Product page
├── CLAUDE.md                # Quick reference (entry point)
├── CLAUDE_CONTEXT.md        # This file - full context
├── CHANGELOG.md             # Version history
├── KNOWN_ISSUES.md          # Bug tracking
└── PROJECT_STATUS.md        # Current status
```

---

## 8. Key Pages & Templates

### Homepage (index.json)

Sections in order:
1. Hero Slideshow - "Live Better Longer" banner
2. Marquee Announcement - Scrolling taglines
3. Problem Statement - "The Problem Most People Face"
4. Feature Icons - Built by Physicians, Technology-Driven Insight, Personalized Support
5. Our Solution - Image + text with product link
6. 5-Phase Assessment - All 5 phases with images
7. Turn Insights Into Action - Coaching section
8. Corporate Wellness - Team health optimization
9. Testimonials - Client reviews
10. FAQ - Frequently asked questions

### Privacy & Trust Page (page.privacy-trust.json)

- Template: `page.privacy-trust`
- Status: Created, needs Shopify page setup
- Sections: Privacy icons, data protection approach, FAQ accordion, contact info

### Urgent Care Page (page.urgent-care.json)

- Template: `page.urgent-care`
- Status: "Coming Soon" page created, needs Shopify page setup

### Product Page (product.json)

- Main product: White Pine Medical Longevity Assessment
- Link: `shopify://products/white-pine-medical-longevity-assessment`

---

## 9. Content Guidelines

### Language Rules

| ❌ Don't Use | ✅ Use Instead |
|-------------|----------------|
| AI / Artificial Intelligence | Next-generation electronic health system |
| AI-powered | Comprehensive / Technology-driven |
| Shop Now | View Services |
| Elite / Visionary / Unmatched | Physician-led / Evidence-based |
| 6 months coaching | Up to 12 months coaching |

### Tone

- Professional but approachable
- Physician-led, evidence-based
- No hype or marketing clichés
- Focus on patient outcomes, not technology buzzwords

---

## 10. Integration Points

### Related Systems

| System | URL | Purpose |
|--------|-----|---------|
| Patient Portal | portal.whitepinemedical.ca | Patient login |
| Clinician EHR | app.whitepinemedical.ca | Staff dashboard |
| Main Website | whitepinemedical.ca | This Shopify site |

### Contact Information

| Type | Address |
|------|---------|
| General | info@whitepinemedical.ca |
| Bookings | bookings@whitepinemedical.ca |
| Privacy | privacy@whitepinemedical.ca |

---

## 11. Sources of Truth

| Topic | File | Notes |
|-------|------|-------|
| Quick reference | CLAUDE.md | Entry point, overview |
| Full context | CLAUDE_CONTEXT.md | This file |
| Version history | CHANGELOG.md | All changes documented |
| Bug tracking | KNOWN_ISSUES.md | Active issues |
| Project status | PROJECT_STATUS.md | Component completion |
| Theme settings | config/settings_data.json | Colors, typography |
| Header config | sections/group-header.json | Navigation, buttons |
| Homepage | templates/index.json | All homepage sections |

---

## 12. Session Workflow

### Session Start

```
Read these files from shopify-themes/broadcast:
1. CLAUDE.md (quick overview)
2. CLAUDE_CONTEXT.md (this file - credentials, commands)
3. CHANGELOG.md (recent changes)
4. KNOWN_ISSUES.md (active bugs)

CRITICAL RULES:
- NEVER push to live theme (TS Media Design #178766348583)
- ALWAYS push to Broadcast theme (#182960718119)
- COMMIT after every unit of work
- Test locally before pushing to Shopify
```

### Session End

```
END OF SESSION - Verify:
1. All changes committed? → git status
2. Pushed to GitHub? → git push
3. Pushed to Broadcast theme? → shopify theme push --theme 182960718119
4. CHANGELOG.md updated?
5. KNOWN_ISSUES.md updated (if bug fixed)?
```

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

**Version:** 1.0.0
**Last Updated:** 2026-01-21
**Primary Contact:** Dr. James French
