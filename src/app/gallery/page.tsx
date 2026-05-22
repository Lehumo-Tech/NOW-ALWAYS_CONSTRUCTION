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
  ArrowLeft,
  Grid3X3,
  LayoutGrid,
  Images,
} from 'lucide-react'

/* ─────────── DATA ─────────── */

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/#about' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'CONTACT', href: '/#contact' },
]

const GALLERY_IMAGES = [
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.21.jpeg',
    alt: 'Construction site foundation work in progress',
    category: 'Building',
    description: 'Foundation and structural work for a new residential development in Newcastle. Our team ensured precise engineering and quality materials throughout.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.24.jpeg',
    alt: 'Completed renovation project showcase',
    category: 'Renovations',
    description: 'Complete interior renovation transforming an outdated space into a modern living environment with premium finishes.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.26.jpeg',
    alt: 'Professional plumbing installation',
    category: 'Plumbing',
    description: 'Full plumbing installation for a commercial property, including water supply lines and drainage systems built to SABS standards.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.28.jpeg',
    alt: 'Electrical wiring and installation work',
    category: 'Electrical',
    description: 'Certified electrical installation with compliant wiring, distribution boards, and safety switches for a multi-unit development.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.29.jpeg',
    alt: 'Building construction progress',
    category: 'Building',
    description: 'Progress on a new-build project showing wall construction and structural integrity at every stage.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.31.jpeg',
    alt: 'Renovation detailing and finishing',
    category: 'Renovations',
    description: 'Attention to detail in finishing work — tiling, trim, and surface preparation delivering a flawless result.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.32.jpeg',
    alt: 'Commercial construction project',
    category: 'Building',
    description: 'Large-scale commercial build demonstrating our capacity to handle complex projects on schedule and within budget.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.35.jpeg',
    alt: 'Interior renovation and remodeling',
    category: 'Renovations',
    description: 'Full interior remodel from design consultation to final walkthrough — revitalizing spaces with expert craftsmanship.',
  },
  {
    src: '/gallery/WhatsApp Image 2026-05-22 at 09.26.44.jpeg',
    alt: 'Site preparation and groundwork',
    category: 'Building',
    description: 'Professional site preparation including excavation, grading, and foundation laying for a new construction project.',
  },
]

const GALLERY_CATEGORIES = ['All', 'Building', 'Renovations', 'Plumbing', 'Electrical']

type GridLayout = 'masonry' | 'grid' | 'fullwidth'

/* ─────────── COMPONENTS ─────────── */

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">N</span>
            </div>
            <div className="leading-tight">
              <div className="text-white font-bold text-sm sm:text-base tracking-wide">NOW &amp; ALWAYS</div>
              <div className="text-gray-400 text-[10px] sm:text-xs tracking-widest">CONSTRUCTION</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm tracking-wide font-medium transition-colors ${
                  link.label === 'GALLERY' ? 'text-blue-400' : i === 0 ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

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

      {mobileOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-wide font-medium ${
                  link.label === 'GALLERY' ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
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
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
        aria-label="Close lightbox"
      >
        <XIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-blue-600/30 rounded-full flex items-center justify-center transition-colors z-10"
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
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white/10 hover:bg-blue-600/30 rounded-full flex items-center justify-center transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-20 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            {images[currentIndex].category}
          </span>
          <p className="text-white text-base sm:text-lg font-medium mb-2">{images[currentIndex].alt}</p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">{images[currentIndex].description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-500 text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────── GALLERY PAGE BANNER ─────────── */

function GalleryBanner() {
  return (
    <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-[#0a0a0b] to-[#0a0a0b]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <span className="text-blue-400 font-medium">Gallery</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
              OUR PORTFOLIO
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-tight">
              PROJECT<br className="hidden sm:block" /> GALLERY
            </h1>
            <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Explore our completed projects across construction, renovations, plumbing, and electrical work. Quality craftsmanship you can trust.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors text-sm sm:text-base self-start lg:self-auto"
          >
            START YOUR PROJECT
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────── MAIN GALLERY ─────────── */

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

  const layoutIcon = (l: GridLayout) => {
    switch (l) {
      case 'masonry': return LayoutGrid
      case 'grid': return Grid3X3
      case 'fullwidth': return Images
    }
  }

  const layoutLabel = (l: GridLayout) => {
    switch (l) {
      case 'masonry': return 'Masonry'
      case 'grid': return 'Grid'
      case 'fullwidth': return 'Full Width'
    }
  }

  return (
    <section className="bg-[#0a0a0b] pb-20 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {GALLERY_CATEGORIES.map((cat) => {
              const Icon = categoryIcon(cat)
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-[#111113] text-gray-400 border border-white/5 hover:border-blue-500/30 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Layout toggle */}
          <div className="flex items-center gap-1 bg-[#111113] border border-white/5 rounded-lg p-1">
            {(['masonry', 'grid', 'fullwidth'] as GridLayout[]).map((l) => {
              const Icon = layoutIcon(l)
              return (
                <button
                  key={l}
                  onClick={() => setLayout(l)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    layout === l
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                  aria-label={`${layoutLabel(l)} layout`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{layoutLabel(l)}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Image count */}
        <p className="text-gray-500 text-sm mb-6">
          Showing <span className="text-white font-medium">{filteredImages.length}</span> {filteredImages.length === 1 ? 'project' : 'projects'}
          {activeCategory !== 'All' && (
            <> in <span className="text-blue-400 font-medium">{activeCategory}</span></>
          )}
        </p>

        {/* Masonry Layout */}
        {layout === 'masonry' && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
            {filteredImages.map((image, index) => (
              <div
                key={image.src}
                className="group relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                  <span className="inline-block self-start px-3 py-1 bg-blue-600/30 backdrop-blur-sm text-blue-300 text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wider mb-2 sm:mb-3">
                    {image.category}
                  </span>
                  <p className="text-white text-sm sm:text-base font-medium leading-snug">
                    {image.alt}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 line-clamp-2">{image.description}</p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-3">
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    <span className="text-blue-400 text-xs sm:text-sm font-semibold">View Project</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Layout */}
        {layout === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredImages.map((image, index) => (
              <div
                key={image.src}
                className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3]"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                  <span className="inline-block self-start px-3 py-1 bg-blue-600/30 backdrop-blur-sm text-blue-300 text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wider mb-2 sm:mb-3">
                    {image.category}
                  </span>
                  <p className="text-white text-sm sm:text-base font-medium leading-snug">
                    {image.alt}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1 line-clamp-2">{image.description}</p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-3">
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                    <span className="text-blue-400 text-xs sm:text-sm font-semibold">View Project</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full Width Layout */}
        {layout === 'fullwidth' && (
          <div className="space-y-4 sm:space-y-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.src}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="aspect-[21/9]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex items-center">
                  <div className="p-6 sm:p-10 lg:p-14 max-w-lg">
                    <span className="inline-block px-3 py-1 bg-blue-600/30 backdrop-blur-sm text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider mb-3 sm:mb-4">
                      {image.category}
                    </span>
                    <p className="text-white text-lg sm:text-xl lg:text-2xl font-bold leading-snug mb-2">
                      {image.alt}
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{image.description}</p>
                    <div className="flex items-center gap-2 mt-3 sm:mt-4">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <span className="text-blue-400 text-sm sm:text-base font-semibold">View Full Size</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '50+', label: 'Projects Completed' },
            { value: '5+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
            { value: 'Nationwide', label: 'Service Coverage' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111113] border border-white/5 rounded-xl p-4 sm:p-6 text-center"
            >
              <p className="text-blue-400 text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-r from-blue-950/40 via-[#111113] to-blue-950/40 border border-white/5 rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase mb-4">
            Like What You See?
          </h3>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Let us bring the same quality and dedication to your project. Get in touch for a free consultation and quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors text-sm sm:text-base"
            >
              GET A FREE QUOTE
              <ArrowRight className="w-4 h-4" />
            </Link>
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
      </div>

      {/* Lightbox */}
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
    <footer className="bg-[#080809] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
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

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">NAVIGATION</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/#about' },
                { label: 'Services', href: '/#services' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">SERVICES</h4>
            <ul className="space-y-3">
              {['Renovations', 'Plumbing', 'Electrical', 'Welding', 'Building'].map((link) => (
                <li key={link}>
                  <Link href="/#services" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">GET IN TOUCH</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:0670318635" className="text-gray-400 hover:text-white text-sm transition-colors">
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
                <a href="mailto:projects@nowandalways.co.za" className="text-gray-400 hover:text-white text-sm transition-colors break-all">
                  projects@nowandalways.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Now &amp; Always (PTY) LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
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
      <main className="flex-1">
        <GalleryBanner />
        <GalleryContent />
      </main>
      <Footer />
    </div>
  )
}
