# Changelog

All notable changes to the White Pine Medical Shopify website will be documented in this file.

---

## [2026-01-21] - Website Restructure & Theme Publishing (v6.0.0)

### Added

- **`templates/page.services.json`** (NEW) - Comprehensive Services page with 17 sections:
  - Hero with "Our Services" title
  - 3-step "How Care Works" process (Assess, Prioritize, Act)
  - Concierge Assessment primary entry point
  - 10 individual assessment categories with accordion groups:
    - Cardiopulmonary & Cardiovascular (VO2 Max, ECG, etc.)
    - Body Composition & Metabolic (BMR, Body Comp, etc.)
    - Neurological, Cognitive & Sensory (VR Vision, Balance, etc.)
    - Strength, Power & Functional (Grip, FMS, Gait, etc.)
    - Vascular & Autonomic (BP, HRV, ABPI)
    - Respiratory (Spirometry & Lung Age)
    - Digital & Algorithmic (Longevity Snapshots, Cognitive)
    - Mental Health & Psychiatric
    - Genetic Testing (Nutrigenetics, Cancer, Longevity)
    - Ultrasound-Based (Limited Screening)
  - Bundled Assessments teaser
  - Referral Partners section
  - "Not Sure?" CTA

### Changed

- **`templates/index.json`** - Complete homepage restructure (11 → 8 sections):
  - Hero: Updated to "Physician-Led Health Assessment" messaging
  - NEW: "What We Do" section (Medical Oversight, Evidence-Based, Integrated Care)
  - SIMPLIFIED: "How Care Works" from 5 phases to 3 steps (Assess, Prioritize, Act)
  - UPDATED: "Why White Pine Is Different" with clinical differentiators
  - NEW: "Services Preview" with 6 domain cards
  - SIMPLIFIED: "About Physician" - concise Dr. James French bio
  - REWORKED: "Trust & Safety" FAQ focused on risk management
  - NEW: "Ready to Begin?" CTA with 3 clear pathways

- **Broadcast theme published** - Now live at whitepinemedical.myshopify.com
  - Templates now available in Shopify Admin page dropdown
  - Previous live theme: TS Media Design (#178766348583)
  - New live theme: Broadcast (#182960718119)

### Removed

- **Homepage sections removed:**
  - Announcement marquee
  - "The Problem Most People Face" rich text
  - "Our Solution" double section
  - Coaching upsell
  - Corporate wellness
  - Reviews/testimonials

- **`.shopifyignore`** (DELETED) - Was blocking template pushes
- **`shopify.theme.toml` ignore rules** (REMOVED) - Claude Code now manages all files

### Fixed

- **Template push failures** - Removed ignore rules that were blocking JSON template deployment
- **Workflow simplified** - Single source of truth is now Claude Code, not Shopify Customizer

---

## [2026-01-21] - CLI-Based Content Management (v5.0.0)

### Added

- **`shopify-content.mjs`** (NEW) - CLI wrapper script for content management:
  - `node shopify-content.mjs list-themes` - List all themes
  - `node shopify-content.mjs pull-settings` - Pull settings_data.json
  - `node shopify-content.mjs push-settings` - Push settings_data.json
  - `node shopify-content.mjs pull <file>` - Pull any theme file
  - `node shopify-content.mjs push <file>` - Push any theme file
  - Uses Shopify CLI authentication (no separate token needed)

- **`shopify-admin-api.mjs`** (NEW) - GraphQL Admin API script (requires token, not currently usable)
  - Created for future use if Admin API token becomes available
  - Supports pages, navigation, theme files via GraphQL

- **`.env.example`** (NEW) - Template for API credentials (for future use)

- **`.gitignore`** (NEW) - Protects .env from being committed

- **`pages/`** (NEW) - Directory for HTML page content files

### Changed

- **`CLAUDE.md`** - Complete rewrite (v5.0.0):
  - Three methods for changes: CODE, SETTINGS, SECTION CONTENT
  - Detailed workflows for each method
  - All changes now Claude-controlled via scripts
  - No more Shopify Customizer needed
  - Added API token historical note explaining why CLI approach was chosen

### Fixed

- **Admin API Token Issue** - Resolved by using Shopify CLI wrapper instead:
  - Partners Dashboard only shows Client ID/Secret, not Admin API tokens
  - Shopify CLI stores auth in macOS Keychain (not extractable)
  - Solution: `shopify-content.mjs` wraps CLI commands

### Technical Details

**Three methods for making changes:**

| Change Type | Method | Tool |
|-------------|--------|------|
| CODE (Liquid, CSS, JS) | Edit locally → push | `shopify theme push -e broadcast` |
| SETTINGS (colors, fonts) | Pull → edit → push | `node shopify-content.mjs pull-settings/push-settings` |
| SECTION CONTENT (hero, text) | Pull → edit → push | `node shopify-content.mjs pull/push <file>` |

---

## [2026-01-21] - Gold Standard Development Workflow

### Added

- **`.shopifyignore`** (NEW) - Protects JSON files from being overwritten during push:
  - `config/settings_data.json`
  - `templates/index.json`, `templates/page.about.json`, `templates/page.contact.json`
  - `templates/page.privacy-trust.json`, `templates/page.urgent-care.json`, `templates/product.json`
  - `sections/group-header.json`, `sections/group-footer.json`

- **`shopify.theme.toml`** (NEW) - Environment-based configuration:
  - `broadcast` environment (182960718119) - Development/staging with ignore rules
  - `production` environment (178766348583) - Defined but marked NEVER USE

- **`SHOPIFY_DEVELOPMENT_WORKFLOW.md`** (NEW) - Complete gold-standard workflow guide:
  - Root cause analysis of why changes were being lost
  - Two types of changes: CODE vs CONTENT
  - Golden rules for safe development
  - Complete session workflows (start, code changes, content changes, end)
  - Troubleshooting guide

### Changed

- **`CLAUDE.md`** - Complete rewrite (v2.0.0):
  - Added critical workflow rules at top
  - Clear separation of CODE vs CONTENT changes
  - Golden rules with specific commands
  - Instructions for Claude Code to NOT edit JSON for content changes
  - File protection configuration documentation

- **`CLAUDE_CONTEXT.md`** - Complete rewrite (v2.0.0):
  - Root cause analysis section explaining why changes were lost
  - Detailed workflow for both code and content changes
  - Troubleshooting section
  - Quick commands reference

### Fixed

- **CRITICAL: Hero images and content changes being lost** - Root cause identified and resolved:
  - Theme 2.0 stores content in JSON files
  - `shopify theme push` was overwriting remote JSON with stale local JSON
  - Solution: `.shopifyignore` protects JSON files, clear workflow separation

### Technical Details

The issue was caused by Shopify Theme 2.0 architecture:
1. Content (images, text) is stored in `templates/*.json` and `config/settings_data.json`
2. `shopify theme push` performs one-way sync: local → remote (overwrites)
3. Without protection, local (stale) JSON overwrites remote (fresh) JSON
4. Result: Customizer changes (hero images, text) are destroyed

**New safe workflow:**
- CODE changes: Edit locally → `shopify theme push -e broadcast` (JSON ignored)
- CONTENT changes: User edits in Shopify Customizer → Claude pulls and commits

---

## [Unreleased]

### Added

- **Privacy & Trust Page** (`page.privacy-trust.json`) - New page explaining data protection, compliance (HIPAA, PHIPA, PIPEDA), and patient rights
- **Urgent Care Page** (`page.urgent-care.json`) - Coming Soon page for walk-in urgent care services with Medicare coverage info
- **CLAUDE.md Development Rules** - Added critical workflow rules: NEVER push to live theme, always use Broadcast theme for development
- **Image Management Documentation** - Added guidance on how images added via Theme Editor persist across code pushes, and best practice to pull settings before local edits
- **Consistent Hero Banners** - Added white pine forest hero image banner to all pages for brand consistency:
  - Contact page: "Contact Us" hero with pine forest background
  - About page: "About White Pine Medical" hero with pine forest background
  - Urgent Care page: Updated existing hero with pine forest background
  - Privacy & Trust page: "Privacy & Trust" hero with pine forest background
  - Product/Services page: "Our Services" hero with pine forest background

### Fixed

- **About Page Content** - Complete rewrite replacing demo placeholder content with actual White Pine Medical content:
  - Added "Science-Driven Health Solutions" intro section
  - Added "Our Core Principles" with three key values (Measure What Matters, Know Yourself, Progress That Lasts)
  - Added "Our Philosophy" section with bullet points about empowerment and guidance
  - Added "Beyond Traditional Healthcare" section covering Ongoing Care, Advanced Technology, Privacy & Security
  - Added location-specific FAQ (Why fitness centre?, Appointments, Accommodation)
  - Added "Visit Us" footer with address and contact link

### Changed
- **Privacy & Trust Page Content** - Complete rewrite with value-focused messaging:
  - "How We Protect Your Information" → "Privacy That Puts You First"
  - "Multi-Standard Compliance" → "Built for Trust" (physician-first approach)
  - "Military-Grade Encryption" → "Your Data Stays Yours" (no data selling)
  - "Canadian Data Storage" → "100% Canadian" (data sovereignty)
  - "Our Data Protection Approach" → "Why Our Approach Is Different" (personal, human)
  - "Your Privacy Rights" → "Your Data, Your Control" (FAQ-style, conversational)
- **Hero Subheadline** - Changed from "Unlock A Revolutionary Approach..." to "Transform Your Health with Precision Assessment"
- **All "Shop Now" Buttons** - Changed to "View Services" across the site
- **"Invest in Your Future" Button** - Changed to "Discover Your Health Blueprint"
- **Coaching Duration** - Updated from "six months" to "up to 12 months" (variable)
- **Removed All AI/Artificial Intelligence References** - Replaced with "next-generation electronic health system" throughout:
  - "Health Powered by AI" → "Health Powered by Technology"
  - "AI-Driven Insight" → "Technology-Driven Insight"
  - "Phase 1: AI Health Analysis" → "Phase 1: Comprehensive Health Analysis"
  - "AI-powered health analysis" → "Comprehensive health analysis"
  - Updated all FAQ questions and product descriptions
- **Phase 1 Title** - Changed from "James AI Health Analysis" to "Comprehensive Health Analysis"
- **FAQ About AI** - Rewritten to explain health analysis without AI branding
- **Visionary Section Text** - Removed cringy phrases ("visionary thinking", "elite", "unmatched", "most vibrant life")
- **Feature Icons** - Changed "Built by Visionaries" to "Built by Physicians"

### Fixed
- **Contact Page Demo Disclaimer** - Removed "All products in this store are for demo purposes only" message
- **Contact Form Dropdown** - Changed generic options to relevant inquiry types (Longevity, Urgent Care, Corporate, etc.)
- **Contact Info Section** - Added real contact info (info@whitepinemedical.ca, bookings@whitepinemedical.ca, location, hours)

### Removed
- **Jewelry Template Content** - Removed all jewelry-related text from product page (care instructions, polishing cloth, warranty, etc.)
- **Product Page Shipping/Returns** - Replaced with healthcare-appropriate FAQ and service information

---

## [2026-01-20] - Website Branding & Navigation Updates

### Added
- **Clinician EHR Button** - Added button in header linking to `https://app.whitepinemedical.ca`
- **Custom CSS** (`assets/custom-whitepine.css`) - Custom styling for White Pine Medical branding

### Changed
- **Logo Size** - Significantly increased "White Pine Medical" text size (36-48px desktop, 24px mobile) to match hero text prominence
- **Patient Portal Button** - Fixed URL to `https://portal.whitepinemedical.ca`
- **Shop → Services** - Renamed "Shop" menu item to "Services" (done in Shopify admin)
- **Expert-Led Innovation Icons** - Changed icon colors from blue (#2563EB) to dark navy (#1E3A5F)

### Removed
- **Announcement Banner** - Disabled the "New customers save 10%" / "Free shipping" banner at top of page
- **Patient Login Page** - Deleted `templates/customers/login.liquid` (redirects handled externally)
- **Patient Registration Page** - Deleted `templates/customers/register.liquid` (redirects handled externally)
- **Patient Login/Registration Menu Items** - Removed from navigation (done in Shopify admin)

---

## Notes

- **Patient Portal:** https://portal.whitepinemedical.ca
- **Clinician EHR:** https://app.whitepinemedical.ca
- **Privacy Email:** privacy@whitepinemedical.ca
- **General Email:** info@whitepinemedical.ca
- **Bookings Email:** bookings@whitepinemedical.ca
- Navigation menus are managed in Shopify Admin → Content → Menus

### New Pages Created (require Shopify page setup)
To use the new page templates, create pages in Shopify Admin → Pages:
1. **Privacy & Trust** - Create page, select template `page.privacy-trust`
2. **Urgent Care** - Create page, select template `page.urgent-care`
