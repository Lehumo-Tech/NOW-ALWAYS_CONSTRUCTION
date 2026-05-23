# Code Delivery Handover — Now & Always Construction Website

> **Client:** Now and Always (Pty) Ltd (CIPC Reg: 2021/438875/07)
> **Developer:** Lehumo Tech
> **Date:** May 2026
> **Repository:** https://github.com/Lehumo-Tech/NOW-ALWAYS_CONSTRUCTION.git

---

## Scope & Responsibilities

**The developer is responsible for code delivery ONLY.** The developer is NOT responsible for:

- Hosting, domain, or DNS configuration
- SSL certificate management
- Email hosting or delivery
- Server-side form processing or database management
- Ongoing maintenance, updates, or security patches after handover
- Third-party service accounts (analytics, CRM, email providers)

The client (or their hosting provider) assumes responsibility for all of the above upon code receipt.

---

## Architecture Overview

### Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 16 (App Router) | Standalone output mode |
| Language | TypeScript (strict) | Full type safety |
| Styling | Tailwind CSS | Glassmorphism + dark theme |
| UI Components | shadcn/ui | Radix UI primitives |
| Icons | Lucide React | Tree-shakeable SVG icons |
| Forms | react-hook-form + Zod | Client-side validation |
| Deployment | Docker + K8s ready | Vercel/Netlify compatible |

### Key Design Decisions

1. **WhatsApp-First Communication**: South African users prefer WhatsApp over email. The quote form defaults to WhatsApp submission, with email as a secondary option.

2. **No Backend Required (Current State)**: The site works as a static/SSG application. Forms submit via WhatsApp (pre-filled message) or mailto: links. No database, no server-side processing, no API keys needed.

3. **Server-Agnostic Architecture**: All code is deployment-agnostic. The API route at `/api/quote` is a **template** — it validates and logs submissions but does not persist data. The hosting provider implements the storage backend of their choice.

4. **Low-Bandwidth Optimized**: Click-to-load Google Map, lazy-loaded images, minimal JavaScript bundle. Designed for South African mobile users on variable data connections.

5. **POPIA Compliance**: Full compliance with the Protection of Personal Information Act 4 of 2013. See dedicated section below.

---

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page (hero, services, projects, etc.)
│   │   ├── layout.tsx            # Root layout (SEO meta, JSON-LD, security headers)
│   │   ├── globals.css           # Global styles, animations, glass effects
│   │   ├── privacy/page.tsx      # POPIA-compliant privacy policy
│   │   ├── gallery/page.tsx      # Portfolio gallery with filters & lightbox
│   │   ├── api/
│   │   │   └── quote/route.ts    # ⚡ TEMPLATE — implement storage here
│   │   ├── robots.ts             # SEO robots.txt generation
│   │   └── sitemap.ts            # SEO sitemap.xml generation
│   ├── components/
│   │   ├── Header.tsx            # Navigation header (shared)
│   │   ├── Footer.tsx            # Footer with POPIA links (shared)
│   │   ├── QuoteForm.tsx         # POPIA-compliant quote request form
│   │   ├── QuoteForm/
│   │   │   └── ConsentCheckbox.tsx  # Reusable POPIA consent component
│   │   └── ui/                   # shadcn/ui component library
│   ├── lib/
│   │   ├── config.ts             # 🔧 Site constants (phone, email, address)
│   │   ├── popia.ts              # POPIA compliance types & utilities
│   │   ├── utils.ts              # Utility functions
│   │   └── db.ts                 # Prisma DB client (template, unused)
│   └── hooks/                    # Custom React hooks
├── public/
│   ├── gallery/                  # Project portfolio images
│   ├── logos/                    # Client company logos
│   ├── hero-bg.jpg               # Hero section background
│   ├── logo.svg                  # Company logo
│   └── reference-letter-mediclinic.pdf  # Mediclinic reference letter
├── k8s/                          # Kubernetes deployment manifests
├── Dockerfile                    # Multi-stage Docker build
├── .env.example                  # Environment variable template
├── DEPLOY.md                     # Deployment guide for hosting providers
├── HANDOVER.md                   # ← This document
└── README.md                     # Technical project overview
```

---

## POPIA Compliance — Detailed Implementation

### What POPIA Requires

The Protection of Personal Information Act 4 of 2013 (POPIA) requires that:

1. **Explicit consent** must be obtained before processing personal information
2. The data subject must be informed of **what information is collected and why**
3. Consent must be **voluntary, specific, and informed**
4. The data subject has the right to **access, correct, and delete** their information
5. The responsible party must implement **appropriate security measures**
6. A **privacy policy** must be available and accessible

### What This Codebase Implements

| POPIA Requirement | Implementation | Status |
|---|---|---|
| Explicit consent | `ConsentCheckbox` component — required checkbox, not pre-checked | ✅ Complete |
| Privacy Policy | `/privacy` page with full POPIA-compliant policy | ✅ Complete |
| Consent timestamp | `generateConsentPayload()` captures ISO 8601 timestamp at submission | ✅ Complete |
| Consent version | `POPIA_POLICY_VERSION` tracks which policy the user consented to | ✅ Complete |
| Policy URL | Consent payload includes `policy_url` linking to the privacy policy | ✅ Complete |
| Form validation | Zod schema enforces `popia_consent: z.literal(true)` — form cannot submit without consent | ✅ Complete |
| Server-side validation | API route validates consent payload using `validateConsentPayload()` | ✅ Template |
| IP logging | API route captures IP from `X-Forwarded-For`, `X-Real-IP`, or `CF-Connecting-IP` | ✅ Template |
| Data Subject Access | Not implemented — requires server-side endpoint | ⬜ Client's host |
| Data deletion | Not implemented — requires server-side endpoint | ⬜ Client's host |
| Information Officer | Listed in privacy policy under Section 9 | ✅ Complete |

### POPIA Consent Payload Structure

Every form submission includes this consent metadata:

```json
{
  "popia_consent": true,
  "consent_timestamp": "2026-05-24T10:30:00.000Z",
  "consent_version": "2026-03",
  "policy_url": "https://nowandalways.co.za/privacy"
}
```

### Server-Side Metadata (captured by API route)

When a submission hits the `/api/quote` endpoint, the server captures:

```json
{
  "_server": {
    "received_at": "2026-05-24T10:30:01.234Z",
    "submitter_ip": "102.xxx.xxx.xxx",
    "user_agent": "Mozilla/5.0...",
    "consent_version": "2026-03",
    "consent_timestamp": "2026-05-24T10:30:00.000Z"
  }
}
```

> **IP Logging Note:** The client IP is NOT captured by the browser. It is captured server-side from request headers. This is more reliable and privacy-conscious than client-side IP detection.

---

## Server-Side Form Integration

The site currently works without any backend. When the client is ready to store submissions in a database, send them via email, or integrate with a CRM, the hosting provider should implement the API route.

### Current Flow (No Backend)

```
User fills form → Validates client-side → Opens WhatsApp / Email client
```

### Target Flow (With Backend)

```
User fills form → Validates client-side → POST /api/quote → Server validates → Store + Notify
```

### Implementation Steps

#### Step 1: Enable the API submit button

In `src/components/QuoteForm.tsx`, uncomment the "Submit Online" button at the bottom of the form. This enables the third submission method that POSTs to `/api/quote`.

#### Step 2: Implement storage in the API route

Open `src/app/api/quote/route.ts` and replace the placeholder comment with your storage logic. Examples for common backends:

---

**Option A: Email via Nodemailer**

```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// In the POST handler, after validation:
await transporter.sendMail({
  from: `"Now & Always Website" <${process.env.SMTP_USER}>`,
  to: process.env.FORM_RECIPIENT || 'projects@nowandalways.co.za',
  subject: `Quote Request: ${body.service} — ${body.fullName}`,
  html: `
    <h2>New Quote Request</h2>
    <p><strong>Name:</strong> ${body.fullName}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Phone:</strong> ${body.phone}</p>
    <p><strong>Service:</strong> ${body.service}</p>
    <p><strong>Message:</strong> ${body.message}</p>
    <hr>
    <p><small>POPIA Consent: Granted at ${body.popia.consent_timestamp} (v${body.popia.consent_version})</small></p>
    <p><small>IP: ${serverMetadata.submitter_ip} | Submitted: ${serverMetadata.received_at}</small></p>
  `,
})
```

Add to `.env.local`:
```
SMTP_HOST=smtp.your-provider.co.za
SMTP_PORT=587
SMTP_USER=projects@nowandalways.co.za
SMTP_PASS=your-email-password
FORM_RECIPIENT=projects@nowandalways.co.za
```

---

**Option B: SQLite via Prisma (simplest database)**

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// In the POST handler:
await prisma.quoteRequest.create({
  data: {
    fullName: body.fullName,
    email: body.email,
    phone: body.phone,
    service: body.service,
    message: body.message,
    popiaConsent: body.popia.popia_consent,
    consentTimestamp: new Date(body.popia.consent_timestamp),
    consentVersion: body.popia.consent_version,
    policyUrl: body.popia.policy_url,
    submitterIp: serverMetadata.submitter_ip,
    userAgent: serverMetadata.user_agent,
  },
})
```

---

**Option C: Google Sheets via API**

```typescript
// Using Google Sheets API to log submissions
// See: https://developers.google.com/sheets/api/quickstart/nodejs

import { google } from 'googleapis'

const sheets = google.sheets({ version: 'v4', auth: /* your auth */ })

// In the POST handler:
await sheets.spreadsheets.values.append({
  spreadsheetId: process.env.GOOGLE_SHEET_ID,
  range: 'Sheet1!A:K',
  valueInputOption: 'USER_ENTERED',
  requestBody: {
    values: [[
      new Date().toISOString(),
      body.fullName,
      body.email,
      body.phone,
      body.service,
      body.message,
      body.popia.consent_timestamp,
      body.popia.consent_version,
      serverMetadata.submitter_ip,
      serverMetadata.user_agent,
      'new',
    ]],
  },
})
```

---

#### Step 3: Add Data Subject Access & Deletion Endpoints

POPIA requires that data subjects can access and delete their information. Add these routes:

```typescript
// src/app/api/dsar/route.ts — Data Subject Access Request
export async function POST(request: NextRequest) {
  const { email } = await request.json()
  // Look up all records for this email
  // Return a summary of stored personal information
}

// src/app/api/dsar/delete/route.ts — Data Deletion Request
export async function POST(request: NextRequest) {
  const { email, confirmation } = await request.json()
  // Delete all records for this email
  // Log the deletion for audit trail
}
```

#### Step 4: Add Rate Limiting

Protect the API route from abuse:

```typescript
// Simple in-memory rate limiting (use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }) // 1 per minute
    return true
  }
  return entry.count++ < 5 // Max 5 per minute
}
```

---

## Configuration Reference

All site-wide constants are centralized in `src/lib/config.ts`. Update these values when deploying:

| Constant | Current Value | When to Change |
|----------|--------------|----------------|
| `SITE.name` | Now & Always Construction | Company name change |
| `SITE.legalName` | Now and Always (Pty) Ltd | Legal entity change |
| `SITE.url` | https://nowandalways.co.za | Domain change |
| `SITE.regNumber` | 2021/438875/07 | Never (company registration) |
| `SITE.phone` | 067 031 8635 | Phone number change |
| `SITE.phoneRaw` | 0670318635 | Same as phone, no spaces |
| `SITE.phoneInternational` | +27670318635 | Same as phone, international format |
| `SITE.whatsapp` | https://wa.me/27670318635 | WhatsApp number change |
| `SITE.email` | projects@nowandalways.co.za | Email address change |
| `SITE.location` | Newcastle, KZN, SA | Office relocation |
| `SITE.credentials` | CIPC, CIDB, B-BBEE, CSD | New registrations |

POPIA-specific constants are in `src/lib/popia.ts`:

| Constant | Current Value | When to Change |
|----------|--------------|----------------|
| `POPIA_POLICY_VERSION` | 2026-03 | When privacy policy is updated |
| `POPIA_POLICY_DATE` | March 2026 | When privacy policy is updated |
| `POPIA_POLICY_PATH` | /privacy | If privacy page URL changes |

---

## Content Management

### Updating Gallery Images

1. Add images to `public/gallery/` (use descriptive filenames)
2. Update the `GALLERY_IMAGES` array in `src/app/page.tsx` and `src/app/gallery/page.tsx`
3. Each image needs: `src` (path), `alt` (description), `category` (Building/Plumbing/Electrical/Renovations)

### Updating Client Logos

1. Add logo files to `public/logos/`
2. Update the `TRUSTED_CLIENTS` array in `src/app/page.tsx`
3. SVG format preferred for logos; PNG/JPG also supported

### Updating Testimonials

1. Edit the `TESTIMONIALS` array in `src/app/page.tsx`
2. Each testimonial needs: `text`, `author` (job title), `authorName`, `company`, `logo`
3. Optional: `referenceLetter` (path to PDF in `public/`)

### Updating Credentials

1. Edit the `CREDENTIALS` array in `src/app/page.tsx`
2. Also update `TRUST_MARKS` in the hero section if adding new registrations
3. Update `SITE.credentials` in `src/lib/config.ts`

### Updating the Privacy Policy

1. Edit `PRIVACY_SECTIONS` in `src/app/privacy/page.tsx`
2. **IMPORTANT**: After updating the policy, increment `POPIA_POLICY_VERSION` in `src/lib/popia.ts`
3. Update `POPIA_POLICY_DATE` in `src/lib/popia.ts`
4. Update the "Last updated" date in the privacy page banner

---

## Security Checklist

The following security measures are built into the codebase:

- [x] Client-side form validation (Zod schemas)
- [x] Server-side validation in API route template
- [x] POPIA consent required before form submission
- [x] No PII returned in API responses
- [x] Security headers in root layout (CSP, X-Frame-Options, etc.)
- [x] `suppressHydrationWarning` to prevent hydration mismatch attacks
- [x] No hardcoded API keys or secrets in source code
- [x] `.env.example` for environment variables (never `.env.local`)
- [ ] Rate limiting on API routes (implement when enabling server-side)
- [ ] CAPTCHA for form spam prevention (implement if needed)
- [ ] CSRF protection (Next.js handles this automatically for API routes)
- [ ] Input sanitization for stored data (implement in storage layer)

---

## Pre-Launch Checklist

Before going live, ensure:

### Domain & Hosting
- [ ] Domain `nowandalways.co.za` is registered and DNS is configured
- [ ] SSL certificate is active (https://)
- [ ] Site is deployed and accessible at the production URL
- [ ] Email hosting is set up for `projects@nowandalways.co.za`

### Content
- [ ] All gallery images are final (replace WhatsApp-named files)
- [ ] Client logos are official (replace AI-generated placeholders)
- [ ] Social media links are updated in `.env.local`
- [ ] Privacy policy is reviewed by the client
- [ ] All contact information is correct

### POPIA
- [ ] Privacy policy is accurate and up-to-date
- [ ] Consent checkbox works correctly
- [ ] If using server-side storage: implement and test the API route
- [ ] If using server-side storage: set up data subject access and deletion endpoints
- [ ] Information Officer is designated (required by POPIA)

### SEO
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the production domain
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Google Search Console is set up
- [ ] Google Business Profile is registered

### Performance
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)
- [ ] Images are optimized (WebP where possible)
- [ ] Map loads on click (not automatically)
- [ ] Mobile responsiveness verified on multiple devices

---

## Known Limitations

1. **No server-side storage**: Form submissions currently go through WhatsApp/email only. No data is stored on any server.

2. **AI-generated logos**: The client company logos in `public/logos/` are AI-generated placeholders. Replace with official logos before launch.

3. **WhatsApp image filenames**: Gallery images have WhatsApp-style filenames. Rename for professionalism before launch.

4. **No analytics**: The site does not include Google Analytics or any tracking. Add if required.

5. **No CMS**: Content is hardcoded in TypeScript files. A headless CMS (e.g., Strapi, Sanity) can be added later.

6. **Form spam**: No CAPTCHA or honeypot is implemented. Consider adding if spam becomes an issue after launch.

---

## File Integrity

The following files should NEVER be modified by the hosting provider unless they understand the consequences:

| File | Risk if Modified |
|------|-----------------|
| `src/lib/popia.ts` | POPIA compliance could break |
| `src/lib/config.ts` | Contact info, URLs, and credentials could break |
| `src/components/QuoteForm/ConsentCheckbox.tsx` | POPIA consent could become invalid |
| `src/app/privacy/page.tsx` | Legal compliance could be affected |
| `src/app/api/quote/route.ts` | Form processing could break |
| `next.config.ts` | Build and deployment could fail |

---

## Support & Escalation

| Issue | Contact |
|-------|---------|
| Domain / DNS | Domain registrar (e.g. Domains.co.za, Afrihost) |
| SSL certificate | Hosting provider or Let's Encrypt |
| Email delivery | Email hosting provider |
| Server downtime | Hosting provider (Vercel, Netlify, VPS provider) |
| Content updates | Any web developer familiar with Next.js |
| POPIA compliance queries | Information Regulator (www.inforegulator.org.za) |

---

*This document was prepared as part of the code delivery handover. The developer's involvement ends with code delivery. All ongoing responsibilities belong to the client or their designated hosting provider.*
