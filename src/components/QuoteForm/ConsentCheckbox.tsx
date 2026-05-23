'use client'

/**
 * ConsentCheckbox — POPIA-Compliant Consent Component
 *
 * A reusable, accessible consent checkbox that meets POPIA requirements.
 * Used in the QuoteForm and any future forms that collect personal information.
 *
 * POPIA REQUIREMENTS MET:
 * ──────────────────────────────────────────────
 * 1. Explicit consent (not implied) — checkbox must be checked
 * 2. Clear and plain language — label describes what user agrees to
 * 3. Link to Privacy Policy — user can read before consenting
 * 4. Consent timestamp captured at submission time (in QuoteForm)
 * 5. Consent version tracked (links to policy version)
 *
 * FOR THE HOSTING PROVIDER:
 * ──────────────────────────────────────────────
 * This component only handles the UI/UX of consent capture.
 * The actual consent payload (including timestamp) is generated
 * at form submission time using `generateConsentPayload()` from
 * `@/lib/popia`. See `src/app/api/quote/route.ts` for the
 * server-side implementation template.
 *
 * IP LOGGING NOTE:
 * Client-side JavaScript cannot reliably capture IP addresses.
 * If IP logging is required for your POPIA audit trail, it MUST
 * be done server-side. See DEPLOY.md for implementation guidance.
 */

import { forwardRef } from 'react'
import Link from 'next/link'
import { POPIA_CONSENT_LABEL, POPIA_POLICY_PATH } from '@/lib/popia'
import { SITE } from '@/lib/config'

interface ConsentCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Register name for react-hook-form (default: 'popia_consent') */
  name?: string
  /** Current error message from form validation */
  error?: string
}

const ConsentCheckbox = forwardRef<HTMLInputElement, ConsentCheckboxProps>(
  function ConsentCheckbox({ name = 'popia_consent', error, className, ...rest }, ref) {
    return (
      <div className={className}>
        <div className="flex items-start gap-3 pt-1">
          <input
            ref={ref}
            id="quote-popia"
            type="checkbox"
            name={name}
            className="mt-1 w-4 h-4 shrink-0 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500/25 focus:ring-offset-0 cursor-pointer accent-blue-600"
            aria-required="true"
            aria-describedby={error ? 'quote-popia-error' : undefined}
            aria-invalid={!!error}
            {...rest}
          />
          <label htmlFor="quote-popia" className="text-gray-500 text-[11px] sm:text-xs leading-[1.5] cursor-pointer">
            I consent to {SITE.legalName} processing my personal information in accordance with their{' '}
            <Link
              href={POPIA_POLICY_PATH}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>{' '}
            and the Protection of Personal Information Act (POPIA) of South Africa.
          </label>
        </div>
        {error && (
          <p id="quote-popia-error" className="text-red-400 text-xs mt-1 ml-7" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

ConsentCheckbox.displayName = 'ConsentCheckbox'

export default ConsentCheckbox
