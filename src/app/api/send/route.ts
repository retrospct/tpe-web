import { sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    // const { data, error } = await resend.emails.send({
    //   from: 'Acme <onboarding@resend.dev>',
    //   to: ['delivered@resend.dev'],
    //   subject: 'Hello world',
    //   react: EmailContactConfirm({ firstName: 'Justin' }),
    // });
    const body = await req.json()
    const email = await sendEmail({
      to: body?.email ? body.email : ['delivered@resend.dev'],
      from: body?.from ? body.from : 'Two Perfect Events <team@email.twoperfectevents.com>',
      subject: body.subject ? body.subject : 'Thank you for contacting Two Perfect Events!',
      react: EmailContactConfirm({ firstName: 'Justin' })
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
