import { createContactForm } from '@/drizzle/db'
import { sendBatchEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
import { EmailContactSubmit } from '@/emails/contact-submit'
import { contactFormSchema } from '@/lib/validations'
import { render } from '@react-email/render'
import { z } from 'zod'
// import { v4 as uuid } from 'uuid'

// NOTE: This is not used currently, using server actions instead
export async function POST(req: Request) {
  try {
    const body: z.infer<typeof contactFormSchema> = await req.json()

    // Convert newsletter to boolean value for DB
    const newsletter =
      typeof body?.newsletter === 'string' ? (body?.newsletter === 'true' ? true : false) : body?.newsletter

    // Add contact form submission to database
    await createContactForm({
      ...body,
      ...(body?.eventDate ? { eventDate: new Date(body.eventDate).toISOString() } : { eventDate: undefined }),
      newsletter
    })

    // Send new email to TPE team
    // Send confirmation email to user
    const email = await sendBatchEmail([
      {
        to: process.env.NODE_ENV === 'development' ? ['delivered@resend.dev'] : 'leah@twoperfectevents.com',
        from: 'Two Perfect Events <contact@email.twoperfectevents.com>',
        replyTo: 'contact@email.twoperfectevents.com',
        subject: `TPE form submission from ${body?.firstName}<${body?.email}>`,
        react: EmailContactSubmit({ payload: body })
      },
      {
        to: body?.email || 'me@jlee.cool',
        from: 'Two Perfect Events <contact@email.twoperfectevents.com>',
        replyTo: 'contact@email.twoperfectevents.com',
        subject: 'Thank you for contacting Two Perfect Events!',
        react: EmailContactConfirm({ name: body?.firstName }),
        text: await render(EmailContactConfirm({ name: body?.firstName }), { plainText: true })
        // Create plain text version of the email
        // headers: { 'X-Entity-Ref-ID': uuid() }
      }
    ])
    console.log('email', email)

    if (!email?.data || email?.error) {
      return Response.json({ error: email?.error || 'Email sending error!' }, { status: 500 })
    }

    return Response.json(email?.data || 'Contact emails sent.', { status: 200 })
  } catch (error) {
    console.error('contact form error', error)
    return Response.json({ error }, { status: 500 })
  }
}
