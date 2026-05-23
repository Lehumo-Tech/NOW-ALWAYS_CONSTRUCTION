export const SITE = {
  name: 'Now & Always Construction',
  legalName: 'Now and Always (Pty) Ltd',
  tagline: 'Construction & Maintenance You Can Rely On',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nowandalways.co.za',
  regNumber: '2021/438875/07',
  phone: '067 031 8635',
  phoneRaw: '0670318635',
  phoneInternational: '+27670318635',
  whatsapp: 'https://wa.me/27670318635',
  email: 'projects@nowandalways.co.za',
  location: {
    city: 'Newcastle',
    province: 'KwaZulu-Natal',
    country: 'South Africa',
    coordinates: { lat: -27.7579, lng: 29.9266 },
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || '#',
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || '#',
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || '#',
  },
  credentials: {
    cipc: '2021/438875/07',
    cidb: 'Graded Contractor',
    bbbee: 'B-BBEE Verified',
    csd: 'National Supplier',
  },
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '/gallery' },
  { label: 'Contact', href: '#contact' },
] as const
