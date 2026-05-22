'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import {
  Phone,
  ArrowRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Linkedin,
  Instagram,
  Menu,
  X,
  XIcon,
  ZoomIn,
  Eye,
  Building2,
  Paintbrush,
  Droplets,
  Zap,
  HardHat,
  Grid3X3,
  LayoutGrid,
  Images,
  Shield,
  Clock,
  MapPin,
} from 'lucide-react'

/* ─────────── DATA ─────────── */

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/#contact' },
]

const GALLERY_IMAGES = [
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.21.jpeg',
    alt: 'Foundation and trench work for a residential development in Newcastle',
    category: 'Building',
    description: 'Foundation and structural work for a new residential development. Precise engineering and quality materials throughout the build process.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.24.jpeg',
    alt: 'Completed bathroom renovation with new fixtures and tiling',
    category: 'Renovations',
    description: 'Full bathroom renovation including plumbing reroute, waterproofing, tiling, and fixture installation. Completed in 10 working days.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.26.jpeg',
    alt: 'Commercial plumbing installation with SABS-standard piping',
    category: 'Plumbing',
    description: 'Full plumbing installation for a commercial property — water supply lines, drainage, and sanitary ware built to SABS standards.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.28.jpeg',
    alt: 'Distribution board and wiring for a multi-unit residential block',
    category: 'Electrical',
    description: 'Certified electrical installation with compliant wiring, distribution boards, and safety switches for a 12-unit residential block.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.29.jpeg',
    alt: 'Wall construction and brickwork on a new-build project',
    category: 'Building',
    description: 'Wall construction and brickwork on a new-build. All work inspected at each stage for structural integrity.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.31.jpeg',
    alt: 'Interior finishing — tiling and trim detail on a renovation',
    category: 'Renovations',
    description: 'Finishing work including tiling, skirting, and surface preparation. Every detail checked before handover.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.32.jpeg',
    alt: 'Steel framework erection for a commercial structure',
    category: 'Building',
    description: 'Commercial-scale steel framework for a retail structure. On schedule and within the agreed budget.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.35.jpeg',
    alt: 'Full interior remodel from design consultation to handover',
    category: 'Renovations',
    description: 'Interior remodel covering design consultation, demolition, reconstruction, and final walkthrough with the client.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.44.jpeg',
    alt: 'Site clearance and earthworks before foundation pouring',
    category: 'Building',
    description: 'Site preparation including excavation, grading, and compaction before foundation work begins.',
  },
]

const GALLERY_CATEGORIES = ['All', 'Building', 'Renovations', 'Plumbing', 'Electrical']

type GridLayout = 'masonry' | 'grid' | 'fullwidth'

const STATS = [
  { value: '50+', label: 'Projects completed' },
  { value: '2021', label: 'Founded' },
  { value: '100%', label: 'Certs & compliance' },
  { value: ' Nationwide', label: 'Coverage' },
]

/* ─────────── HEADER ─────────── */

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
                className={`text-[13px] tracking-wide font-medium transition-colors duration-200 ${
                  link.label === 'Gallery' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
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
                className={`text-[15px] tracking-wide font-medium ${
                  link.label === 'Gallery' ? 'text-blue-400' : 'text-gray-300'
                }`}
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

/* ─────────── LIGHTBOX ─────────── */

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof GALLERY_IMAGES
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/8 hover:bg-white/16 active:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 z-10 min-w-[44px] min-h-[44px]"
        aria-label="Close lightbox"
      >
        <XIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/8 hover:bg-blue-600/20 rounded-full flex items-center justify-center transition-colors duration-200 z-10 min-w-[44px] min-h-[44px]"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
      </button>

      <div
        className="max-w-[90vw] max-h-[80vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/8 hover:bg-blue-600/20 rounded-full flex items-center justify-center transition-colors duration-200 z-10 min-w-[44px] min-h-[44px]"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-16 pb-6 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-2.5 py-0.5 bg-blue-600/15 text-blue-400 text-[11px] font-semibold rounded-full uppercase tracking-[0.15em] mb-2.5">
            {images[currentIndex].category}
          </span>
          <p className="text-white text-sm sm:text-base font-medium mb-1.5">{images[currentIndex].alt}</p>
          <p className="text-gray-400 text-sm leading-[1.6] max-w-xl">{images[currentIndex].description}</p>
          <p className="text-gray-600 text-xs mt-3">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────── GALLERY BANNER ─────────── */

function GalleryBanner() {
  return (
    <section className="relative pt-20 sm:pt-24 pb-14 sm:pb-18 overflow-hidden" aria-label="Gallery page header">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-[#0a0a0b] to-[#0a0a0b]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M20 20h1v1h-1z\'/%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm mb-7" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors duration-200">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-700" aria-hidden="true" />
          <span className="text-blue-400 font-medium" aria-current="page">Gallery</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2.5">
              Our portfolio
            </p>
            <h1 className="text-[2rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-white uppercase leading-[1.05] tracking-tight">
              Project gallery
            </h1>
            <p className="mt-3 text-gray-400 text-base max-w-lg leading-[1.6]">
              Completed projects across building, renovations, plumbing, and electrical work. Click any image for details.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-200 text-sm self-start lg:self-auto min-h-[44px]"
          >
            Start your project
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────── GALLERY CONTENT ─────────── */

function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [layout, setLayout] = useState<GridLayout>('masonry')

  const filteredImages =
    activeCategory === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory)

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === 0 ? filteredImages.length - 1 : prev - 1) : null
    )
  }, [filteredImages.length])

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === filteredImages.length - 1 ? 0 : prev + 1) : null
    )
  }, [filteredImages.length])

  const categoryIcon = (cat: string) => {
    switch (cat) {
      case 'Building': return Building2
      case 'Renovations': return Paintbrush
      case 'Plumbing': return Droplets
      case 'Electrical': return Zap
      default: return HardHat
    }
  }

  const layoutConfig: { key: GridLayout; icon: typeof LayoutGrid; label: string }[] = [
    { key: 'masonry', icon: LayoutGrid, label: 'Masonry' },
    { key: 'grid', icon: Grid3X3, label: 'Grid' },
    { key: 'fullwidth', icon: Images, label: 'Full width' },
  ]

  return (
    <section className="bg-[#0a0a0b] pb-20 sm:pb-28" aria-label="Project gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {GALLERY_CATEGORIES.map((cat) => {
              const Icon = categoryIcon(cat)
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 min-h-[44px] ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#111113] text-gray-500 border border-white/5 hover:border-blue-500/20 hover:text-white'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {cat}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-0.5 bg-[#111113] border border-white/5 rounded-md p-0.5" role="radiogroup" aria-label="Gallery layout">
            {layoutConfig.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setLayout(key)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-colors duration-200 min-h-[44px] ${
                  layout === key
                    ? 'bg-blue-600/15 text-blue-400'
                    : 'text-gray-600 hover:text-gray-400'
                }`}
                role="radio"
                aria-checked={layout === key}
                aria-label={`${label} layout`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-5">
          Showing <span className="text-white font-medium">{filteredImages.length}</span> {filteredImages.length === 1 ? 'project' : 'projects'}
          {activeCategory !== 'All' && (
            <> in <span className="text-blue-400 font-medium">{activeCategory}</span></>
          )}
        </p>

        {/* Masonry */}
        {layout === 'masonry' && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.src}
                className="group relative break-inside-avoid overflow-hidden rounded-lg w-full text-left cursor-pointer"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 sm:p-5">
                  <span className="inline-block self-start px-2.5 py-0.5 bg-blue-600/20 backdrop-blur-sm text-blue-300 text-[10px] font-semibold rounded-full uppercase tracking-[0.15em] mb-2">
                    {image.category}
                  </span>
                  <p className="text-white text-sm font-medium leading-snug">
                    {image.alt}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-[1.5]">{image.description}</p>
                </div>
                <div className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/8 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {layout === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.src}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] text-left cursor-pointer"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 sm:p-5">
                  <span className="inline-block self-start px-2.5 py-0.5 bg-blue-600/20 backdrop-blur-sm text-blue-300 text-[10px] font-semibold rounded-full uppercase tracking-[0.15em] mb-2">
                    {image.category}
                  </span>
                  <p className="text-white text-sm font-medium leading-snug">
                    {image.alt}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-[1.5]">{image.description}</p>
                </div>
                <div className="absolute top-2.5 right-2.5 w-8 h-8 bg-white/8 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Full width */}
        {layout === 'fullwidth' && (
          <div className="space-y-3 sm:space-y-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.src}
                className="group relative overflow-hidden rounded-lg w-full text-left cursor-pointer"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View: ${image.alt}`}
              >
                <div className="aspect-[21/9]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    width={1200}
                    height={514}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex items-center">
                  <div className="p-5 sm:p-8 lg:p-12 max-w-md">
                    <span className="inline-block px-2.5 py-0.5 bg-blue-600/20 backdrop-blur-sm text-blue-300 text-[10px] font-semibold rounded-full uppercase tracking-[0.15em] mb-3">
                      {image.category}
                    </span>
                    <p className="text-white text-base sm:text-lg lg:text-xl font-bold leading-snug mb-1.5">
                      {image.alt}
                    </p>
                    <p className="text-gray-400 text-sm leading-[1.6]">{image.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-14 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111113] border border-white/5 rounded-lg p-4 sm:p-5 text-center"
            >
              <p className="text-blue-400 text-xl sm:text-2xl lg:text-3xl font-extrabold mb-0.5">
                {stat.value}
              </p>
              <p className="text-gray-500 text-[11px] sm:text-xs uppercase tracking-[0.15em] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 sm:mt-20 bg-[#111113] border border-white/5 rounded-lg p-6 sm:p-10 text-center">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight mb-3">
            Interested in working with us?
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-6 leading-[1.6]">
            Get in touch for a free on-site assessment and written quotation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-200 text-sm min-h-[44px]"
            >
              Get a free quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:0670318635"
              className="inline-flex items-center gap-2 border border-white/15 hover:bg-white/8 active:bg-white/12 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-200 text-sm min-h-[44px]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call us
            </a>
            <a
              href="https://wa.me/27670318635"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 hover:bg-white/8 active:bg-white/12 text-white font-semibold px-5 py-3 rounded-md transition-colors duration-200 text-sm min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  )
}

/* ─────────── FOOTER ─────────── */

function Footer() {
  return (
    <footer className="bg-[#080809] border-t border-white/5 pt-14 pb-8" role="contentinfo">
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
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-3">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/#about' },
                { label: 'Services', href: '/#services' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/#contact' },
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
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-3">Services</h4>
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
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-3">Get in touch</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:0670318635" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
                  067 031 8635
                </a>
              </li>
              <li>
                <a href="https://wa.me/27670318635" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm transition-colors duration-200">
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

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <GalleryBanner />
        <GalleryContent />
      </main>
      <Footer />
    </div>
  )
}
