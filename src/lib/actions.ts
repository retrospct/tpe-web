'use server'

import { createContactForm, createPerson, createPersonsToSubscriptions } from '@/drizzle/db'
import { InsertContactForm } from '@/drizzle/schema'
import { sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
import { EmailContactSubmit } from '@/emails/contact-submit'
import { formatLocalDate } from '@/lib/utils'
import { contactFormSchema, subscribeFormSchema } from '@/lib/validations'
import { Resend } from 'resend'

export type FormState = {
  message: string
  fields?: Record<string, string | Date | boolean>
  issues?: string[]
}

export async function submitContactAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = contactFormSchema.safeParse(formData)
  console.log('contact_form', parsed)
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
    // Add new contact form submission to database
    await createContactForm({ ...(parsed.data as InsertContactForm), raw: JSON.stringify(parsed.data) })

    // Send new submission email to TPE team
    await sendEmail({
      to: process.env.NODE_ENV === 'development' ? ['delivered@resend.dev'] : 'leah@twoperfectevents.com',
      from: 'Two Perfect Events <no-reply@email.twoperfectevents.com>',
      subject: `TPE form submission from ${parsed.data.name}<${parsed.data.email}>`,
      react: EmailContactSubmit({
        payload: { ...parsed.data, eventDate: formatLocalDate(parsed.data?.eventDate) }
      })
    })

    // Send confirmation email to user
    await sendEmail({
      to: parsed.data?.email || 'leah@twoperfectevents.com',
      from: 'Two Perfect Events <no-reply@email.twoperfectevents.com>',
      subject: 'Thank you for contacting Two Perfect Events!',
      react: EmailContactConfirm({ name: parsed.data.name })
    })

    return { message: `Thank you for contacting us! We will get back to you as soon as possible.` }
  } catch (error) {
    return {
      message: `Opps, we had an issue with your contact form submission. Please reach out to admin@twoperfectevents.com for assistance if the issue persists.`
    }
  } finally {
    // If newsletter is checked
    if (parsed.data?.newsletter === 'true') {
      const subscriptionId = '61941de4-1d7d-4230-a9e3-13409c94cbb7'
      const { name, email, phone, eventDate, comments, referral } = parsed.data
      // Call resend Audience & Contacts APIs
      await subscribeResend({ email, name })
      // Add user to subscriptions list
      const [person] = await createPerson({
        name,
        email,
        phone,
        ...(eventDate && { eventDate: eventDate?.toISOString() }),
        comments,
        referral
      })
      await createPersonsToSubscriptions({
        personId: person.id,
        subscriptionId
      })
    }
  }
}

export async function subscribeAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = subscribeFormSchema.safeParse(formData)
  console.log('subscribe_form', parsed)
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

  try {
    // Add user to subscriptions list
    const subscriptionId = '61941de4-1d7d-4230-a9e3-13409c94cbb7'
    const { email } = parsed.data
    // Call resend Audience & Contacts APIs
    await subscribeResend({ email })
    // Add user to subscriptions list
    const [person] = await createPerson({ email })
    await createPersonsToSubscriptions({
      personId: person.id,
      subscriptionId
    })

    // Send confirmation email to user
    await sendEmail({
      to: parsed.data?.email || 'leah@twoperfectevents.com',
      from: 'Two Perfect Events <no-reply@email.twoperfectevents.com>',
      subject: 'Thank you for contacting Two Perfect Events!',
      react: EmailContactConfirm({
        previewText: 'Thanks for subscribing to our newsletter!',
        subject: 'Thank you for subscribing!',
        body: `We'll periodically send interesting content and updates on what the Two Perfect Events team are up to.`,
        name: parsed.data.email
      })
    })

    return { message: `Thank you for subscribing to our newsletter!` }
  } catch (error) {
    return {
      message: `Opps, we had an issue with your newsletter form submission. Please reach out to admin@twoperfectevents.com for assistance if the issue persists.`
    }
  }
}

// Call resend Audience & Contacts APIs
const subscribeResend = async ({ email, name }: { email: string; name?: string }) => {
  // const contact = await fetch('/api/resend', { method: 'POST', body: JSON.stringify({ email }) })
  const resend = new Resend(process.env.RESEND_ADMIN_API_KEY!)
  if (!resend || !email) {
    console.error(
      'Resend is not configured. You need to add a RESEND_ADMIN_API_KEY in your .env file for emails to work.'
    )
  }

  // Create contact with user data
  const names = name ? name.trim()?.split(' ') : []
  const firstName = names?.length > 0 ? names[0] : ''
  const lastName = names?.length > 1 ? names.slice(1).join(' ') : ''
  const contact = await resend.contacts.create({
    email,
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    unsubscribed: false,
    audienceId: 'a4ebedf1-1f0e-4bd8-9a2d-dcb0516f9b90'
  })
  console.log('contact', contact)
}
