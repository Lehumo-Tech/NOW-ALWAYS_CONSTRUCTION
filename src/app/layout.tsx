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

export const metadata: Metadata = {
  title: "Now & Always Construction — Building & Maintenance Across South Africa",
  description:
    "Construction, renovations, plumbing, and electrical services in Newcastle and nationwide. Registered company (2021/438875/07) with over 5 years of project delivery.",
  keywords: [
    "construction South Africa",
    "renovations Newcastle",
    "plumbing KwaZulu-Natal",
    "electrical installation",
    "building contractor",
    "maintenance services",
  ],
  authors: [{ name: "Now & Always (PTY) LTD" }],
  openGraph: {
    title: "Now & Always Construction",
    description:
      "Construction, renovations, plumbing, and electrical services in Newcastle and nationwide.",
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0b] text-white`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
