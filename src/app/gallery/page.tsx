'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import {
  Phone,
  ArrowRight,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  XIcon,
  ZoomIn,
  Building2,
  Paintbrush,
  Droplets,
  Zap,
  HardHat,
  Grid3X3,
  LayoutGrid,
  Images,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE } from '@/lib/config'

/* ─────────── DATA ─────────── */

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
  { value: '7+', label: 'Trusted clients' },
]

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
    <section className="relative pt-20 sm:pt-24 pb-10 sm:pb-14 lg:pb-18 overflow-hidden" aria-label="Gallery page header">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-[#0a0a0b] to-[#0a0a0b]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M20 20h1v1h-1z\'/%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm mb-5 sm:mb-7" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors duration-200">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-700" aria-hidden="true" />
          <span className="text-blue-400 font-medium" aria-current="page">Gallery</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-5">
          <div>
            <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2 sm:mb-2.5">
              Our portfolio
            </p>
            <h1 className="text-[1.85rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-white uppercase leading-[1.05] tracking-tight">
              Project gallery
            </h1>
            <p className="mt-2 sm:mt-3 text-gray-400 text-[14px] sm:text-base max-w-lg leading-[1.6]">
              Completed projects across building, renovations, plumbing, and electrical work. Click any image for details.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-5 sm:px-5 py-2.5 sm:py-3 rounded-md transition-colors duration-200 text-[13px] sm:text-sm self-start lg:self-auto min-h-[44px]"
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
    <section className="bg-[#0a0a0b] pb-14 sm:pb-20 lg:pb-28" aria-label="Project gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="flex flex-col gap-3 mb-5 sm:mb-8">
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap" role="tablist" aria-label="Filter by category">
              {GALLERY_CATEGORIES.map((cat) => {
                const Icon = categoryIcon(cat)
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 min-h-[40px] sm:min-h-[44px] ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#111113] text-gray-500 border border-white/5 hover:border-blue-500/20 hover:text-white'
                    }`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <p className="text-gray-600 text-[13px] sm:text-sm">
              <span className="text-white font-medium">{filteredImages.length}</span> {filteredImages.length === 1 ? 'project' : 'projects'}
              {activeCategory !== 'All' && (
                <> in <span className="text-blue-400 font-medium">{activeCategory}</span></>
              )}
            </p>
            <div className="flex items-center gap-0.5 bg-[#111113] border border-white/5 rounded-md p-0.5" role="radiogroup" aria-label="Gallery layout">
              {layoutConfig.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setLayout(key)}
                  className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded text-[11px] sm:text-xs font-medium transition-colors duration-200 min-h-[40px] sm:min-h-[44px] ${
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
        </div>

        {/* Masonry */}
        {layout === 'masonry' && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 sm:gap-3 lg:gap-4 space-y-2 sm:space-y-3 lg:space-y-4">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                  <span className="inline-block self-start px-2 py-0.5 bg-blue-600/20 backdrop-blur-sm text-blue-300 text-[9px] sm:text-[10px] font-semibold rounded-full uppercase tracking-[0.15em] mb-1.5 sm:mb-2">
                    {image.category}
                  </span>
                  <p className="text-white text-[11px] sm:text-sm font-medium leading-snug">
                    {image.alt}
                  </p>
                  <p className="text-gray-400 text-[10px] sm:text-xs mt-1 line-clamp-2 leading-[1.5]">{image.description}</p>
                </div>
                <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 bg-white/8 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {layout === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                  <span className="inline-block self-start px-2 py-0.5 bg-blue-600/20 backdrop-blur-sm text-blue-300 text-[9px] sm:text-[10px] font-semibold rounded-full uppercase tracking-[0.15em] mb-1.5 sm:mb-2">
                    {image.category}
                  </span>
                  <p className="text-white text-[11px] sm:text-sm font-medium leading-snug line-clamp-2">
                    {image.alt}
                  </p>
                </div>
                <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 bg-white/8 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Full width */}
        {layout === 'fullwidth' && (
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {filteredImages.map((image, index) => (
              <button
                key={image.src}
                className="group relative overflow-hidden rounded-lg w-full text-left cursor-pointer"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View: ${image.alt}`}
              >
                <div className="aspect-[16/9] sm:aspect-[21/9]">
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
                  <div className="p-4 sm:p-6 lg:p-12 max-w-md">
                    <span className="inline-block px-2 py-0.5 sm:px-2.5 bg-blue-600/20 backdrop-blur-sm text-blue-300 text-[9px] sm:text-[10px] font-semibold rounded-full uppercase tracking-[0.15em] mb-2 sm:mb-3">
                      {image.category}
                    </span>
                    <p className="text-white text-[14px] sm:text-base lg:text-xl font-bold leading-snug mb-1 sm:mb-1.5">
                      {image.alt}
                    </p>
                    <p className="text-gray-400 text-[12px] sm:text-sm leading-[1.6] line-clamp-3 sm:line-clamp-none">{image.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-10 sm:mt-14 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111113] border border-white/5 rounded-lg p-3 sm:p-4 lg:p-5 text-center"
            >
              <p className="text-blue-400 text-lg sm:text-xl lg:text-3xl font-extrabold mb-0.5">
                {stat.value}
              </p>
              <p className="text-gray-500 text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-[0.15em] font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-14 lg:mt-20 bg-[#111113] border border-white/5 rounded-lg p-5 sm:p-8 lg:p-10 text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white uppercase tracking-tight mb-2 sm:mb-3">
            Interested in working with us?
          </h3>
          <p className="text-gray-400 text-[13px] sm:text-sm lg:text-base max-w-md mx-auto mb-5 sm:mb-6 leading-[1.6]">
            Get in touch for a free on-site assessment and written quotation.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-md transition-colors duration-200 text-[13px] sm:text-sm min-h-[44px]"
            >
              Get a free quote
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center gap-2 border border-white/15 hover:bg-white/8 active:bg-white/12 text-white font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-md transition-colors duration-200 text-[13px] sm:text-sm min-h-[44px]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call us
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 hover:bg-white/8 active:bg-white/12 text-white font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-md transition-colors duration-200 text-[13px] sm:text-sm min-h-[44px]"
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
