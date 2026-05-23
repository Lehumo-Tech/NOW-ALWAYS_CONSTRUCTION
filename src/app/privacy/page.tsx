'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE } from '@/lib/config'

/* ─────────── SCROLL REVEAL HOOK ─────────── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = el.querySelectorAll('.scroll-reveal, .scroll-slide-left, .scroll-slide-right, .scroll-scale')
    elements.forEach((child) => observer.observe(child))
    if (el.classList.contains('scroll-reveal') || el.classList.contains('scroll-slide-left') || el.classList.contains('scroll-slide-right') || el.classList.contains('scroll-scale')) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}

/* ─────────── SECTION DATA ─────────── */

const PRIVACY_SECTIONS = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: `We collect personal information that you voluntarily provide to us when you use our website, fill in our quote request form, or otherwise communicate with us. This includes:

• Personal identification information: full name, email address, phone number
• Project-related information: service type, project description, property details
• Communication records: correspondence, emails, and messages exchanged with us
• Technical information: IP address, browser type, device information, and cookies when you visit our website

We only collect information that is necessary for the purposes for which it is to be used, and we collect it by lawful and fair means.`,
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    content: `We use the personal information we collect for the following purposes:

• To process and respond to quote requests and enquiries
• To communicate with you about your project, including providing quotations, scheduling assessments, and project updates
• To provide and maintain our construction and maintenance services
• To comply with legal obligations, including tax, health and safety, and employment law
• To maintain records for business purposes and regulatory compliance
• To improve our website and services

We will only process your personal information for the purpose for which it was collected, or for a purpose that is directly related to the original purpose.`,
  },
  {
    id: 'legal-basis',
    title: '3. Legal Basis for Processing (POPIA Section 11)',
    content: `In terms of Section 11 of the Protection of Personal Information Act (POPIA), we process your personal information on the following legal bases:

• Consent: You have given us explicit consent to process your personal information for specific purposes, such as when you submit our quote request form and agree to our privacy policy.

• Legitimate Interest: Processing is necessary for the legitimate interests of ${SITE.legalName}, such as responding to your enquiries, providing quotations, and conducting business operations — provided that your rights do not override our interests.

• Legal Obligation: Processing is necessary for compliance with a legal obligation to which we are subject, including tax, health and safety regulations, and construction industry regulations.

• Contract: Processing is necessary for the performance of a contract to which you are a party, or in order to take steps at your request prior to entering into a contract.`,
  },
  {
    id: 'information-sharing',
    title: '4. Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your personal information only in the following circumstances:

• Service Providers: We may share information with trusted service providers who assist us in operating our business, such as accounting, legal, and IT services. These service providers are contractually bound to protect your information and may only use it for the purposes we specify.

• Legal Requirements: We may disclose your information if required to do so by law, in response to a court order, subpoena, or other lawful request from a regulatory authority.

• Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, subject to continued protection under POPIA.

All third parties who process personal information on our behalf are required to enter into a written agreement that ensures the information is processed in compliance with POPIA.`,
  },
  {
    id: 'data-retention',
    title: '5. Data Retention',
    content: `In accordance with POPIA, we retain your personal information only for as long as is necessary to fulfil the purpose for which it was collected, or as required by law. Specifically:

• Quote requests and related correspondence are retained for a period of 3 years from the date of last communication
• Contractual records are retained for 5 years as required by the Construction Industry Development Board and South African tax law
• Communication records are retained for 2 years
• Website analytics and cookies data are retained for 12 months

After the retention period expires, your personal information will be securely deleted or anonymised, unless we are required by law to retain it for a longer period.`,
  },
  {
    id: 'your-rights',
    title: '6. Your Rights Under POPIA',
    content: `As a data subject under POPIA, you have the following rights in relation to your personal information:

• Right of Access: You have the right to request access to your personal information held by us, and to receive a copy of such information.

• Right to Correction: You have the right to request the correction of any inaccurate, incomplete, or outdated personal information.

• Right to Deletion: You have the right to request the deletion of your personal information, subject to any legal obligations requiring us to retain it.

• Right to Object: You have the right to object to the processing of your personal information on grounds relating to your particular situation, including the right to object to direct marketing.

• Right to Withdraw Consent: Where processing is based on consent, you may withdraw your consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before the withdrawal.

• Right to Complain: You have the right to lodge a complaint with the Information Regulator if you believe that your personal information has been processed in violation of POPIA.

To exercise any of these rights, please contact us using the details provided in Section 9 below.`,
  },
  {
    id: 'security-measures',
    title: '7. Security Measures',
    content: `We take the security of your personal information seriously and have implemented appropriate technical and organisational measures to protect it against unauthorised access, alteration, disclosure, or destruction. These measures include:

• Secure storage of physical records in locked premises
• Digital information protected by encryption and access controls
• Regular security assessments and updates
• Staff training on data protection and confidentiality
• Access limited to authorised personnel on a need-to-know basis

While we strive to protect your personal information, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest reasonable standard of protection.`,
  },
  {
    id: 'cookies',
    title: '8. Cookies',
    content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us:

• Remember your preferences and settings
• Understand how you use our website
• Improve website performance and functionality

You can control cookies through your browser settings. Disabling cookies may affect the functionality of certain parts of our website. We do not use cookies for direct marketing purposes without your consent.`,
  },
  {
    id: 'contact-privacy',
    title: '9. Contact for Privacy Queries',
    content: `If you have any questions or concerns about this Privacy Policy, or wish to exercise any of your rights under POPIA, please contact our Information Officer:

${SITE.legalName}
Registration: ${SITE.regNumber}
Phone: ${SITE.phone}
Email: ${SITE.email}
Location: ${SITE.location.city}, ${SITE.location.province}, ${SITE.location.country}`,
  },
  {
    id: 'information-regulator',
    title: '10. Information Regulator — South Africa',
    content: `You have the right to lodge a complaint with the Information Regulator if you believe that your personal information has been processed in violation of POPIA. The Information Regulator can be contacted at:

Information Regulator (South Africa)
Physical Address: 33 Hamilton Street, Murray & Roberts Building, Arcadia, Pretoria
Postal Address: P.O. Box 31533, Braamfontein, 2017
Complaints Email: complaints@inforegulator.org.za
General Enquiries: enquiries@inforegulator.org.za
Website: www.inforegulator.org.za
Phone: +27 (0) 12 406 4818`,
  },
]

/* ─────────── PAGE ─────────── */

export default function PrivacyPage() {
  const sectionRef = useScrollReveal()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        {/* Page Banner */}
        <section className="relative pt-20 sm:pt-24 pb-10 sm:pb-14 overflow-hidden" aria-label="Privacy Policy header">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-[#0a0a0b] to-[#0a0a0b]" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm mb-5 sm:mb-7" aria-label="Breadcrumb">
              <Link href="/" className="text-gray-500 hover:text-white transition-colors duration-200">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-700" aria-hidden="true" />
              <span className="text-blue-400 font-medium" aria-current="page">Privacy Policy</span>
            </nav>

            <p className="text-blue-400 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-2 sm:mb-2.5">
              POPIA Compliance
            </p>
            <h1 className="text-[1.85rem] sm:text-5xl lg:text-[3.5rem] font-extrabold text-white uppercase leading-[1.05] tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-2 sm:mt-3 text-gray-400 text-[14px] sm:text-base max-w-lg leading-[1.6]">
              How {SITE.legalName} collects, uses, and protects your personal information in compliance with the Protection of Personal Information Act (POPIA).
            </p>
          </div>
        </section>

        {/* Content */}
        <section ref={sectionRef} className="bg-[#0a0a0b] pb-14 sm:pb-20 lg:pb-28" aria-label="Privacy Policy content">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Last updated */}
            <div className="scroll-reveal glass-strong rounded-lg p-4 sm:p-5 mb-6 sm:mb-8">
              <p className="text-gray-400 text-[13px] sm:text-sm">
                <span className="text-white font-medium">Last updated:</span> March 2026
              </p>
              <p className="text-gray-500 text-xs sm:text-[13px] mt-1">
                This Privacy Policy applies to all personal information processed by {SITE.legalName} (Registration: {SITE.regNumber}), in compliance with the Protection of Personal Information Act 4 of 2013 (POPIA) of the Republic of South Africa.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="scroll-reveal glass rounded-lg p-4 sm:p-5 mb-8 sm:mb-10">
              <h2 className="text-white font-bold text-sm sm:text-base uppercase tracking-wide mb-3">
                Table of Contents
              </h2>
              <nav aria-label="Privacy Policy sections">
                <ol className="space-y-2">
                  {PRIVACY_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-gray-400 hover:text-blue-400 text-[13px] sm:text-sm transition-colors duration-200"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Sections */}
            <div className="space-y-8 sm:space-y-10">
              {PRIVACY_SECTIONS.map((section, i) => (
                <article
                  key={section.id}
                  id={section.id}
                  className={`scroll-reveal stagger-${Math.min(i + 1, 7)}`}
                >
                  <h2 className="text-white font-bold text-base sm:text-lg uppercase tracking-wide mb-3 sm:mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-400 text-[13px] sm:text-sm leading-[1.8] whitespace-pre-line">
                    {section.content}
                  </div>
                </article>
              ))}
            </div>

            {/* Back to top / CTA */}
            <div className="mt-10 sm:mt-14 text-center scroll-reveal">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 sm:px-6 py-3 rounded-md text-[13px] sm:text-base min-h-[44px] haptic-glow"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
