import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Now & Always Construction - Comprehensive Construction & Maintenance Solutions",
  description: "High-quality construction and maintenance services for projects of any scale, nationwide. Trusted by clients across South Africa for over 5 years.",
  keywords: ["construction", "renovations", "plumbing", "electrical", "building", "South Africa", "maintenance"],
  authors: [{ name: "Now & Always (PTY) LTD" }],
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
