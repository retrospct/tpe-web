/**
 * Lightweight anti-abuse helpers for the public contact and newsletter forms.
 *
 * These exist because the forms send branded email (via Resend) to whatever
 * address is submitted. Without a gate, bots use the site to spam third
 * parties, which generates complaints against our sending domain.
 *
 * This module is intentionally free of server-only imports so the honeypot
 * field name can be shared with client components.
 */

/** Name of the hidden honeypot input. Humans never see it; bots fill it. */
export const HONEYPOT_FIELD = 'company_website'

/** True when the honeypot field was submitted with a non-empty value. */
export function isHoneypotTripped(input: FormData | Record<string, unknown>): boolean {
  const value = input instanceof FormData ? input.get(HONEYPOT_FIELD) : input[HONEYPOT_FIELD]
  return typeof value === 'string' && value.trim().length > 0
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return headers.get('x-real-ip') ?? 'unknown'
}

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

export const FORM_RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 } as const

/**
 * Fixed-window in-memory rate limit.
 *
 * Best effort only: state lives in the current serverless instance. On Vercel
 * Fluid Compute instances are reused, so this catches naive floods, but the
 * durable control is a Vercel Firewall rate-limit rule on POST /contact and
 * POST /api/resend/subscribe.
 */
export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number } = FORM_RATE_LIMIT
): { ok: boolean; remaining: number } {
  const now = Date.now()

  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k)
  }

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1 }
  }

  bucket.count += 1
  return { ok: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count) }
}
