import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nowandalways.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Now & Always Construction — Building & Maintenance Across South Africa",
    template: "%s | Now & Always Construction",
  },
  description:
    "Professional construction, renovations, plumbing, and electrical services in Newcastle, KwaZulu-Natal and nationwide. Registered company (2021/438875/07). Trusted by Mediclinic, Bosch Car Service, Discovery Insurance & more.",
  keywords: [
    "construction South Africa",
    "renovations Newcastle",
    "plumbing KwaZulu-Natal",
    "electrical installation",
    "building contractor",
    "maintenance services",
    "Now and Always Construction",
    "Newcastle builder",
    "KZN construction company",
    "residential renovations South Africa",
    "commercial building contractor",
    "SABS certified plumbing",
    "COC electrical certificate",
  ],
  authors: [{ name: "Now & Always (PTY) LTD", url: SITE_URL }],
  creator: "Now & Always (PTY) LTD",
  publisher: "Now & Always (PTY) LTD",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Now & Always Construction — Building & Maintenance Across South Africa",
    description:
      "Professional construction, renovations, plumbing, and electrical services. Trusted by Mediclinic, Bosch, Discovery & more. Free quotes.",
    url: SITE_URL,
    siteName: "Now & Always Construction",
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Now & Always Construction — Building & Maintenance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Now & Always Construction",
    description:
      "Construction, renovations, plumbing & electrical services in Newcastle, KZN. Trusted by leading SA organisations.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "construction",
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Now & Always Construction",
  legalName: "Now and Always (Pty) Ltd",
  description:
    "Professional construction, renovations, plumbing, and electrical services in Newcastle, KwaZulu-Natal and nationwide across South Africa.",
  url: SITE_URL,
  telephone: "+27670318635",
  email: "projects@nowandalways.co.za",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Newcastle",
    addressRegion: "KwaZulu-Natal",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -27.7579,
    longitude: 29.9266,
  },
  foundingDate: "2021",
  taxID: "2021/438875/07",
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  serviceType: [
    "Construction",
    "Renovations",
    "Plumbing",
    "Electrical Installation",
    "Building Maintenance",
  ],
  priceRange: "$$",
  image: `${SITE_URL}/og-image.jpg`,
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0a0b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="ZA-KZN" />
        <meta name="geo.placename" content="Newcastle" />
        <meta name="geo.position" content="-27.7579;29.9266" />
        <meta name="ICBM" content="-27.7579, 29.9266" />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0b] text-white`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-to-content" suppressHydrationWarning>
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
