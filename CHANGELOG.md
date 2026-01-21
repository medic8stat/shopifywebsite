# Changelog

All notable changes to the White Pine Medical Shopify website will be documented in this file.

## [Unreleased]

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

### Notes
- Patient Portal: `https://portal.whitepinemedical.ca`
- Clinician EHR: `https://app.whitepinemedical.ca`
- Navigation menus are managed in Shopify Admin → Content → Menus
