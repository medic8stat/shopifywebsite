# Changelog

All notable changes to the White Pine Medical Shopify website will be documented in this file.

---

## [2026-01-21] - Services Page Restructure & Product CSV (v6.0.9)

### Changed

- **Services page redesigned** with 3 clear entry pathways:
  - **Option 1: Physician Concierge Assessment** - Recommended first step ($300)
  - **Option 2: Comprehensive Health & Longevity Assessment** - For those ready to proceed
  - **Option 3: Publicly Funded Urgent Care** - Links to /pages/urgent-care
- **Individual assessments** - Prices moved from accordion titles into expanded content for cleaner display
- **Add to Cart links** - Each assessment now includes a product link for direct purchase (30 products)

### Added

- **`products-import.csv`** (NEW) - Shopify product import CSV with 30 health assessment products:
  - Physician Concierge Assessment ($300)
  - VO₂ Max Performance Assessment ($349)
  - Submaximal Cardiorespiratory Fitness Assessment ($249)
  - Resting 12-Lead ECG Screening ($129)
  - Exercise ECG Stress Test ($229)
  - Body Composition Analysis ($199)
  - Resting Metabolic Rate Test ($229)
  - Metabolic Flexibility Assessment ($249)
  - VR Vision Performance Screening ($179)
  - Hearing Screening ($179)
  - Reaction Time & Cognitive Response Test ($149)
  - Balance & Proprioception Assessment ($179)
  - Grip Strength Assessment ($99)
  - Lower Limb Power Assessment ($149)
  - Functional Movement Screen ($199)
  - RunEasi Gait & Movement Analysis ($249)
  - Blood Pressure & Vascular Screening ($79)
  - Heart Rate Variability Assessment ($189)
  - Ankle-Brachial Pressure Index ($149)
  - Spirometry & Lung Age Assessment ($169)
  - Blood Testing Coordination Service ($50)
  - Digital Longevity Snapshot – Clinician Review ($350)
  - Digital Longevity Snapshot – Physician Consultation ($1,000)
  - Digital Cognitive Screening ($379)
  - Psychiatric Mental Health Screening – Online ($399)
  - Psychiatric Mental Health Screening – In-Person ($500)
  - Genetic Panel – Nutrigenetics ($599)
  - Genetic Panel – Cancer Genetics ($699)
  - Genetic Panel – Longevity & Health ($699)
  - Limited Screening Ultrasound ($499)

### Technical

- Updated `templates/page.services.json` with new 3-option pathway structure
- Add to Cart links use plain anchor tags (Shopify richtext doesn't support class attributes)
- Products ready for bulk import via Shopify Admin → Products → Import

### Next Steps

1. Import `products-import.csv` via Shopify Admin → Products → Import
2. Add product images in Shopify Admin
3. Test Add to Cart buttons on Services page

---

## [2026-01-21] - Hero Button Fixes (v6.0.8)

### Fixed

- **Homepage hero button** - "Explore Services" now links to `/pages/services` (was missing URL)
- **Homepage hero** - Removed empty secondary button that appeared next to "Explore Services"
- **Corporate Wellness hero** - Removed empty secondary button that appeared next to "Contact Us"

### Technical

- Updated `templates/index.json`: Set `button_url` to `/pages/services`, changed secondary button style to `btn--text`
- Updated `templates/page.corporate-wellness-longevity-services.json`: Changed secondary button style to `btn--text`

---

## [2026-01-21] - Navigation Redesign & Corporate Wellness (v6.0.7)

### Changed

- **Navigation layout** - Created true split navigation with logo centered:
  - **Left menu (Quick Links):** Home, Services, About, Contact, For Business
  - **Center:** White Pine Medical logo
  - **Right menu (header-right):** Urgent Care, Patient Portal, Clinician EHR
  - Font increased to 17px (19px on wide screens)
- **Patient Portal & Clinician EHR** - Converted from CTA buttons to regular nav links matching other menu items
- **Header CTA button** - Disabled (Patient Portal now in main nav)

### Technical

- **Modified `sections/header.liquid`** - Added new header style and secondary menu support:
  - Created `secondary_menu` capture for desktop right-side navigation
  - Added `logo_center_split` case to render split layout
  - Added "Logo center with split menus" option to header style schema
- Updated `sections/group-header.json`:
  - Changed `header_style` to `logo_center_split`
  - Disabled CTA button
  - Set `secondary_menu_linklist: "header-right"` for right-side nav
- Updated `assets/custom-whitepine.css` with split nav alignment (left/right)
- Created two menus in Shopify Admin → Content → Menus:
  - **Quick Links** (left): Home, Services, About, Contact, For Business
  - **header-right** (right): Urgent Care, Patient Portal, Clinician EHR

---

## [2026-01-21] - Corporate Wellness Page & Navigation Updates (v6.0.6)

### Added

- **`templates/page.corporate-wellness-longevity-services.json`** (NEW) - Dedicated template for corporate wellness page:
  - Full-width hero with image background (slideshow-nested format like homepage)
  - "Corporate Wellness" heading with "Physician-led longevity assessments for your team" subtitle
  - 3-column benefits section (Comprehensive Assessments, Measurable ROI, Flexible Programs)
  - 3-step "How It Works" process with images
  - Corporate Services list
  - CTA section

### Changed

- **Corporate wellness ROI messaging** - Updated to: "For every dollar invested in preventative health and longevity wellness services, organizations save approximately four dollars in recruitment, retention, and absenteeism costs."
- **Main navigation font size** - Increased from default to 16px (18px on wide screens) with bolder weight for better visibility
- **Footer** - Added "Legal" section pointing to `footer-legal` menu for Privacy & Trust link
- **Privacy & Trust** - Moved from main navigation to footer (via Shopify Admin menu changes)

### Technical

- Updated `assets/custom-whitepine.css` with navigation font styling
- Updated `sections/group-footer.json` with Legal linklist block

---

## [2026-01-21] - Services Page Hero Redesign (v6.0.5)

### Changed

- **Services page hero** - Redesigned layout to avoid text color issues:
  - Hero section now image-only (woodland photo with opacity overlay, no text)
  - Added new navy banner section below hero with "Our Services" heading and subtitle in white text
  - Clean separation: image at top, text on navy background below
- **Color scheme-2** - Restored original navy background (`#1E3A5F`) for proper banner display

### Technical

- Added `services-banner` section (type: `section-rich-text`) using scheme-2
- Removed heading/text blocks from hero section
- Updated section order to: hero → services-banner → how-care-works

---

## [2026-01-21] - Hero Image Transparency Fix (v6.0.4)

### Fixed

- **Services page hero image** - Attempted transparent background approach (superseded by v6.0.5 redesign)

---

## [2026-01-21] - Transparent Headers & Hero Images (v6.0.3)

### Changed

- **Services page hero** - Removed navy color scheme, image now displays with opacity overlay behind navigation
- **Header transparency** - Enabled `transparent_page: true` so all pages can have hero images extend behind the navigation bar (like homepage)

---

## [2026-01-21] - Dr. James French Bio & Navigation Fixes (v6.0.2)

### Added

- **`templates/page.dr-james-french.json`** (NEW) - Complete physician bio page with 7 sections:
  - Hero with name and credentials
  - Introduction paragraph
  - "A Clinical Journey Shaped by Experience" - career background, COVID insights, personal cardiac surgery experience
  - "Medical Education, Academic Leadership & Research" - Dalhousie, publications, awards
  - "From Acute Care to Longevity Medicine" - practice integration details
  - "Philosophy of Care" - approach to longevity medicine
  - CTA to book consultation
  - Hero image added via Shopify Admin

### Fixed

- **Services navigation link** - Changed from `/products/white-pine-medical-longevity-assessment` to `/pages/services` in Shopify Admin menus
- **Dr. James French page** - Now uses dedicated template instead of default page template

### Changed

- **Navigation menu** - "Services" now correctly links to the comprehensive services page with all assessment categories

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
