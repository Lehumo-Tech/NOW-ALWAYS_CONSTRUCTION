/**
 * POPIA Compliance Module — Now & Always Construction
 *
 * Centralized configuration, types, and utilities for POPIA
 * (Protection of Personal Information Act 4 of 2013) compliance.
 *
 * ────────────────────────────────────────────────────────────
 * FOR THE HOSTING PROVIDER / CLIENT'S DEVELOPER:
 *
 * This module defines the consent payload structure that any
 * server-side implementation MUST preserve. When adding a
 * backend form handler, ensure you:
 *
 * 1. Capture `consent_timestamp` server-side (from the request)
 * 2. Optionally capture the client IP (for audit trail)
 * 3. Store the full `PopiaConsentPayload` alongside the form data
 * 4. Provide a data subject access request (DSAR) endpoint
 * 5. Provide a data deletion endpoint
 *
 * IP LOGGING: IP address capture is NOT done client-side for
 * privacy reasons. Your server/reverse proxy MUST capture this.
 * See DEPLOY.md → "POPIA Server-Side Implementation" for code.
 * ────────────────────────────────────────────────────────────
 */

/** Current version of the privacy policy — increment when the policy changes */
export const POPIA_POLICY_VERSION = '2026-03'

/** Date the privacy policy was last updated */
export const POPIA_POLICY_DATE = 'March 2026'

/** URL path to the privacy policy page */
export const POPIA_POLICY_PATH = '/privacy'

/**
 * Consent label text displayed to the user.
 * Must be explicitly agreed to — implied consent is NOT sufficient under POPIA.
 */
export const POPIA_CONSENT_LABEL =
  'I consent to Now and Always (Pty) Ltd processing my personal information in accordance with their Privacy Policy and the Protection of Personal Information Act (POPIA) of South Africa.'

/**
 * Full POPIA consent payload — this structure MUST be preserved
 * in any server-side implementation.
 *
 * @example
 * ```json
 * {
 *   "popia_consent": true,
 *   "consent_timestamp": "2026-05-24T10:30:00.000Z",
 *   "consent_version": "2026-03",
 *   "policy_url": "https://nowandalways.co.za/privacy"
 * }
 * ```
 */
export interface PopiaConsentPayload {
  /** Whether the user explicitly consented (must be `true`) */
  popia_consent: true
  /** ISO 8601 timestamp of when consent was given */
  consent_timestamp: string
  /** Version of the privacy policy the user consented to */
  consent_version: string
  /** Full URL to the privacy policy page */
  policy_url: string
}

/**
 * Generate a POPIA consent payload with the current timestamp.
 * Called at the point of form submission — NOT on page load.
 *
 * @param siteUrl - The base URL of the site (from SITE config)
 * @returns A complete PopiaConsentPayload
 */
export function generateConsentPayload(siteUrl: string): PopiaConsentPayload {
  return {
    popia_consent: true,
    consent_timestamp: new Date().toISOString(),
    consent_version: POPIA_POLICY_VERSION,
    policy_url: `${siteUrl}${POPIA_POLICY_PATH}`,
  }
}

/**
 * Full quote request payload structure — this is what gets sent
 * to the server-side API route (or formatted for WhatsApp/email).
 *
 * HOSTING PROVIDER: Your API route should expect this shape.
 * The `popia` field contains the compliance metadata.
 *
 * NOTE: `submitter_ip` is intentionally excluded from the
 * client-side payload. It MUST be captured server-side from
 * request headers (X-Forwarded-For, X-Real-IP, or socket.remoteAddress).
 */
export interface QuoteRequestPayload {
  /** Submitter's full name */
  fullName: string
  /** Submitter's email address */
  email: string
  /** Submitter's phone number (SA format: 0XXXXXXXXX) */
  phone: string
  /** Requested service category */
  service: string
  /** Project description / message */
  message: string
  /** POPIA consent metadata — MUST be present and valid */
  popia: PopiaConsentPayload
}

/**
 * Validation result for the consent payload.
 * Used server-side to verify that consent was properly captured.
 */
export function validateConsentPayload(payload: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: ['Consent payload is missing or invalid'] }
  }

  const p = payload as Record<string, unknown>

  if (p.popia_consent !== true) {
    errors.push('popia_consent must be true')
  }

  if (typeof p.consent_timestamp !== 'string') {
    errors.push('consent_timestamp must be an ISO 8601 string')
  } else {
    const ts = new Date(p.consent_timestamp)
    if (isNaN(ts.getTime())) {
      errors.push('consent_timestamp is not a valid ISO 8601 date')
    }
  }

  if (typeof p.consent_version !== 'string' || p.consent_version.trim() === '') {
    errors.push('consent_version must be a non-empty string')
  }

  if (typeof p.policy_url !== 'string' || !p.policy_url.startsWith('http')) {
    errors.push('policy_url must be a valid URL')
  }

  return { valid: errors.length === 0, errors }
}
