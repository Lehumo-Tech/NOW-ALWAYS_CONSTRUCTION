# Now & Always Construction

Professional construction company website built with Next.js, TypeScript, and Tailwind CSS.

## Overview

A modern, responsive website for **Now & Always Construction** — a South African construction company showcasing their portfolio, services, client testimonials, and credentials. Fully POPIA-compliant with deployment-agnostic architecture.

## Tech Stack

- **Framework**: Next.js 16 (App Router, standalone output)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + glassmorphism effects
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Form Validation**: react-hook-form + zod
- **Deployment**: Docker + Kubernetes ready, Vercel/Netlify compatible

## Features

- **Home Page** — Hero, services, featured projects, credentials, client testimonials, POPIA-compliant quote form, map
- **Gallery Page** — Filterable project gallery with masonry/grid/fullwidth layouts and lightbox
- **Privacy Policy** — POPIA-compliant privacy policy at `/privacy`
- **POPIA Compliance** — Consent checkbox, privacy policy, consent timestamps, consent versioning, server-agnostic API template
- **Quote Form** — Client-side form with WhatsApp and email submission (no backend required); API route template for server-side integration
- **Mobile Optimized** — Fully responsive, WhatsApp-first communication
- **Low-Bandwidth Friendly** — Click-to-load map, lazy-loaded images, minimal JS
- **SEO Ready** — JSON-LD structured data, Open Graph, sitemap.xml, robots.txt
- **Security Headers** — CSP, X-Frame-Options, XSS protection, referrer policy
- **Credentials Section** — CIPC, CIDB, B-BBEE, CSD, trade-tested employees
- **Kubernetes** — Production-ready K8s manifests
- **Docker** — Multi-stage Dockerfile for containerized deployment

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout (SEO, JSON-LD, meta)
│   │   ├── globals.css       # Global styles + animations
│   │   ├── privacy/page.tsx  # POPIA Privacy Policy
│   │   ├── gallery/page.tsx  # Portfolio gallery
│   │   ├── robots.ts         # SEO robots.txt
│   │   └── sitemap.ts        # SEO sitemap.xml
│   ├── components/
│   │   ├── Header.tsx        # Shared navigation header
│   │   ├── Footer.tsx        # Shared footer
│   │   ├── QuoteForm.tsx     # POPIA-compliant contact form
│   │   ├── QuoteForm/        # Form sub-components
│   │   │   └── ConsentCheckbox.tsx  # Reusable POPIA consent component
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   ├── config.ts         # Site-wide constants (phone, email, etc.)
│   │   ├── popia.ts          # POPIA compliance types, payloads, validation
│   │   └── utils.ts          # Utility functions
│   └── hooks/                # Custom React hooks
├── public/
│   ├── gallery/              # Portfolio images
│   ├── logos/                # Client company logos
│   ├── hero-bg.jpg           # Hero background
│   └── logo.svg              # Company logo
├── k8s/                      # Kubernetes deployment configs
├── Dockerfile                # Docker build configuration
├── .env.example              # Environment variable template
├── DEPLOY.md                 # Comprehensive deployment guide
├── HANDOVER.md               # Code delivery handover document
└── package.json              # Dependencies & scripts
```

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Your production domain (for SEO/sitemap) |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` | Facebook page URL |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | Instagram profile URL |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | LinkedIn page URL |

## Deployment

See [DEPLOY.md](./DEPLOY.md) for comprehensive deployment instructions covering:
- Vercel (recommended)
- Netlify
- Docker / VPS
- Kubernetes
- cPanel / Shared Hosting
- SSL, DNS, and domain configuration

## POPIA Compliance

This site includes:
- Required consent checkbox on the quote form (reusable `ConsentCheckbox` component)
- Privacy Policy page at `/privacy`
- Consent timestamp recorded on every submission (ISO 8601)
- Consent versioning — tracks which policy version the user agreed to
- Privacy Policy link in the footer and consent label
- Server-agnostic API route template at `/api/quote` with POPIA validation
- Centralized POPIA module (`src/lib/popia.ts`) with types, payloads, and validation
- IP address capture documented for server-side implementation

See [HANDOVER.md](./HANDOVER.md) for the complete code delivery handover, including server-side integration guides.

## Contact

- **Phone**: 067 031 8635
- **WhatsApp**: [Chat with us](https://wa.me/27670318635)
- **Email**: projects@nowandalways.co.za
- **Website**: [nowandalways.co.za](https://nowandalways.co.za)

## License

Private — All rights reserved.
