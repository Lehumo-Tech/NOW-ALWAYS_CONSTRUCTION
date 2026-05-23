'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'
import { SITE, NAV_LINKS } from '@/lib/config'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Now & Always Construction — Home">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-md flex items-center justify-center float-slow">
              <span className="text-white font-bold text-base sm:text-xl" aria-hidden="true">N</span>
            </div>
            <div className="leading-none">
              <div className="text-white font-bold text-sm sm:text-base tracking-wide">NOW &amp; ALWAYS</div>
              <div className="text-gray-500 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">Construction</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] tracking-wide font-medium text-gray-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-semibold px-4 py-2.5 rounded-md haptic-glow min-h-[44px]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {SITE.phone}
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center haptic-ripple rounded-lg"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass-strong border-t border-white/8" role="dialog" aria-label="Mobile navigation">
          <nav className="flex flex-col px-6 py-5 gap-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] tracking-wide font-medium text-gray-300 hover:text-white transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-[14px] font-semibold px-5 py-3 rounded-md mt-1 haptic-press min-h-[44px]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {SITE.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
