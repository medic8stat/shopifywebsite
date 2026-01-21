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
| ISS-001 | LOW | ✅ RESOLVED | Privacy & Trust page needs Shopify page creation |
| ISS-002 | LOW | ✅ RESOLVED | Urgent Care page needs Shopify page creation |
| ISS-003 | LOW | ✅ RESOLVED | Mobile menu still shows demo content |
| ISS-004 | MEDIUM | ⚠️ PENDING | Missing images in text/photo sections |

---

## Active Issues

### RESOLVED-007: Theme Push Overwrites Customizer Changes (Hero Images Lost)

**Severity:** CRITICAL
**Status:** ✅ RESOLVED
**Category:** Bug/Workflow
**Reported:** 2026-01-21
**Resolved:** 2026-01-21

**Problem:**
Hero banner images and other content changes made via Shopify Customizer were being lost after code pushes. Changes appeared to work initially but disappeared after subsequent `shopify theme push` commands.

**Root Cause:**
Theme 2.0 stores content in JSON files (`templates/*.json`, `config/settings_data.json`). When running `shopify theme push`, local JSON files overwrite remote JSON files, destroying any Customizer changes (images, text, settings).

The workflow was:
1. User makes image change in Customizer → saved to Shopify JSON
2. Developer runs `shopify theme push` → local (stale) JSON overwrites Shopify JSON
3. Image change is lost

**Resolution:**
Implemented comprehensive file protection and workflow changes:

1. **Created `.shopifyignore`** - Prevents push from overwriting:
   - `config/settings_data.json`
   - `templates/*.json` (index, about, contact, privacy-trust, urgent-care, product)
   - `sections/group-header.json`, `sections/group-footer.json`

2. **Created `shopify.theme.toml`** - Environment-based configuration:
   - `broadcast` environment with ignore rules for safe development
   - `production` environment defined but marked as NEVER USE

3. **Established clear workflow separation:**
   - CODE changes (Liquid, CSS, JS) → Claude Code edits locally → push
   - CONTENT changes (images, text) → User edits in Customizer → Claude pulls and commits

4. **Updated all documentation:**
   - CLAUDE.md - Quick reference with critical rules
   - CLAUDE_CONTEXT.md - Full workflow details
   - SHOPIFY_DEVELOPMENT_WORKFLOW.md - Complete guide (NEW)

**Files Created/Modified:**
- `.shopifyignore` (NEW)
- `shopify.theme.toml` (NEW)
- `SHOPIFY_DEVELOPMENT_WORKFLOW.md` (NEW)
- `CLAUDE.md` (updated)
- `CLAUDE_CONTEXT.md` (updated)

**Prevention:**
- Always run `shopify theme pull` before starting work
- Use `shopify theme push -e broadcast` (respects ignore rules)
- Never edit JSON files locally for content changes
- Content changes must go through Shopify Customizer

---

### ISS-003: Mobile Menu Shows Demo Content

**Severity:** LOW
**Status:** ✅ RESOLVED
**Category:** Content
**Reported:** 2026-01-21
**Resolved:** 2026-01-21

**Problem:**
The mobile menu in `sections/group-header.json` still contains demo/placeholder content:
- "Shop our new arrivals:" text
- Empty product blocks
- "Sale" highlighting
- "Shop Gemstone Collection" text

**Impact:**
Mobile users see irrelevant placeholder text in navigation drawer.

**Root Cause:**
This content was inherited from the original Broadcast theme and not yet customized for White Pine Medical.

**Resolution:**
Updated `sections/group-header.json`:
1. Changed "Shop our new arrivals:" to "Physician-led health assessments"
2. Removed empty product blocks from mobile menu
3. Removed "Sale" highlighting from both mobile menu and header
4. Removed "Shop Gemstone Collection" text from header image block

**Files:**
- `sections/group-header.json`

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

### RESOLVED-008: Privacy & Trust Page Created

**Severity:** LOW
**Status:** ✅ RESOLVED
**Category:** Setup
**Reported:** 2026-01-21
**Resolved:** 2026-01-21

**Problem:**
The Privacy & Trust page template existed but the page was not created in Shopify Admin.

**Resolution:**
Page created in Shopify Admin with `page.privacy-trust` template assigned.

---

### RESOLVED-009: Urgent Care Page Created

**Severity:** LOW
**Status:** ✅ RESOLVED
**Category:** Setup
**Reported:** 2026-01-21
**Resolved:** 2026-01-21

**Problem:**
The Urgent Care "Coming Soon" page template existed but the page was not created in Shopify Admin.

**Resolution:**
Page created in Shopify Admin with `page.urgent-care` template assigned.

---

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
