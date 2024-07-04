import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('body', body)
    // TODO: add a step to filter out only needed fields from body
    const resend = process.env.RESEND_ADMIN_API_KEY ? new Resend(process.env.RESEND_ADMIN_API_KEY) : null

    if (!resend || !body.email) {
      console.error('Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.')
      return NextResponse.json({ error: 'Error initializing resend client' }, { status: 500 })
    }

    // Create contact with user data
    const names = body?.name?.trim()?.split(' ')
    const firstName = names?.length > 0 ? names[0] : ''
    const lastName = names?.length > 1 ? names.slice(1).join(' ') : ''
    const contact = await resend.contacts.create({
      email: body.email,
      firstName,
      lastName,
      unsubscribed: false,
      audienceId: 'a4ebedf1-1f0e-4bd8-9a2d-dcb0516f9b90'
    })
    console.log('contact', contact)

    if (!contact?.data || contact?.error) {
      return NextResponse.json({ error: contact?.error || 'Adding contact to resend error!' }, { status: 500 })
    }

    return NextResponse.json({ data: contact.data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
