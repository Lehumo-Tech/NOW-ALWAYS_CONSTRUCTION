'use client'

/**
 * QuoteForm — POPIA-Compliant Quote Request Form
 *
 * ────────────────────────────────────────────────────────────
 * FOR THE HOSTING PROVIDER / CLIENT'S DEVELOPER:
 *
 * This form currently submits via two client-side channels:
 * 1. WhatsApp (opens WhatsApp with pre-filled message)
 * 2. Email (opens mailto: link with pre-filled body)
 *
 * Neither method stores data on a server. When you add a
 * server-side form handler, update the `onSubmitAPI` function
 * below to POST to `/api/quote` instead.
 *
 * The POPIA consent payload is generated at submission time
 * using `generateConsentPayload()` from `@/lib/popia`.
 * This ensures the timestamp reflects the actual consent moment.
 *
 * IP LOGGING: Client-side forms CANNOT capture IP addresses
 * reliably. IP must be captured server-side. See the API route
 * at `src/app/api/quote/route.ts` for implementation.
 * ────────────────────────────────────────────────────────────
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MessageCircle, Mail, CheckCircle, Loader2, Send } from 'lucide-react'
import { SITE } from '@/lib/config'
import { generateConsentPayload } from '@/lib/popia'
import ConsentCheckbox from '@/components/QuoteForm/ConsentCheckbox'

/* ─────────── SCHEMA ─────────── */

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^0[0-9]{9,10}$/, 'Please enter a valid South African phone number (e.g. 0670318635)'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please describe your project (at least 10 characters)'),
  popia_consent: z.literal(true, {
    message: 'You must consent to the processing of your personal information to submit this form',
  }),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const SERVICE_OPTIONS = [
  { value: 'Renovations', label: 'Renovations' },
  { value: 'Plumbing', label: 'Plumbing' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Building', label: 'Building' },
  { value: 'Other', label: 'Other' },
]

/* ─────────── COMPONENT ─────────── */

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitMethod, setSubmitMethod] = useState<'whatsapp' | 'email' | 'api' | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      popia_consent: false as unknown as true,
    },
  })

  /**
   * Generate the POPIA consent payload at the moment of submission.
   * This ensures the timestamp is accurate and tied to the user's
   * explicit consent action.
   */
  const buildConsentPayload = () => generateConsentPayload(SITE.url)

  /**
   * Format form data + POPIA consent for WhatsApp message.
   */
  const formatWhatsAppMessage = (data: QuoteFormData) => {
    const consent = buildConsentPayload()
    const lines = [
      `*New Quote Request — ${SITE.legalName}*`,
      '',
      `*Name:* ${data.fullName}`,
      `*Email:* ${data.email}`,
      `*Phone:* ${data.phone}`,
      `*Service:* ${data.service}`,
      '',
      `*Message:*`,
      data.message,
      '',
      `*POPIA Consent:* Granted at ${consent.consent_timestamp}`,
      `*Policy Version:* ${consent.consent_version}`,
    ]
    return encodeURIComponent(lines.join('\n'))
  }

  /**
   * Format form data + POPIA consent for email body.
   */
  const formatEmailBody = (data: QuoteFormData) => {
    const consent = buildConsentPayload()
    const lines = [
      `New Quote Request — ${SITE.legalName}`,
      '',
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
      '',
      `Message:`,
      data.message,
      '',
      `POPIA Consent: Granted at ${consent.consent_timestamp}`,
      `Policy Version: ${consent.consent_version}`,
      `Policy URL: ${consent.policy_url}`,
    ]
    return encodeURIComponent(lines.join('\n'))
  }

  /**
   * Submit via WhatsApp — opens WhatsApp with pre-filled message.
   * No server required; data goes directly to the business phone.
   */
  const onSubmitWhatsApp = (data: QuoteFormData) => {
    setApiError(null)
    setSubmitMethod('whatsapp')
    const message = formatWhatsAppMessage(data)
    window.open(`${SITE.whatsapp}?text=${message}`, '_blank')
    setSubmitted(true)
  }

  /**
   * Submit via Email — opens default email client with pre-filled body.
   * No server required; data goes directly to the business email.
   */
  const onSubmitEmail = (data: QuoteFormData) => {
    setApiError(null)
    setSubmitMethod('email')
    const subject = encodeURIComponent(`Quote Request: ${data.service} — ${data.fullName}`)
    const body = formatEmailBody(data)
    const mailtoLink = document.createElement('a')
    mailtoLink.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
    mailtoLink.click()
    setSubmitted(true)
  }

  /**
   * Submit via API — POST to the server-side API route.
   *
   * HOSTING PROVIDER: This is the method to enable when you
   * implement server-side storage. Uncomment the button below
   * and update this function as needed.
   */
  const onSubmitAPI = async (data: QuoteFormData) => {
    setApiError(null)
    setSubmitMethod('api')
    const consent = buildConsentPayload()

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
          popia: consent,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setApiError(result.error || 'Something went wrong. Please try again.')
        setSubmitMethod(null)
        return
      }

      setSubmitted(true)
    } catch {
      setApiError('Network error. Please check your connection and try again.')
      setSubmitMethod(null)
    }
  }

  /* ── Success state ────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="glass-strong rounded-lg p-5 sm:p-6 lg:p-8 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-green-600/15 rounded-full flex items-center justify-center">
          <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" aria-hidden="true" />
        </div>
        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Quote Request Sent!</h3>
        <p className="text-gray-400 text-sm sm:text-base leading-[1.6] mb-4">
          {submitMethod === 'whatsapp'
            ? 'Your quote request has been opened in WhatsApp. Send the message and we\'ll get back to you shortly.'
            : submitMethod === 'email'
              ? 'Your email client has been opened with the quote details. Send the email and we\'ll respond within 24 hours.'
              : 'Your quote request has been received. We\'ll contact you within 24 hours.'}
        </p>
        <p className="text-gray-500 text-xs mb-5">
          POPIA consent recorded at {new Date().toISOString()}
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setSubmitMethod(null)
            setApiError(null)
            reset()
          }}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-md text-[13px] sm:text-sm min-h-[44px] haptic-glow"
        >
          Submit another request
        </button>
      </div>
    )
  }

  /* ── Form ──────────────────────────────────────────────────── */
  const inputClasses = 'w-full bg-white/5 border border-white/10 rounded-md text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 focus:outline-none px-3 py-2.5 sm:py-3 text-[14px] sm:text-sm transition-colors duration-200'
  const labelClasses = 'text-gray-400 text-sm font-medium mb-1.5 block'
  const errorClasses = 'text-red-400 text-xs mt-1'

  return (
    <div className="glass-strong rounded-lg p-5 sm:p-6 lg:p-8">
      <h3 className="text-white font-bold text-lg sm:text-xl uppercase tracking-wide mb-1">
        Request a Free Quote
      </h3>
      <p className="text-gray-500 text-[13px] sm:text-sm mb-5 sm:mb-6">
        Fill in the details below and we&apos;ll get back to you.
      </p>

      <form className="space-y-4 sm:space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="quote-fullName" className={labelClasses}>
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="quote-fullName"
            type="text"
            placeholder="e.g. John Mokoena"
            className={inputClasses}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className={errorClasses}>{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="quote-email" className={labelClasses}>
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="quote-email"
            type="email"
            placeholder="e.g. john@example.co.za"
            className={inputClasses}
            {...register('email')}
          />
          {errors.email && (
            <p className={errorClasses}>{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="quote-phone" className={labelClasses}>
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            id="quote-phone"
            type="tel"
            placeholder="e.g. 0670318635"
            className={inputClasses}
            {...register('phone')}
          />
          {errors.phone && (
            <p className={errorClasses}>{errors.phone.message}</p>
          )}
        </div>

        {/* Service */}
        <div>
          <label htmlFor="quote-service" className={labelClasses}>
            Service Required <span className="text-red-400">*</span>
          </label>
          <select
            id="quote-service"
            className={`${inputClasses} appearance-none cursor-pointer`}
            {...register('service')}
          >
            <option value="" disabled className="bg-[#0a0a0b] text-gray-600">
              Select a service...
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#0a0a0b] text-white">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className={errorClasses}>{errors.service.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="quote-message" className={labelClasses}>
            Project Description <span className="text-red-400">*</span>
          </label>
          <textarea
            id="quote-message"
            rows={4}
            placeholder="Tell us about your project — the more detail, the better we can quote."
            className={`${inputClasses} resize-y min-h-[100px]`}
            {...register('message')}
          />
          {errors.message && (
            <p className={errorClasses}>{errors.message.message}</p>
          )}
        </div>

        {/* POPIA Consent — uses extracted reusable component */}
        <ConsentCheckbox
          error={errors.popia_consent?.message}
          {...register('popia_consent')}
        />

        {/* API error display */}
        {apiError && (
          <div className="glass rounded-lg p-3 border border-red-500/20" role="alert">
            <p className="text-red-400 text-xs sm:text-sm">{apiError}</p>
          </div>
        )}

        {/* Submit buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
          <button
            type="button"
            onClick={handleSubmit(onSubmitWhatsApp)}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-3 rounded-md text-[13px] sm:text-sm min-h-[44px] haptic-glow disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
            )}
            Submit via WhatsApp
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmitEmail)}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 rounded-md text-[13px] sm:text-sm min-h-[44px] haptic-glow disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Mail className="w-4 h-4" aria-hidden="true" />
            )}
            Submit via Email
          </button>
        </div>

        {/*
          HOSTING PROVIDER: Uncomment this button when you implement
          the server-side API route at /api/quote. It provides
          server-agnostic form submission with full POPIA compliance.

        <button
          type="button"
          onClick={handleSubmit(onSubmitAPI)}
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold px-5 py-3 rounded-md text-[13px] sm:text-sm min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 mt-2"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="w-4 h-4" aria-hidden="true" />
          )}
          Submit Online
        </button>
        */}
      </form>
    </div>
  )
}
