'use client'

import { useState } from 'react'
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
} from 'lucide-react'

/* ─────────── DATA ─────────── */

const NAV_LINKS = ['HOME', 'ABOUT', 'SERVICES', 'PROJECTS', 'CONTACT']

const SERVICES = [
  {
    icon: Hammer,
    title: 'RENOVATIONS',
    description: 'Transform your space with expert renovation work.',
  },
  {
    icon: Wrench,
    title: 'PLUMBING',
    description: 'Professional plumbing installations and repairs.',
  },
  {
    icon: Zap,
    title: 'ELECTRICAL WORK',
    description: 'Safe, certified electrical solutions.',
  },
  {
    icon: HomeIcon,
    title: 'BUILDING',
    description: 'New builds from foundation to finish.',
  },
]

const TESTIMONIALS = [
  {
    text: 'Exceptional plumbing work. They responded quickly to our emergency and the quality of the repair was outstanding. Highly recommend Now & Always for any construction needs.',
    author: 'Thabo M.',
    role: 'Homeowner, Newcastle',
  },
  {
    text: 'Professional and reliable. The renovation of our office space was completed on time and within budget. The team was courteous and the results exceeded our expectations.',
    author: 'Sarah K.',
    role: 'Business Owner, Johannesburg',
  },
  {
    text: 'From the initial quote to the final inspection, the entire process was seamless. Their electrical team is knowledgeable and safety-conscious. Will definitely use them again.',
    author: 'David R.',
    role: 'Property Manager, Durban',
  },
]

/* ─────────── COMPONENTS ─────────── */

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">N</span>
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-sm sm:text-base tracking-wide">NOW &amp; ALWAYS</div>
              <div className="text-gray-400 text-[10px] sm:text-xs tracking-widest">CONSTRUCTION</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`text-sm tracking-wide font-medium transition-colors ${
                  i === 0 ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0670318635"
              className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
            >
              <Phone className="w-4 h-4" />
              CALL NOW
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-wide font-medium ${
                  i === 0 ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:0670318635"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded mt-2"
            >
              <Phone className="w-4 h-4" />
              CALL NOW
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
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <p className="text-blue-400 text-sm sm:text-base font-semibold tracking-widest uppercase mb-4">
          NOW AND ALWAYS (PTY) LTD
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-tight max-w-4xl">
          COMPREHENSIVE CONSTRUCTION &amp; MAINTENANCE SOLUTIONS
        </h1>
        <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          High-quality services for projects of any scale, nationwide. Trusted by
          clients across South Africa for over 5 years.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors text-sm sm:text-base"
          >
            GET A FREE QUOTE
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="tel:0670318635"
            className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded transition-colors text-sm sm:text-base"
          >
            <Phone className="w-4 h-4" />
            CALL US
          </a>
          <a
            href="https://wa.me/27670318635"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded transition-colors text-sm sm:text-base"
          >
            <MessageCircle className="w-4 h-4" />
            WHATSAPP
          </a>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="bg-[#0a0a0b] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
              WHAT WE DO
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase">
              OUR SERVICES
            </h2>
          </div>
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm tracking-wide transition-colors"
          >
            VIEW ALL SERVICES
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <a
              key={service.title}
              href="#"
              className="group bg-[#111113] hover:bg-[#18181a] border border-white/5 hover:border-blue-500/30 rounded-xl p-6 sm:p-8 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/10 group-hover:bg-blue-600/20 rounded-lg flex items-center justify-center mb-5 transition-colors">
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg sm:text-xl uppercase mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1 text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                LEARN MORE
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
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
    <section id="about" className="bg-[#0a0a0b] py-20 sm:py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase">
            WHAT OUR CLIENTS SAY
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-[#111113] border border-white/5 rounded-xl p-8 sm:p-12">
            <Quote className="w-10 h-10 text-blue-400/30 mb-6" />
            <p className="text-white text-lg sm:text-xl leading-relaxed mb-8 min-h-[100px]">
              &ldquo;{TESTIMONIALS[current].text}&rdquo;
            </p>
            <div>
              <p className="text-white font-semibold">{TESTIMONIALS[current].author}</p>
              <p className="text-gray-400 text-sm">{TESTIMONIALS[current].role}</p>
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-14 w-10 h-10 sm:w-12 sm:h-12 bg-[#111113] hover:bg-blue-600/20 border border-white/10 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-14 w-10 h-10 sm:w-12 sm:h-12 bg-[#111113] hover:bg-blue-600/20 border border-white/10 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? 'bg-blue-400' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section id="projects" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-blue-950/20 to-[#0a0a0b]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase mb-6">
          READY TO START YOUR PROJECT?
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Get a free quote today and let us bring your vision to life. No project
          is too big or too small.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded transition-colors text-sm sm:text-base"
          >
            GET A FREE QUOTE
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="tel:0670318635"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3.5 rounded transition-colors text-sm sm:text-base"
          >
            <Phone className="w-4 h-4" />
            067 031 8635
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#080809] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold text-sm tracking-wide">NOW &amp; ALWAYS</div>
                <div className="text-gray-500 text-xs tracking-widest">(PTY) LTD</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              Comprehensive construction &amp; maintenance solutions. Serving
              Newcastle &amp; nationwide across South Africa.
            </p>
            <p className="text-gray-500 text-xs">Reg: 2021/438875/07</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Projects', 'Contact'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s/g, '')}`}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
              SERVICES
            </h4>
            <ul className="space-y-3">
              {['Renovations', 'Plumbing', 'Electrical', 'Welding', 'Building'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">
              GET IN TOUCH
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0670318635"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  067 031 8635
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27670318635"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:projects@nowandalways.co.za"
                  className="text-gray-400 hover:text-white text-sm transition-colors break-all"
                >
                  projects@nowandalways.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Now &amp; Always (PTY) LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
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
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
