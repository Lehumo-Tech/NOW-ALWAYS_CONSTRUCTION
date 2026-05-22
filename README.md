# Now & Always Construction

Professional construction company website built with Next.js, TypeScript, and Tailwind CSS.

## Overview

A modern, responsive website for **Now & Always Construction** — a South African construction company showcasing their portfolio, services, and client testimonials.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Docker + Kubernetes ready

## Features

- **Home Page** — Hero section, services overview, featured projects, trusted-by logos, client testimonials, CTA
- **Gallery Page** — Filterable project gallery with masonry/grid/fullwidth layouts and lightbox
- **Mobile Optimized** — Fully responsive across all device sizes
- **SEO Ready** — Built-in sitemap.ts and robots.ts
- **Kubernetes** — Production-ready K8s manifests (deployment, service, ingress, HPA, configmap)
- **Docker** — Multi-stage Dockerfile for containerized deployment

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   ├── gallery/
│   │   │   └── page.tsx      # Gallery page
│   │   ├── api/
│   │   │   └── route.ts      # API route
│   │   ├── robots.ts         # SEO robots.txt
│   │   └── sitemap.ts        # SEO sitemap
│   ├── components/ui/        # shadcn/ui components
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utility functions
├── public/
│   ├── gallery/              # Portfolio images
│   ├── logos/                # Client company logos
│   ├── hero-bg.jpg           # Hero background
│   └── logo.svg              # Company logo
├── k8s/                      # Kubernetes deployment configs
├── Dockerfile                # Docker build configuration
└── package.json              # Dependencies & scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`.

### Docker

```bash
# Build image
docker build -t now-always-construction .

# Run container
docker run -p 3000:3000 now-always-construction
```

### Kubernetes

```bash
# Apply all K8s resources
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -l app=now-always-construction
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=file:./dev.db
```

## Client Testimonials

The website features testimonials from:
- Mediclinic
- Bosch Car Service
- Discovery Insurance
- Dr Els Dentistry
- Hope High School
- Majuba College
- NL Cars

## Contact

- **Phone**: 067 031 8635
- **Website**: [nowandalways.co.za](https://nowandalways.co.za)

## License

Private — All rights reserved.
