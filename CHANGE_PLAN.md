# Website Restructure Change Plan

> **Purpose:** Detailed implementation plan for homepage and services page restructure.
> **Created:** 2026-01-21
> **Status:** PLANNING

---

## Executive Summary

This plan restructures the White Pine Medical website to:

1. Establish physician-led authority immediately
2. Orient visitors in under 10 seconds
3. Route users correctly without overwhelming them
4. Differentiate on clinical judgment, not gadgets

---

## PHASE 1: Homepage Restructure

### Current State (11 Sections)

| # | Section ID | Type | Action |
|---|-----------|------|--------|
| 1 | section-slideshow-nested | Hero | KEEP - Update copy |
| 2 | section-announcement | Marquee | REMOVE |
| 3 | section-rich-text-problem | Rich Text | REWORK |
| 4 | section-text-row-features | Text Row | KEEP - Reorder |
| 5 | section-double-visionary | Double | KEEP - Reorder |
| 6 | section-double-solution | Double | REWORK |
| 7 | section-columns-phases | Columns | SIMPLIFY |
| 8 | section-double-coaching | Double | MERGE/REMOVE |
| 9 | section-double-corporate | Double | REMOVE |
| 10 | section-reviews | Reviews | REMOVE or MOVE |
| 11 | section-accordion | Accordion | REWORK |

### Target State (8 Sections)

| # | Section | Purpose | Implementation |
|---|---------|---------|----------------|
| 1 | **Hero** | Authority first | Use existing slideshow, update copy |
| 2 | **What We Do** | 10-second orientation | New rich-text or multicolumn section |
| 3 | **How Care Works** | Prepare for Services | Simplify to 3 steps: Assess, Prioritize, Act |
| 4 | **Why Different** | Differentiate | Keep existing text-row, update content |
| 5 | **Services Preview** | Tease, not overwhelm | New multicolumn: 6 domains |
| 6 | **About Physician** | Transfer trust | Keep existing double section, simplify |
| 7 | **Trust & Safety** | Risk management | Rework accordion to focus on boundaries |
| 8 | **CTA** | Respect autonomy | New section with 3 options |

### Section-by-Section Changes

#### 1. Hero Section (KEEP - Update Copy)

**Current:**
- "Live Better Longer"
- "Transform Your Health with Precision Assessment"
- "View Services" button

**Target:**
- Headline: Physician-led, calm, authoritative
- Subheadline: Longevity, prevention, performance focus
- CTA: "Start with a Physician" or "Explore Services"

**Change Type:** CONTENT (Shopify Customizer)

---

#### 2. What We Do (NEW SECTION)

**Purpose:** Orient visitors in under 10 seconds

**Content Blocks:**

| Block | Title | Description |
|-------|-------|-------------|
| 1 | Physician-Led Assessments | Start with clinical guidance |
| 2 | Individual Testing | Choose specific assessments |
| 3 | Coordinated Referrals | Access partner specialists |

**Implementation:**
- Use `section-multicolumn` or `section-text-row`
- 3 columns with icons
- No pricing, no packages

**Change Type:** CONTENT (Shopify Customizer - add new section)

---

#### 3. How Care Works (SIMPLIFY Existing)

**Current:** 5-Phase Assessment Process (columns carousel)

**Target:** 3 Simple Steps

| Step | Title | Description |
|------|-------|-------------|
| 1 | Assess | Comprehensive health evaluation |
| 2 | Prioritize | Physician-guided focus areas |
| 3 | Act | Personalized action plan |

**Implementation:**
- Simplify existing `section-columns-phases`
- Or replace with `section-text-row` (3 items)
- Remove all mention of phases, packages, prices

**Change Type:** CONTENT (Shopify Customizer)

---

#### 4. Why White Pine Is Different (KEEP - Update)

**Current:** "Expert-Led Innovation" with 3 columns

**Target:** Same structure, different themes:

| Column | Title | Description |
|--------|-------|-------------|
| 1 | Medical Oversight | Every assessment guided by a physician |
| 2 | Evidence-Based | Decisions rooted in clinical evidence |
| 3 | Integrated Care | Works with your existing healthcare |

**Change Type:** CONTENT (Shopify Customizer)

---

#### 5. Services Preview (NEW/REWORK)

**Purpose:** Tease services, not overwhelm

**Content:** 6 Domain Cards (not individual tests)

| Domain | Icon |
|--------|------|
| Cardiovascular | Heart |
| Metabolic | Metabolism/fire |
| Brain & Cognition | Brain |
| Movement & Strength | Body/muscle |
| Mental Health | Mind |
| Genetics | DNA |

**CTA:** "View All Services"

**Implementation:**
- Use `section-multicolumn` or `section-highlights`
- 6 items, 3 per row
- Link to Services page

**Change Type:** CONTENT (Shopify Customizer - add section)

---

#### 6. About the Physician (KEEP - Simplify)

**Current:** "Meet the Man Behind Your Longevity & Preventative Health Assessment"

**Target:** Short form only

- Role: Medical Director
- Philosophy: 1-2 sentences
- Why guidance matters: Brief statement

**NOT the full bio** - save for About page

**Change Type:** CONTENT (Shopify Customizer)

---

#### 7. Trust, Safety & Boundaries (REWORK Accordion)

**Current:** FAQ about assessments, support, wearables

**Target:** Risk management focus

| Question | Answer Theme |
|----------|--------------|
| Is this diagnostic testing? | No - screening only, referral pathways |
| How is my data protected? | Privacy, Canadian data residency |
| What if something is found? | Clear referral process |
| Who can I talk to? | Contact options |

**Change Type:** CONTENT (Shopify Customizer)

---

#### 8. Call to Action (NEW SECTION)

**Purpose:** Respect autonomy with choices

**3 Options:**

| Option | CTA | Link |
|--------|-----|------|
| Start with a Physician | Book Consultation | /pages/contact or calendar |
| Explore Assessments | View Services | /collections/services |
| Have Questions? | Contact Us | /pages/contact |

**Implementation:**
- Use `section-multicolumn` or `section-text-row`
- 3 columns with buttons
- Calm, not pushy

**Change Type:** CONTENT (Shopify Customizer - add section)

---

### Sections to REMOVE

| Section | Reason |
|---------|--------|
| section-announcement (marquee) | Distracting, sales-driven |
| section-double-coaching | Merge into Services Preview |
| section-double-corporate | Not homepage priority |
| section-reviews | Optional - lower priority |

---

## PHASE 2: Services Page Restructure

### Current Product Page Structure

The current product.json shows a single-service layout. For the comprehensive services page, we need a different approach.

### Target Services Page Structure

| # | Section | Purpose |
|---|---------|---------|
| 0 | Page Header | Context: "Physician-led assessment with optional individual testing" |
| 1 | How Care Works | Orient before options |
| 2 | Concierge Assessment | Primary entry point |
| 3 | Individual Assessments | 10 categories (collapsible) |
| 4 | Bundled Assessments | Concept only (future) |
| 5 | Referral Partners | External services |
| 6 | Not Sure? | Soft close CTA |

### Individual Assessment Categories

| Category | Tests |
|----------|-------|
| 3.1 Cardiopulmonary & Cardiovascular | VO2 Max, Submaximal, ECG, Exercise ECG |
| 3.2 Body Composition & Metabolic | Body Comp, BMR, Metabolic Flexibility |
| 3.3 Neurological, Cognitive & Sensory | VR Vision, Hearing, Reaction Time, Balance |
| 3.4 Strength, Power & Functional | Grip, Lower-Limb Power, FMS, RunEasi Gait |
| 3.5 Vascular & Autonomic | BP Screening, HRV, ABPI |
| 3.6 Respiratory | Spirometry & Lung Age |
| 3.7 Digital & Algorithmic | Longevity Snapshots, Digital Cognitive |
| 3.8 Mental Health & Psychiatric | Online + Physician, In-Person + Therapist |
| 3.9 Genetic Testing | Nutrigenetics, Cancer, Longevity |
| 3.10 Ultrasound-Based | Limited Screening Ultrasound |

### Implementation Options

**Option A: Custom Services Page Template**

Create `templates/page.services.json` with:

1. Hero section with page header
2. Rich text for "How Care Works"
3. Double section for Concierge Assessment
4. Tab collections or accordion for categories
5. Multicolumn for referral partners
6. CTA section for "Not Sure?"

**Option B: Enhanced Collection Page**

Modify `templates/collection.json` to:

1. Add category tabs using `section-tab-collections`
2. Tag products by category
3. Use collection filtering

**Recommendation:** Option A (Custom page template) for maximum control

---

## Implementation Sequence

### Step 1: Content Audit (User Task)

User should review and approve:

- [ ] Hero messaging (headline, subheadline)
- [ ] "What We Do" 3 blocks content
- [ ] "How Care Works" 3 steps content
- [ ] "Why Different" 3 columns content
- [ ] Services Preview 6 domains
- [ ] Physician short bio
- [ ] Trust/Safety FAQ content
- [ ] CTA options and links

### Step 2: Homepage Restructure (Shopify Customizer)

All changes via Shopify Admin > Themes > Customize:

1. Remove: Announcement marquee
2. Remove: Corporate section
3. Remove: Coaching section (or merge)
4. Reorder remaining sections
5. Add: "What We Do" section
6. Add: "Services Preview" section
7. Add: CTA section
8. Update content in kept sections

### Step 3: Services Page (Code + Content)

1. Create `templates/page.services.json` (CODE)
2. Create page in Shopify Admin (CONTENT)
3. Add sections and content (CONTENT)

### Step 4: Testing & Review

1. Preview at: https://whitepinemedical.myshopify.com/?preview_theme_id=182960718119
2. Test mobile responsiveness
3. Test all links
4. User review and approval

### Step 5: Go Live

1. Publish Broadcast theme as live
2. Monitor for issues

---

## Files to Modify

| File | Change Type | Description |
|------|-------------|-------------|
| templates/index.json | CONTENT | Homepage section order and content |
| templates/page.services.json | CODE | New services page template |
| sections/group-header.json | CODE | Already fixed mobile menu |
| CLAUDE.md | CODE | Updated with requirements |
| KNOWN_ISSUES.md | CODE | Updated issue statuses |

---

## Next Steps

1. **User Review:** Approve content direction for each section
2. **Content Writing:** Prepare actual copy for each section
3. **Customizer Work:** Implement changes in Shopify Admin
4. **Code Work:** Create services page template if needed
5. **Testing:** Review at preview URL
6. **Go Live:** Publish when approved

---

**Version:** 1.0.0
**Last Updated:** 2026-01-21
