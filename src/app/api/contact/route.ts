import { createContactForm } from '@/drizzle/db'
import { sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
import { EmailContactSubmit } from '@/emails/contact-submit'
import { render } from '@react-email/render'
// import { v4 as uuid } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // TODO: add a step to filter out only needed fields from body

    // Add contact form submission to database
    await createContactForm(body)

    // Send new email to TPE team
    const emailAdmin = await sendEmail({
      to: process.env.NODE_ENV === 'development' ? ['delivered@resend.dev'] : 'leah@twoperfectevents.com',
      from: 'Two Perfect Events <contact@email.twoperfectevents.com>',
      subject: `TPE form submission from ${body?.name}<${body?.email}>`,
      react: EmailContactSubmit({ payload: body })
    })
    console.log('emailAdmin', emailAdmin)

    // Send confirmation email to user
    const email = await sendEmail({
      to: body?.email || 'me@jlee.cool',
      from: 'Two Perfect Events <contact@email.twoperfectevents.com>',
      replyTo: 'contact@email.twoperfectevents.com',
      subject: body?.subject || 'Thank you for contacting Two Perfect Events!',
      react: EmailContactConfirm({ name: body?.name }),
      text: render(EmailContactConfirm({ name: body?.name }), { plainText: true })
      // headers: { 'X-Entity-Ref-ID': uuid() }
    })
    console.log('email', email)

    if (!emailAdmin?.data || !email?.data) {
      return Response.json({ error: emailAdmin?.error || email?.error || 'Email sending error!' }, { status: 500 })
    }

    return Response.json({ data: email.data })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
