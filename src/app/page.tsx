'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Phone,
  ArrowRight,
  MessageCircle,
  Hammer,
  Wrench,
  Zap,
  HomeIcon,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Linkedin,
  Instagram,
  Menu,
  X,
  Quote,
  Eye,
  Building2,
  Paintbrush,
  Droplets,
  HardHat,
  ArrowUpRight,
  Shield,
  Clock,
  MapPin,
} from 'lucide-react'

/* ─────────── DATA ─────────── */

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '/gallery' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    icon: Hammer,
    title: 'Renovations',
    description: 'Kitchen and bathroom overhauls, full interior refits, and structural alterations. We work to your timeline with minimal disruption.',
    detail: 'Residential & commercial',
  },
  {
    icon: Wrench,
    title: 'Plumbing',
    description: 'New installations, emergency repairs, and maintenance for residential and commercial properties. SABS-compliant fittings and fixtures.',
    detail: 'SABS certified',
  },
  {
    icon: Zap,
    title: 'Electrical',
    description: 'Wiring, distribution boards, COC certificates, and load-shedding solutions. All work signed off by registered electricians.',
    detail: 'COC certified',
  },
  {
    icon: HomeIcon,
    title: 'Building',
    description: 'New builds from foundation to handover — residential, commercial, and industrial. Fixed-price contracts available.',
    detail: 'Residential to industrial',
  },
]

const TESTIMONIALS = [
  {
    text: 'We had a burst geyser at 10 pm on a Sunday. Thabo from Now & Always arrived within the hour and had the replacement installed by morning. Fair price, solid work.',
    author: 'Thabo M.',
    role: 'Homeowner — Newcastle',
  },
  {
    text: 'They renovated our 240 m² office space in four weeks, exactly as quoted. The site was clean every evening and the team communicated daily on progress.',
    author: 'Sarah K.',
    role: 'Business Owner — Johannesburg',
  },
  {
    text: 'After three failed contractors, Now & Always rewired our entire block of flats — 12 units — on schedule and on budget. Proper COC paperwork, no shortcuts.',
    author: 'David R.',
    role: 'Property Manager — Durban',
  },
]

const GALLERY_IMAGES = [
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.21.jpeg',
    alt: 'Foundation and trench work for a residential development in Newcastle',
    category: 'Building',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.24.jpeg',
    alt: 'Completed bathroom renovation with new fixtures and tiling',
    category: 'Renovations',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.26.jpeg',
    alt: 'Commercial plumbing installation with SABS-standard piping',
    category: 'Plumbing',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.28.jpeg',
    alt: 'Distribution board and wiring for a multi-unit residential block',
    category: 'Electrical',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.29.jpeg',
    alt: 'Wall construction and brickwork on a new-build project',
    category: 'Building',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.31.jpeg',
    alt: 'Interior finishing — tiling and trim detail on a renovation',
    category: 'Renovations',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.32.jpeg',
    alt: 'Steel framework erection for a commercial structure',
    category: 'Building',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.35.jpeg',
    alt: 'Full interior remodel from design consultation to handover',
    category: 'Renovations',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.44.jpeg',
    alt: 'Site clearance and earthworks before foundation pouring',
    category: 'Building',
  },
]

const FEATURED_IMAGES = GALLERY_IMAGES.slice(0, 6)

const TRUST_MARKS = [
  { icon: Shield, label: 'Registered company', value: '2021/438875/07' },
  { icon: Clock, label: 'In business since', value: '2021' },
  { icon: MapPin, label: 'Based in', value: 'Newcastle, KZN' },
]

/* ─────────── COMPONENTS ─────────── */

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Now & Always Construction — Home">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-md flex items-center justify-center">
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
              href="tel:0670318635"
              className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2.5 rounded-md transition-colors duration-200 min-h-[44px]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              067 031 8635
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/8" role="dialog" aria-label="Mobile navigation">
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
              href="tel:0670318635"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-[14px] font-semibold px-5 py-3 rounded-md mt-1 min-h-[44px]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              067 031 8635
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-5">
          Now and Always (Pty) Ltd
        </p>
        <h1 className="text-[2rem] sm:text-5xl md:text-[3.4rem] lg:text-6xl font-extrabold text-white uppercase leading-[1.1] max-w-4xl tracking-tight">
          Construction &amp;<br className="hidden sm:block" /> Maintenance You Can Rely On
        </h1>
        <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-xl leading-[1.6]">
          Building, renovations, plumbing, and electrical work across Newcastle and greater South Africa. Registered, insured, and on schedule.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
          >
            Get a free quote
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="tel:0670318635"
            className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/8 active:bg-white/12 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call us
          </a>
          <a
            href="https://wa.me/27670318635"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/8 active:bg-white/12 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        {/* Trust marks */}
        <div className="mt-12 flex flex-wrap gap-6 sm:gap-8">
          {TRUST_MARKS.map((mark) => (
            <div key={mark.label} className="flex items-center gap-2.5">
              <mark.icon className="w-4 h-4 text-blue-400/70" aria-hidden="true" />
              <div>
                <p className="text-white text-sm font-medium leading-none">{mark.value}</p>
                <p className="text-gray-500 text-[11px] mt-0.5">{mark.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="bg-[#0a0a0b] py-20 sm:py-28" aria-label="Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-14">
          <div className="max-w-lg">
            <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
              What we do
            </p>
            <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white uppercase leading-[1.1] tracking-tight">
              Our services
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors duration-200"
          >
            View past projects
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Bento-style grid: 2 wide + 2 narrow on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SERVICES.map((service, i) => (
            <a
              key={service.title}
              href="#contact"
              className={`group bg-[#111113] hover:bg-[#161618] border border-white/5 hover:border-blue-500/20 rounded-lg p-5 sm:p-6 transition-all duration-200 flex flex-col ${
                i === 0 ? 'sm:col-span-2 sm:row-span-2 sm:p-8' : ''
              }`}
            >
              <div className={`${i === 0 ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-11 h-11 sm:w-12 sm:h-12'} bg-blue-600/8 group-hover:bg-blue-600/15 rounded-lg flex items-center justify-center mb-4 transition-colors duration-200`}>
                <service.icon className={`${i === 0 ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5 sm:w-6 sm:h-6'} text-blue-400`} aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg uppercase tracking-wide mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-[1.6] mb-3 flex-1">
                {service.description}
              </p>
              <span className="text-gray-600 text-[11px] uppercase tracking-wider font-medium">
                {service.detail}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProjectsSection() {
  const categoryIcon = (cat: string) => {
    switch (cat) {
      case 'Building': return Building2
      case 'Renovations': return Paintbrush
      case 'Plumbing': return Droplets
      case 'Electrical': return Zap
      default: return HardHat
    }
  }

  return (
    <section id="projects" className="bg-[#0a0a0b] py-20 sm:py-28 border-t border-white/5" aria-label="Featured projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-14">
          <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            Recent work
          </p>
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white uppercase leading-[1.1] tracking-tight">
            Featured projects
          </h2>
          <p className="mt-3 text-gray-400 text-base max-w-lg leading-[1.6]">
            A selection from our portfolio. View the full gallery for all completed projects.
          </p>
        </div>

        {/* Bento-style featured grid: hero image + smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[220px]">
          {FEATURED_IMAGES.map((image, i) => {
            const Icon = categoryIcon(image.category)
            const isLarge = i === 0
            return (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-lg cursor-pointer ${isLarge ? 'sm:row-span-2' : ''}`}
                style={isLarge ? {} : {}}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                  width={isLarge ? 800 : 400}
                  height={isLarge ? 600 : 300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="w-3 h-3 text-blue-400" aria-hidden="true" />
                    <span className="text-blue-300 text-[10px] font-semibold uppercase tracking-[0.15em]">
                      {image.category}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium leading-snug">
                    {image.alt}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-md transition-colors duration-200 text-sm min-h-[44px]"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            View full gallery
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1))

  return (
    <section id="about" className="bg-[#0a0a0b] py-20 sm:py-28 border-t border-white/5" aria-label="Client testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            Client feedback
          </p>
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white uppercase leading-[1.1] tracking-tight">
            What our clients say
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="bg-[#111113] border border-white/5 rounded-lg p-6 sm:p-10">
            <Quote className="w-8 h-8 text-blue-400/20 mb-5" aria-hidden="true" />
            <blockquote className="text-white text-base sm:text-lg leading-[1.6] mb-6 min-h-[80px]">
              &ldquo;{TESTIMONIALS[current].text}&rdquo;
            </blockquote>
            <div>
              <p className="text-white font-semibold text-sm">{TESTIMONIALS[current].author}</p>
              <p className="text-gray-500 text-sm">{TESTIMONIALS[current].role}</p>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-12 w-10 h-10 sm:w-11 sm:h-11 bg-[#111113] hover:bg-blue-600/15 border border-white/8 rounded-full flex items-center justify-center transition-colors duration-200 min-w-[44px] min-h-[44px]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-12 w-10 h-10 sm:w-11 sm:h-11 bg-[#111113] hover:bg-blue-600/15 border border-white/8 rounded-full flex items-center justify-center transition-colors duration-200 min-w-[44px] min-h-[44px]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="flex justify-center gap-2 mt-7" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  i === current ? 'text-blue-400' : 'text-white/20 hover:text-white/40'
                }`}
                role="tab"
                aria-selected={i === current}
                aria-label={`Testimonial ${i + 1}`}
              >
                <span className={`block w-2 h-2 rounded-full ${i === current ? 'bg-blue-400' : 'bg-current'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-blue-950/15 to-[#0a0a0b]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white uppercase leading-[1.1] tracking-tight mb-4">
          Ready to start?
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-lg mx-auto mb-8 leading-[1.6]">
          Call us for a free on-site assessment and written quotation. No obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-md transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
          >
            Get a free quote
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="tel:0670318635"
            className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/12 active:bg-white/16 text-white font-semibold px-7 py-3.5 rounded-md transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            067 031 8635
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#080809] border-t border-white/5 pt-14 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-base" aria-hidden="true">N</span>
              </div>
              <div className="leading-none">
                <div className="text-white font-bold text-sm tracking-wide">NOW &amp; ALWAYS</div>
                <div className="text-gray-600 text-[10px] tracking-[0.2em] uppercase">(Pty) Ltd</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-[1.6] mb-2 max-w-xs">
              Construction and maintenance services. Newcastle, KwaZulu-Natal — working nationwide across South Africa.
            </p>
            <p className="text-gray-600 text-xs">Reg: 2021/438875/07</p>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
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
                <a href="tel:0670318635" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
                  067 031 8635
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27670318635"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:projects@nowandalways.co.za" className="text-gray-500 hover:text-white text-sm transition-colors duration-200 break-all">
                  projects@nowandalways.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Now &amp; Always (PTY) LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-600 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────── PAGE ─────────── */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <ServicesSection />
        <FeaturedProjectsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
