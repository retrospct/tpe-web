import { createContactForm } from '@/drizzle/db'
import { InsertContactForm } from '@/drizzle/schema'
import { subscribeResend } from '@/lib/actions'
import { getClientIp, isHoneypotTripped, rateLimit } from '@/lib/anti-spam'
import { contactFormSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const raw: unknown = await req.json()
    if (typeof raw !== 'object' || raw === null) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    // Bots get a fake success so they don't learn what tripped them.
    if (isHoneypotTripped(raw as Record<string, unknown>)) {
      console.warn('[subscribe api] honeypot tripped, dropping submission')
      return NextResponse.json({ message: 'User subscribed to newsletter' }, { status: 200 })
    }

    const ip = getClientIp(req.headers)
    if (!rateLimit(`subscribe-api:${ip}`).ok) {
      console.warn(`[subscribe api] rate limit exceeded for ${ip}`)
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const parsed = contactFormSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', issues: parsed.error.issues.map((issue) => issue.message) },
        { status: 400 }
      )
    }
    const body = parsed.data
    const { firstName, lastName, email } = body

    if (!process.env.RESEND_ADMIN_API_KEY) {
      console.error('Resend is not configured. You need to add a RESEND_ADMIN_API_KEY in your .env file for emails to work.')
      return NextResponse.json({ error: 'Error initializing resend client' }, { status: 500 })
    }
    // Call resend Audience & Contacts APIs
    await subscribeResend({ email, firstName, lastName })

    // Add new contact form submission to database
    await createContactForm({ ...(body as InsertContactForm), raw: JSON.stringify(body) })

    return NextResponse.json({ message: 'User subscribed to newsletter' }, { status: 200 })
  } catch (error) {
    console.error('[subscribe api] error', error)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
