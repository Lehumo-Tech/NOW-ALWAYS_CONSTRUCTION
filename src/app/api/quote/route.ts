/**
 * Quote Request API Route — Server-Agnostic Template
 *
 * ═══════════════════════════════════════════════════════════════
 * FOR THE HOSTING PROVIDER / CLIENT'S DEVELOPER:
 * ═══════════════════════════════════════════════════════════════
 *
 * This file is a TEMPLATE. It currently returns a success response
 * without persisting data. You MUST implement the storage logic
 * before this route processes real form submissions.
 *
 * IMPLEMENTATION CHECKLIST:
 * ──────────────────────────────────────────────
 * [ ] Choose a storage backend (database, email, CRM, etc.)
 * [ ] Implement data validation server-side (never trust client input)
 * [ ] Capture submitter_ip from request headers (for POPIA audit trail)
 * [ ] Store the full QuoteRequestPayload + server metadata
 * [ ] Set up email notifications for new submissions
 * [ ] Create a DSAR (Data Subject Access Request) endpoint
 * [ ] Create a data deletion endpoint
 * [ ] Add rate limiting to prevent abuse
 * [ ] Test with real submissions
 *
 * See HANDOVER.md → "Server-Side Form Integration" for detailed
 * implementation examples using different backends.
 * ═══════════════════════════════════════════════════════════════
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateConsentPayload, type QuoteRequestPayload, type PopiaConsentPayload } from '@/lib/popia'

/** Expected shape of the incoming request body */
interface QuoteRequestBody {
  fullName: string
  email: string
  phone: string
  service: string
  message: string
  popia: PopiaConsentPayload
}

/**
 * Extract the client IP address from request headers.
 *
 * POPIA AUDIT TRAIL:
 * The IP address is NOT captured client-side (for privacy and accuracy).
 * It MUST be captured here from the request. The actual header depends
 * on your hosting platform:
 *
 * - Vercel: x-forwarded-for (first IP in the list)
 * - Nginx reverse proxy: x-real-ip (if configured)
 * - Cloudflare: cf-connecting-ip
 * - Direct: socket.remoteAddress (not available in serverless)
 *
 * IMPORTANT: Do not trust X-Forwarded-For blindly — an attacker
 * can spoof this header. Only trust it if your reverse proxy
 * overwrites it (which Nginx/Cloudflare do by default).
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfIp = request.headers.get('cf-connecting-ip')

  if (cfIp) return cfIp.trim()
  if (realIp) return realIp.trim()
  if (forwarded) return forwarded.split(',')[0].trim()

  return 'unknown'
}

/**
 * POST /api/quote
 *
 * Handles quote form submissions with POPIA-compliant data processing.
 *
 * Current status: TEMPLATE — returns success without persisting.
 * Implement storage before enabling real submissions.
 */
export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequestBody = await request.json()

    // ── 1. Validate required fields ──────────────────────────
    if (!body.fullName || !body.email || !body.phone || !body.service || !body.message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // ── 2. Validate email format ─────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // ── 3. Validate SA phone format ──────────────────────────
    const phoneRegex = /^0[0-9]{9,10}$/
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid South African phone number' },
        { status: 400 }
      )
    }

    // ── 4. Validate POPIA consent payload ────────────────────
    if (!body.popia) {
      return NextResponse.json(
        { success: false, error: 'POPIA consent is required' },
        { status: 400 }
      )
    }

    const consentValidation = validateConsentPayload(body.popia)
    if (!consentValidation.valid) {
      return NextResponse.json(
        { success: false, error: `POPIA consent invalid: ${consentValidation.errors.join(', ')}` },
        { status: 400 }
      )
    }

    // ── 5. Capture server-side metadata ──────────────────────
    const serverMetadata = {
      received_at: new Date().toISOString(),
      submitter_ip: getClientIp(request),
      user_agent: request.headers.get('user-agent') || 'unknown',
      consent_version: body.popia.consent_version,
      consent_timestamp: body.popia.consent_timestamp,
    }

    // ── 6. Assemble full payload ─────────────────────────────
    const fullPayload: QuoteRequestPayload & { _server: typeof serverMetadata } = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      service: body.service,
      message: body.message,
      popia: body.popia,
      _server: serverMetadata,
    }

    // ══════════════════════════════════════════════════════════
    // IMPLEMENT YOUR STORAGE LOGIC HERE
    // ══════════════════════════════════════════════════════════
    //
    // Option A: Save to database
    //   await db.quoteRequest.create({ data: fullPayload })
    //
    // Option B: Send via email (e.g. using nodemailer)
    //   await sendEmail({ to: 'projects@nowandalways.co.za', subject: 'New Quote Request', body: fullPayload })
    //
    // Option C: Send to a CRM (e.g. HubSpot, Salesforce)
    //   await crm.contacts.create({ properties: { ...fullPayload } })
    //
    // Option D: Save to a file (simplest, not recommended for production)
    //   await fs.appendFile('submissions.jsonl', JSON.stringify(fullPayload) + '\n')
    //
    // See HANDOVER.md for complete implementation examples.
    // ══════════════════════════════════════════════════════════

    // For now, log the payload (remove this in production)
    console.log('[QUOTE API] Submission received:', JSON.stringify(fullPayload, null, 2))

    return NextResponse.json({
      success: true,
      message: 'Quote request received. We will contact you shortly.',
      // Do NOT return the full payload to the client (PII exposure)
      consent_recorded_at: serverMetadata.received_at,
    })
  } catch (error) {
    console.error('[QUOTE API] Error processing submission:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred processing your request' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/quote — Health check endpoint
 *
 * Returns API status. Useful for monitoring.
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/quote',
    method: 'POST',
    description: 'POPIA-compliant quote request handler',
    note: 'This is a template route. Implement storage before using in production.',
    docs: 'See HANDOVER.md for implementation guidance.',
  })
}
