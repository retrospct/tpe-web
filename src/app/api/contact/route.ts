import { sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
import { EmailContactSubmit } from '@/emails/contact-submit'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Send new email to TPE team
    const emailAdmin = await sendEmail({
      to: 'me@jlee.cool', // || ['delivered@resend.dev'],
      from: 'Two Perfect Events <team@email.twoperfectevents.com>',
      subject: `TPE form submission from ${body?.name}`,
      react: EmailContactSubmit({ payload: body })
    })
    console.log('emailAdmin', emailAdmin)

    // Send confirmation email to user
    const email = await sendEmail({
      to: body?.email || ['delivered@resend.dev'],
      from: 'Two Perfect Events <team@email.twoperfectevents.com>',
      subject: body?.subject || 'Thank you for contacting Two Perfect Events!',
      react: EmailContactConfirm({ name: body?.name })
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
