# Changelog

All notable changes to the White Pine Medical Shopify website will be documented in this file.

---

## [Unreleased]

### Added
- **Privacy & Trust Page** (`page.privacy-trust.json`) - New page explaining data protection, compliance (HIPAA, PHIPA, PIPEDA), and patient rights
- **Urgent Care Page** (`page.urgent-care.json`) - Coming Soon page for walk-in urgent care services with Medicare coverage info
- **CLAUDE.md Development Rules** - Added critical workflow rules: NEVER push to live theme, always use Broadcast theme for development
- **Image Management Documentation** - Added guidance on how images added via Theme Editor persist across code pushes, and best practice to pull settings before local edits

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
