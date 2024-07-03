'use server'

import { sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
import { EmailContactSubmit } from '@/emails/contact-submit'
import { formatLocalDate } from '@/lib/utils'
import { contactFormSchemaServer } from '@/lib/validations'

export type FormState = {
  message: string
  fields?: Record<string, string | Date | boolean>
  issues?: string[]
}

export async function submitContactAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = contactFormSchemaServer.safeParse(formData)
  console.log('Submitted contact form data', parsed)
  // console.log('prevState', prevState)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    console.log('Form error:', parsed.error.flatten().fieldErrors)
    return {
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message)
    }
  }

  // if (parsed.data.email.includes('a')) {
  //   console.log('parsed.data.email.includes a', parsed.data.email)
  //   return {
  //     message: 'Invalid email',
  //     fields: parsed.data
  //   }
  // }

  try {
    // Send new submission email to TPE team
    const emailAdmin = await sendEmail({
      to: 'leah@twoperfectevents.com', // || ['delivered@resend.dev'],
      from: 'Two Perfect Events <team@email.twoperfectevents.com>',
      subject: `TPE form submission from ${parsed.data.name}`,
      react: EmailContactSubmit({
        payload: { ...parsed.data, eventDate: formatLocalDate(parsed.data?.eventDate) }
      })
    })
    console.log('emailAdmin', emailAdmin)

    // Send confirmation email to user
    const email = await sendEmail({
      to: parsed.data.email, // || ['delivered@resend.dev'],
      from: 'Two Perfect Events <team@email.twoperfectevents.com>',
      subject: 'Thank you for contacting Two Perfect Events!',
      react: EmailContactConfirm({ name: parsed.data.name })
    })
    console.log('email', email)

    return { message: `Thank you for contacting us! We will get back to you as soon as possible.` }
  } catch (error) {
    return {
      message: `Opps, we had an issue with your contact form submission. Please reach out to admin@twoperfectevents.com for assistance if the issue persists.`
    }
  }
}
