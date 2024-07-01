import { sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = await sendEmail({
      to: body?.email || ['delivered@resend.dev'],
      from: 'Two Perfect Events <team@email.twoperfectevents.com>',
      subject: body?.subject || 'Thank you for contacting Two Perfect Events!',
      react: EmailContactConfirm({ firstName: body?.firstName })
    })
    console.log('email', email)

    if (!email?.data) {
      return Response.json({ error: email?.error || 'Email sending error!' }, { status: 500 })
    }

    return Response.json({ data: email.data })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
