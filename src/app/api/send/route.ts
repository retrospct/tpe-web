import { sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    // const { data, error } = await resend.emails.send({
    //   from: 'Acme <onboarding@resend.dev>',
    //   to: ['delivered@resend.dev'],
    //   subject: 'Hello world',
    //   react: EmailContactConfirm({ firstName: 'Justin' }),
    // });
    const email = await sendEmail({
      // email: user.email as string,
      to: ['delivered@resend.dev'],
      from: 'Acme <onboarding@resend.dev>',
      subject: `Hello world!`,
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
