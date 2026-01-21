# Website Onboarding Implementation Guide

> ⚠️ **WARNING: THIS IS SHOPIFY WEBSITE DOCUMENTATION**
>
> Repository: `medic8stat/shopifywebsite` | Store: whitepinemedical.myshopify.com
>
> **NOT** the EHR Platform (`medic8stat/clinalytix-ehr`)

> **Source of Truth:** The master onboarding architecture lives in the EHR repository.
> This document covers **website-specific implementations only**.

---

## Relationship to Master Architecture

The comprehensive 7-Phase White Pine Onboarding Model is documented in:
- **EHR Repository:** `docs/PATIENT_ONBOARDING_ARCHITECTURE.md`

This document covers only what needs to be implemented on the **Shopify website**.

---

## What the Website Must Do

The website is responsible for:
1. **Phase 0 (Pre-Visit Framing):** Welcome email automation
2. **Lead capture:** Contact form with appropriate routing
3. **Service explanation:** Concierge appointment page
4. **Payment processing:** $300 concierge fee + à la carte services

The website is **NOT** responsible for:
- Clinical onboarding (EHR)
- Questionnaire reminders (EHR)
- Results delivery (Patient Portal)
- Long-term relationship automation (EHR)

---

## Website Implementation Checklist

### 1. Contact Form Updates

**Current:** Generic contact form
**Required:** Intent-based routing

```
Contact Form Fields:
- Name
- Email
- Message
- Purpose of inquiry (dropdown):
  - General question
  - Preventive / longevity care interest
  - Urgent / unscheduled care question
  - Media / partnership inquiry
```

**Rules:**
- No health history questions on website
- No symptom triage
- Auto-response explaining next steps based on selection

---

### 2. Automated Welcome Email (Phase 0)

**Trigger:** When someone books a Physician Concierge Appointment

**Email must include:**
- Personal welcome from Dr. French
- Explanation of dual care streams (private preventive vs. public urgent care)
- What the concierge session is and is NOT
- Link to patient portal questionnaire
- Reassurance about privacy and choice
- Contact information

**Canonical email content** is defined in the EHR onboarding document, Section 15.

---

### 3. Physician Concierge Appointment Page

**Price:** $300 CAD
**Duration:** 60-90 minutes

**Page must clearly explain:**

What it IS:
- One-on-one session to clarify health goals
- High-level review of current situation
- Determination of fit with White Pine
- Value even if patient does not continue

What it is NOT:
- A treatment visit
- A shortcut to diagnoses or prescriptions
- A requirement to enroll in ongoing care

**Canonical copy** is defined in the EHR onboarding document, Section 20.

---

### 4. Pricing Strategy (Website-Visible)

**Publicly displayed prices:**

| Service | Price | Display Location |
|---------|-------|------------------|
| Physician Concierge Appointment | $300 CAD | Dedicated page |
| Individual à la carte services | Various (fixed) | Services page |

**Individual à la carte services (examples):**
- VO2 max testing
- Body composition via DEXA
- Gait analysis
- Virtual reality vision testing
- Spirometry
- Bloodwork panels
- Powerlifting clinic assessment

**Pricing model for à la carte:** Cost + 50% gross margin (fixed, transparent)

**NOT displayed publicly:**
- Comprehensive assessment packages (bespoke, value-based)
- Corporate wellness packages

---

### Pricing Philosophy

| Type | Model | Margin | Rationale |
|------|-------|--------|-----------|
| **À la carte** | Cost + markup | Fixed 50% | Transparent, predictable |
| **Individual packages** | Value-based | 50%+ (flexible) | Accessible to those who can't afford more |
| **Corporate packages** | Value-based | 50%+ (higher) | Reflects value of retaining expensive human assets |

**Value-based pricing allows:**
- Flexibility to not overcharge individuals who can't afford it
- Capturing appropriate value from organizations with high-value employees
- Same service quality regardless of price point

**Packages are discussed only after the concierge appointment**, tailored to individual goals, ability to pay, and organizational value (for corporate clients).

---

### 5. Dual Care Stream Messaging

The website must clearly distinguish:

| Stream | Description | Payment |
|--------|-------------|---------|
| **Private Preventive/Longevity** | Structured, goal-based, time-intensive | Private pay |
| **Public Urgent Care** | Non-life-threatening, unscheduled | Medicare-covered |

**Key messaging:**
> "White Pine Medical operates two connected services. We provide publicly funded urgent care for non-life-threatening problems, and we also offer private, structured preventive and longevity-focused care."

---

### 6. Lead Capture Automation

**When someone submits contact form with "Preventive / longevity care interest":**

1. **Immediate auto-response email:**
   - Thank you for your interest
   - Brief explanation of concierge model
   - Link to book Physician Concierge Appointment
   - Link to FAQ

2. **If they book concierge appointment:**
   - Welcome email (Section 2 above)
   - Portal link for pre-visit questionnaire

**Technology options:**
- Shopify Flow (if available on plan)
- Klaviyo or similar email automation
- Azure Communication Services (if integrated with EHR)

---

## What NOT to Build on Website

Per the master architecture, these belong in the EHR/Portal:

| Feature | Owner | Why Not Website |
|---------|-------|-----------------|
| Questionnaire reminders | EHR | Requires portal authentication |
| Results delivery | Patient Portal | HIPAA/PHIPA compliance |
| Appointment reminders | EHR | Clinical scheduling system |
| Long-term check-ins | EHR | Part of clinical relationship |
| AI health assistant | Patient Portal | Requires authenticated patient context |

---

## Epistemic Boundaries (Critical)

The website must respect preclinical boundaries:

**Website CAN:**
- Explain services
- Capture contact information
- Process payments
- Send welcome materials
- Route inquiries appropriately

**Website CANNOT:**
- Collect health history
- Triage symptoms
- Suggest diagnoses
- Recommend tests or treatments
- Make clinical claims

All preclinical data captured on website is `unverified` and `binding=false` until processed through clinical workflow.

---

## Quick Implementation Tasks

### This Week
- [ ] Update contact form with purpose dropdown
- [ ] Create/update Physician Concierge Appointment page with canonical copy
- [ ] Set up auto-response for contact form submissions
- [ ] Add dual care stream explanation to homepage or About page

### Next Sprint
- [ ] Implement welcome email automation on booking
- [ ] Add à la carte services pricing page
- [ ] Update FAQ with onboarding questions (from EHR doc Section 17)

### Future
- [ ] Integrate email automation with EHR (Azure Communication Services)
- [ ] Add physician welcome video to website
- [ ] Implement lead tracking for conversion analytics

---

## Reference: EHR Onboarding Document Sections

| Section | Content | Website Relevance |
|---------|---------|-------------------|
| 15 | Welcome Email Template | Copy for automation |
| 17 | Patient FAQ | Add to website FAQ page |
| 18 | Physician Video Script | Record and embed on website |
| 19 | Contact Form Architecture | Implement on website |
| 20 | Concierge Appointment Copy | Use for booking page |

---

**Document Version:** 2.0.0
**Last Updated:** 2026-01-21
**Source of Truth:** EHR Repository - PATIENT_ONBOARDING_ARCHITECTURE.md
