'use client'

import Link from 'next/link'
import { Facebook, Linkedin, Instagram } from 'lucide-react'
import { SITE, NAV_LINKS } from '@/lib/config'

export default function Footer() {
  const year = typeof window !== 'undefined' ? new Date().getFullYear() : 2026

  return (
    <footer id="contact" className="bg-[#080809] border-t border-white/5 pt-10 sm:pt-14 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 mb-8 sm:mb-10">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-base" aria-hidden="true">N</span>
              </div>
              <div className="leading-none">
                <div className="text-white font-bold text-sm tracking-wide">NOW &amp; ALWAYS</div>
                <div className="text-gray-600 text-[10px] tracking-[0.2em] uppercase">(Pty) Ltd</div>
              </div>
            </div>
            <p className="text-gray-500 text-[13px] sm:text-sm leading-[1.6] mb-2 max-w-xs">
              Construction and maintenance services. {SITE.location.city}, {SITE.location.province} — working nationwide across {SITE.location.country}.
            </p>
            <p className="text-gray-600 text-xs">Reg: {SITE.regNumber}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-3">
              Services
            </h4>
            <ul className="space-y-2.5">
              {['Renovations', 'Plumbing', 'Electrical', 'Welding', 'Building'].map((link) => (
                <li key={link}>
                  <Link href="/#services" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-3">
              Get in touch
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${SITE.phoneRaw}`} className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-gray-500 hover:text-white text-sm transition-colors duration-200 break-all">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-gray-600 text-xs">
              &copy; {year} {SITE.legalName}. All rights reserved.
            </p>
            <Link href="/privacy" className="text-gray-600 hover:text-white text-xs transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a href={SITE.social.facebook} className="text-gray-600 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center haptic-ripple rounded-lg" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={SITE.social.instagram} className="text-gray-600 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center haptic-ripple rounded-lg" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={SITE.social.linkedin} className="text-gray-600 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center haptic-ripple rounded-lg" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
