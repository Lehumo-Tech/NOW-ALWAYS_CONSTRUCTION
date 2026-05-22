'use client'

import { useState, useEffect } from 'react'
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
  FileText,
  ExternalLink,
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

const TRUSTED_CLIENTS = [
  { name: 'Mediclinic', logo: '/logos/mediclinic.png' },
  { name: 'Bosch Car Service', logo: '/logos/bosch-car-service.svg' },
  { name: 'Discovery Insurance', logo: '/logos/discovery.svg' },
  { name: 'Dr Els Dentistry', logo: '/logos/dr-els-dentistry.jpg' },
  { name: 'Hope High School', logo: '/logos/hope-high-school.png' },
  { name: 'Majuba TVET College', logo: '/logos/majuba-college.jpg' },
  { name: 'NL Cars', logo: '/logos/nl-cars.svg' },
]

const TESTIMONIALS = [
  {
    text: 'Now & Always handled the full plumbing and electrical retrofit of our Newcastle facility. Their team worked around our operating hours so we never had to close a ward. Professional, quiet, and always on schedule — exactly what a hospital environment demands.',
    author: 'Hospital General Manager',
    authorName: 'Japie Greyling',
    company: 'Mediclinic',
    logo: '/logos/mediclinic.png',
    referenceLetter: '/reference-letter-mediclinic.pdf',
  },
  {
    text: 'We needed a complete workshop refit — new drainage, electrical upgrades for diagnostic equipment, and a fresh coat throughout. Now & Always quoted fairly, showed up when they said they would, and handed over a spotless workshop two days ahead of schedule.',
    author: 'Workshop Director',
    company: 'Bosch Car Service',
    logo: '/logos/bosch-car-service.svg',
  },
  {
    text: 'From boardroom renovations to backup-power installations across our Newcastle office, Now & Always has been our go-to contractor for three years running. Their paperwork is always in order and their quotes have never once crept beyond the agreed figure.',
    author: 'Regional Facilities Lead',
    company: 'Discovery Insurance',
    logo: '/logos/discovery.svg',
  },
  {
    text: 'The renovation of our dental suites had to meet very specific hygiene and airflow standards. Now & Always understood the requirements from day one, coordinated with our equipment suppliers, and delivered a space our patients feel comfortable in.',
    author: 'Practice Manager',
    company: 'Dr Els Dentistry',
    logo: '/logos/dr-els-dentistry.jpg',
  },
  {
    text: 'They built our new administrative block and refurbished two existing classrooms over the school holidays. The site was safe, clean, and ready for learners on the first day of term. We have already commissioned them for the next phase.',
    author: 'School Governing Body Chair',
    company: 'Hope High School',
    logo: '/logos/hope-high-school.png',
  },
  {
    text: 'Majuba College has multiple campuses, and Now & Always has handled maintenance, plumbing, and electrical upgrades across all of them. Their ability to scale without losing quality is why they remain on our approved vendor list year after year.',
    author: 'Campus Operations Manager',
    company: 'Majuba TVET College',
    logo: '/logos/majuba-college.jpg',
  },
  {
    text: 'Our showroom and workshop needed a full overhaul — flooring, lighting, plumbing, and signage. Now & Always managed every trade under one contract, which meant one point of contact and one invoice. That simplicity is worth a lot in our line of business.',
    author: 'Dealership Principal',
    company: 'NL Cars',
    logo: '/logos/nl-cars.svg',
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <p className="text-blue-400 text-[11px] sm:text-xs lg:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-5">
          Now and Always (Pty) Ltd
        </p>
        <h1 className="text-[1.85rem] sm:text-5xl md:text-[3.4rem] lg:text-6xl font-extrabold text-white uppercase leading-[1.1] max-w-4xl tracking-tight">
          Construction &amp;<br className="hidden sm:block" /> Maintenance You Can Rely On
        </h1>
        <p className="mt-5 sm:mt-6 text-gray-300 text-[15px] sm:text-lg max-w-xl leading-[1.6]">
          Building, renovations, plumbing, and electrical work across Newcastle and greater South Africa. Registered, insured, and on schedule.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-5 sm:px-6 py-3 rounded-md transition-colors duration-200 text-[13px] sm:text-base min-h-[44px]"
          >
            Get a free quote
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="tel:0670318635"
            className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/8 active:bg-white/12 text-white font-semibold px-5 sm:px-6 py-3 rounded-md transition-colors duration-200 text-[13px] sm:text-base min-h-[44px]"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call us
          </a>
          <a
            href="https://wa.me/27670318635"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/8 active:bg-white/12 text-white font-semibold px-5 sm:px-6 py-3 rounded-md transition-colors duration-200 text-[13px] sm:text-base min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            WhatsApp
          </a>
        </div>

        {/* Trust marks */}
        <div className="mt-8 sm:mt-12 flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
          {TRUST_MARKS.map((mark) => (
            <div key={mark.label} className="flex items-center gap-2">
              <mark.icon className="w-4 h-4 text-blue-400/70" aria-hidden="true" />
              <div>
                <p className="text-white text-[13px] sm:text-sm font-medium leading-none">{mark.value}</p>
                <p className="text-gray-500 text-[10px] sm:text-[11px] mt-0.5">{mark.label}</p>
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
    <section id="services" className="bg-[#0a0a0b] py-14 sm:py-20 lg:py-28" aria-label="Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-10 sm:mb-14">
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
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-[13px] sm:text-sm transition-colors duration-200"
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
              className={`group bg-[#111113] hover:bg-[#161618] border border-white/5 hover:border-blue-500/20 rounded-lg p-4 sm:p-5 lg:p-6 transition-all duration-200 flex flex-col ${
                i === 0 ? 'sm:col-span-2 sm:row-span-2 sm:p-6 lg:p-8' : ''
              }`}
            >
              <div className={`${i === 0 ? 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16' : 'w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12'} bg-blue-600/8 group-hover:bg-blue-600/15 rounded-lg flex items-center justify-center mb-3 sm:mb-4 transition-colors duration-200`}>
                <service.icon className={`${i === 0 ? 'w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8' : 'w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6'} text-blue-400`} aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold text-[15px] sm:text-base lg:text-lg uppercase tracking-wide mb-1.5 sm:mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400 text-[13px] sm:text-sm leading-[1.6] mb-2 sm:mb-3 flex-1">
                {service.description}
              </p>
              <span className="text-gray-600 text-[10px] sm:text-[11px] uppercase tracking-wider font-medium">
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
    <section id="projects" className="bg-[#0a0a0b] py-14 sm:py-20 lg:py-28 border-t border-white/5" aria-label="Featured projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14">
          <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            Recent work
          </p>
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white uppercase leading-[1.1] tracking-tight">
            Featured projects
          </h2>
          <p className="mt-2 sm:mt-3 text-gray-400 text-[14px] sm:text-base max-w-lg leading-[1.6]">
            A selection from our portfolio. View the full gallery for all completed projects.
          </p>
        </div>

        {/* Bento-style featured grid: hero image + smaller cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 auto-rows-[140px] sm:auto-rows-[200px] lg:auto-rows-[220px]">
          {FEATURED_IMAGES.map((image, i) => {
            const Icon = categoryIcon(image.category)
            const isLarge = i === 0
            return (
              <div
                key={image.src}
                className={`group relative overflow-hidden rounded-lg cursor-pointer ${isLarge ? 'col-span-2 sm:col-span-2 lg:col-span-1 row-span-2' : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                  width={isLarge ? 800 : 400}
                  height={isLarge ? 600 : 300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="w-3 h-3 text-blue-400" aria-hidden="true" />
                    <span className="text-blue-300 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em]">
                      {image.category}
                    </span>
                  </div>
                  <p className="text-white text-[11px] sm:text-sm font-medium leading-snug line-clamp-2">
                    {image.alt}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-md transition-colors duration-200 text-[13px] sm:text-sm min-h-[44px]"
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

function TrustedBySection() {
  return (
    <section className="bg-[#0a0a0b] py-12 sm:py-16 lg:py-20 border-t border-white/5" aria-label="Trusted by">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            Trusted by leading organisations
          </p>
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white uppercase leading-[1.1] tracking-tight">
            Companies that trust us
          </h2>
          <p className="mt-3 text-gray-400 text-[14px] sm:text-base max-w-lg mx-auto leading-[1.6]">
            From healthcare to education, automotive to insurance — our clients come back because we deliver on our word.
          </p>
        </div>

        {/* Mobile: horizontal scroll; Desktop: grid */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4 lg:gap-6 items-center min-w-[320px]">
            {TRUSTED_CLIENTS.map((client) => (
              <div
                key={client.name}
                className="group flex flex-col items-center justify-center bg-[#111113] border border-white/5 hover:border-blue-500/20 rounded-lg p-3 sm:p-4 lg:p-5 transition-all duration-200 aspect-square sm:aspect-auto sm:h-28"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-8 sm:max-h-10 lg:max-h-12 w-auto object-contain opacity-60 group-hover:opacity-90 transition-opacity duration-200"
                  loading="lazy"
                  width={120}
                  height={48}
                />
                <span className="text-gray-500 text-[9px] sm:text-[10px] lg:text-[11px] font-medium mt-1.5 sm:mt-2 tracking-wide uppercase text-center group-hover:text-gray-300 transition-colors duration-200 leading-tight">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [showRefLetter, setShowRefLetter] = useState(false)

  const prev = () => { setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1)); setShowRefLetter(false) }
  const next = () => { setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1)); setShowRefLetter(false) }

  const activeTestimonial = TESTIMONIALS[current]

  return (
    <section id="about" className="bg-[#0a0a0b] py-16 sm:py-20 lg:py-28 border-t border-white/5" aria-label="Client testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            Client feedback
          </p>
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white uppercase leading-[1.1] tracking-tight">
            What our clients say
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-[#111113] border border-white/5 rounded-lg p-5 sm:p-8 lg:p-10">
            {/* Company logo + quote */}
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
              <img
                src={activeTestimonial.logo}
                alt={`${activeTestimonial.company} logo`}
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain rounded-lg bg-white/5 p-1 sm:p-1.5 shrink-0"
                loading="lazy"
                width={56}
                height={56}
              />
              <div className="min-w-0">
                <p className="text-white font-bold text-sm sm:text-base">{activeTestimonial.company}</p>
                <p className="text-blue-400 text-xs sm:text-sm font-medium">
                  {activeTestimonial.authorName ? `${activeTestimonial.authorName}, ` : ''}{activeTestimonial.author}
                </p>
              </div>
              <Quote className="w-8 h-8 text-blue-400/15 ml-auto shrink-0 hidden sm:block" aria-hidden="true" />
            </div>

            <blockquote className="text-white text-[15px] sm:text-lg leading-[1.7]">
              &ldquo;{activeTestimonial.text}&rdquo;
            </blockquote>

            {/* Reference Letter for Mediclinic */}
            {activeTestimonial.referenceLetter && (
              <div className="mt-4 sm:mt-5">
                <button
                  onClick={() => setShowRefLetter(!showRefLetter)}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-semibold transition-colors duration-200 min-h-[44px]"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  {showRefLetter ? 'Hide reference letter' : 'View reference letter'}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showRefLetter ? 'rotate-90' : ''}`} aria-hidden="true" />
                </button>

                {showRefLetter && (
                  <div className="mt-3 sm:mt-4 bg-[#0d0d0e] border border-white/8 rounded-lg p-4 sm:p-6 text-sm leading-[1.7] text-gray-300">
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
                      <div className="w-7 h-7 bg-green-600/15 rounded flex items-center justify-center shrink-0">
                        <FileText className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs">Official Reference Letter</p>
                        <p className="text-gray-500 text-[10px]">Mediclinic Newcastle — 22 May 2026</p>
                      </div>
                      <a
                        href={activeTestimonial.referenceLetter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-[11px] font-semibold bg-blue-600/10 hover:bg-blue-600/15 px-3 py-1.5 rounded-md transition-colors duration-200 min-h-[44px]"
                      >
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        Open PDF
                      </a>
                    </div>
                    <p className="mb-3">To Whom It May Concern:</p>
                    <p className="mb-3">
                      It is my pleasure to provide a positive reference for Now and Always Construction, a building contracting company that has undertaken work at Mediclinic Newcastle.
                    </p>
                    <p className="mb-3">
                      During his engagement with our hospital, Now and Always Construction demonstrated a professional, reliable and solution-focused approach. The work was carried out with due regard for the standards expected within a healthcare environment, where safety, quality, neatness, communication and minimal disruption to hospital operations are essential.
                    </p>
                    <p className="mb-3">
                      Now and Always Construction employees were approachable, responsive and willing to engage constructively throughout the project. They showed a clear understanding of the importance of working within an operational hospital setting and displayed commitment to completing the required work in a responsible and professional manner.
                    </p>
                    <p className="mb-3">
                      We found Now and Always Construction to be dependable and committed to delivering a good standard of workmanship. Their conduct reflected integrity, accountability and pride in their work, and we appreciate the contribution made by Now and Always Construction at Mediclinic Newcastle.
                    </p>
                    <p className="mb-3">
                      Based on our experience, I am pleased to recommend Now and Always Construction for building and contracting work.
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <p className="text-white font-bold text-sm">Japie Greyling</p>
                      <p className="text-gray-400 text-xs">Hospital General Manager</p>
                      <p className="text-gray-500 text-[11px]">Mediclinic Newcastle</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-12 w-10 h-10 sm:w-11 sm:h-11 bg-[#111113] hover:bg-blue-600/15 border border-white/8 rounded-full flex items-center justify-center transition-colors duration-200 min-w-[44px] min-h-[44px]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-12 w-10 h-10 sm:w-11 sm:h-11 bg-[#111113] hover:bg-blue-600/15 border border-white/8 rounded-full flex items-center justify-center transition-colors duration-200 min-w-[44px] min-h-[44px]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Mobile: scrollable horizontal pills; Desktop: all visible */}
          <div className="mt-6 sm:mt-7 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible scrollbar-hide" role="tablist" aria-label="Testimonial navigation">
            <div className="flex gap-1 sm:gap-1.5 sm:flex-wrap sm:justify-center min-w-max sm:min-w-0">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setShowRefLetter(false) }}
                  className={`transition-all duration-200 min-h-[36px] sm:min-h-[28px] flex items-center justify-center rounded-full px-3 sm:px-2.5 py-1.5 sm:py-1 ${
                    i === current
                      ? 'bg-blue-600/15 text-blue-400'
                      : 'text-gray-600 hover:text-gray-400'
                  }`}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`${t.company} testimonial`}
                >
                  <span className="text-[11px] sm:text-[10px] lg:text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap">
                    {t.company}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative py-14 sm:py-20 lg:py-28 overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-blue-950/15 to-[#0a0a0b]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[1.75rem] sm:text-4xl lg:text-[2.75rem] font-extrabold text-white uppercase leading-[1.1] tracking-tight mb-3 sm:mb-4">
          Ready to start?
        </h2>
        <p className="text-gray-300 text-[14px] sm:text-base lg:text-lg max-w-lg mx-auto mb-6 sm:mb-8 leading-[1.6]">
          Call us for a free on-site assessment and written quotation. No obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-md transition-colors duration-200 text-[13px] sm:text-base min-h-[44px]"
          >
            Get a free quote
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="tel:0670318635"
            className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/12 active:bg-white/16 text-white font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-md transition-colors duration-200 text-[13px] sm:text-base min-h-[44px]"
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
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

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
            &copy; {year ?? 2026} Now &amp; Always (PTY) LTD. All rights reserved.
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
        <TrustedBySection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
