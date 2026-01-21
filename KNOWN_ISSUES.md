# KNOWN_ISSUES.md - White Pine Medical Shopify Website

> ⚠️ **WARNING: THIS IS SHOPIFY WEBSITE DOCUMENTATION**
>
> Repository: `medic8stat/shopifywebsite` | Store: whitepinemedical.myshopify.com
>
> **NOT** the EHR Platform (`medic8stat/clinalytix-ehr`)

> **Purpose:** Track active bugs, issues, and technical debt for the Shopify website.
> **Last Updated:** 2026-01-21

---

## Issue Summary

| ID | Severity | Status | Title |
|----|----------|--------|-------|
| ISS-001 | LOW | ⚠️ PENDING | Privacy & Trust page needs Shopify page creation |
| ISS-002 | LOW | ⚠️ PENDING | Urgent Care page needs Shopify page creation |
| ISS-003 | LOW | ⚠️ PENDING | Mobile menu still shows demo content |
| ISS-004 | MEDIUM | ⚠️ PENDING | Missing images in text/photo sections |

---

## Active Issues

### ISS-001: Privacy & Trust Page Needs Shopify Setup

**Severity:** LOW
**Status:** ⚠️ PENDING
**Category:** Setup
**Reported:** 2026-01-21

**Problem:**
The Privacy & Trust page template (`page.privacy-trust.json`) has been created, but the actual page needs to be created in Shopify Admin for it to be accessible.

**Impact:**
Page is not accessible on the live site until created in Shopify Admin.

**Resolution Steps:**
1. Go to Shopify Admin → Online Store → Pages
2. Click "Add page"
3. Title: "Privacy & Trust"
4. In Theme template dropdown, select `page.privacy-trust`
5. Save

**Files:**
- `templates/page.privacy-trust.json`

---

### ISS-002: Urgent Care Page Needs Shopify Setup

**Severity:** LOW
**Status:** ⚠️ PENDING
**Category:** Setup
**Reported:** 2026-01-21

**Problem:**
The Urgent Care "Coming Soon" page template (`page.urgent-care.json`) has been created, but the actual page needs to be created in Shopify Admin.

**Impact:**
Page is not accessible on the live site until created in Shopify Admin.

**Resolution Steps:**
1. Go to Shopify Admin → Online Store → Pages
2. Click "Add page"
3. Title: "Urgent Care"
4. In Theme template dropdown, select `page.urgent-care`
5. Save

**Files:**
- `templates/page.urgent-care.json`

---

### ISS-003: Mobile Menu Shows Demo Content

**Severity:** LOW
**Status:** ⚠️ PENDING
**Category:** Content
**Reported:** 2026-01-21

**Problem:**
The mobile menu in `sections/group-header.json` still contains demo/placeholder content:
- "Shop our new arrivals:" text
- Empty product blocks
- Generic menu configuration

**Impact:**
Mobile users see irrelevant placeholder text in navigation drawer.

**Root Cause:**
This content was inherited from the original Broadcast theme and not yet customized for White Pine Medical.

**Resolution:**
Update the mobile-menu section in `sections/group-header.json`:
1. Change "Shop our new arrivals:" to appropriate healthcare text
2. Configure product blocks with actual services or remove them
3. Update menu links to match main navigation

**Files:**
- `sections/group-header.json` (lines 129-230)

---

### ISS-004: Missing Images in Text/Photo Sections

**Severity:** MEDIUM
**Status:** ⚠️ PENDING
**Category:** Content
**Reported:** 2026-01-21

**Problem:**
Several text/photo sections throughout the site are missing images, showing empty placeholder boxes. These sections have text content but no accompanying visuals.

**Impact:**
Site looks incomplete and unprofessional. Text/photo layouts appear broken without images.

**Affected Sections (to be identified):**

- Homepage image+text blocks
- Phase sections
- Other text/photo combinations

**Resolution:**
Add images via Shopify Theme Editor (Admin → Themes → Customize):

1. Navigate to each section missing an image
2. Upload or select appropriate images from media library
3. Images will be stored in Shopify CDN and persist across theme pushes

**Note:** Images added via Theme Editor are safe and will persist when pushing code changes, as long as `settings_data.json` is pulled from Shopify before making local edits.

---

## Resolved Issues

### RESOLVED-001: AI References Throughout Site

**Severity:** HIGH
**Status:** ✅ RESOLVED
**Category:** Content
**Resolved:** 2026-01-21

**Problem:**
Multiple references to "AI" and "Artificial Intelligence" throughout the website did not align with branding direction.

**Resolution:**
Searched entire codebase and replaced all AI references with "next-generation electronic health system" and related terminology:
- "AI Health Analysis" → "Comprehensive Health Analysis"
- "Health Powered by AI" → "Health Powered by Technology"
- "AI-Driven Insight" → "Technology-Driven Insight"

**Files Changed:**
- `templates/index.json`
- `templates/product.json`
- `CLAUDE.md`

---

### RESOLVED-002: "Shop Now" Buttons

**Severity:** MEDIUM
**Status:** ✅ RESOLVED
**Category:** Content
**Resolved:** 2026-01-20

**Problem:**
"Shop Now" buttons were inappropriate for a healthcare services site.

**Resolution:**
Changed all "Shop Now" buttons to "View Services" across the site.

**Files Changed:**
- `templates/index.json`

---

### RESOLVED-003: Demo Disclaimer on Contact Page

**Severity:** MEDIUM
**Status:** ✅ RESOLVED
**Category:** Content
**Resolved:** 2026-01-20

**Problem:**
Contact page displayed "All products in this store are for demo purposes only" message.

**Resolution:**
Removed demo disclaimer and added real contact information:
- info@whitepinemedical.ca
- bookings@whitepinemedical.ca
- Location and hours

---

### RESOLVED-004: Jewelry Template Language

**Severity:** MEDIUM
**Status:** ✅ RESOLVED
**Category:** Content
**Resolved:** 2026-01-20

**Problem:**
Product page contained jewelry-related content:
- Care instructions for jewelry
- Polishing cloth references
- Jewelry warranty information

**Resolution:**
Removed all jewelry-related content and replaced with healthcare-appropriate FAQ and service information.

**Files Changed:**
- `templates/product.json`

---

### RESOLVED-005: Incorrect Coaching Duration

**Severity:** LOW
**Status:** ✅ RESOLVED
**Category:** Content
**Resolved:** 2026-01-20

**Problem:**
Website stated "six months" coaching but actual program is variable.

**Resolution:**
Changed to "up to 12 months" coaching throughout the site.

**Files Changed:**
- `templates/index.json`

---

### RESOLVED-006: "Visionary" and Marketing Language

**Severity:** LOW
**Status:** ✅ RESOLVED
**Category:** Content
**Resolved:** 2026-01-20

**Problem:**
Overly promotional language:
- "visionary thinking"
- "elite"
- "unmatched"
- "most vibrant life"

**Resolution:**
Replaced with professional, physician-led language.

**Files Changed:**
- `templates/index.json`

---

## Issue Template

When adding new issues, use this format:

```markdown
### ISS-XXX: [Title]

**Severity:** CRITICAL | HIGH | MEDIUM | LOW
**Status:** ⚠️ PENDING | 🔄 IN PROGRESS | ✅ RESOLVED
**Category:** Bug | Content | Setup | Performance | Security
**Reported:** YYYY-MM-DD
**Resolved:** YYYY-MM-DD (if resolved)

**Problem:**
[Description of the issue]

**Impact:**
[How this affects users or the site]

**Root Cause:**
[Technical cause if known]

**Resolution:**
[Steps taken or to be taken]

**Files:**
- [List of relevant files]
```

---

## Severity Definitions

| Severity | Definition | Response |
|----------|------------|----------|
| **CRITICAL** | Site is broken or unusable | Fix immediately |
| **HIGH** | Major feature broken or wrong content | Fix within session |
| **MEDIUM** | Minor feature issue or content error | Fix when convenient |
| **LOW** | Enhancement or minor cosmetic | Backlog |

---

## Categories

| Category | Description |
|----------|-------------|
| **Bug** | Something is broken |
| **Content** | Text/copy issues |
| **Setup** | Configuration needed |
| **Performance** | Speed/loading issues |
| **Security** | Security concerns |

---

**Last Updated:** 2026-01-21
