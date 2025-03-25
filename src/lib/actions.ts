'use server'

import { createContactForm, createPerson, createPersonsToSubscriptions, createSubscription } from '@/drizzle/db'
import { InsertContactForm } from '@/drizzle/schema'
import { sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
import { EmailContactSubmit } from '@/emails/contact-submit'
import { formatLocalDate } from '@/lib/utils'
import { log } from '@/lib/utils/functions/log'
import { contactFormSchema, subscribeFormSchema } from '@/lib/validations'
import { Resend } from 'resend'
import { ReactElement } from 'react'

export type FormState = {
  message: string
  fields?: Record<string, string | Date | boolean>
  issues?: string[]
}

export async function submitContactAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = contactFormSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    
    // Log validation error to error reporting
    await log({
      message: `Contact form validation error: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`,
      type: 'errors'
    }).catch(() => {}) // Silently handle logging errors
    
    return {
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message)
    }
  }

  const errorMessage = `Oops, we had an issue with your contact form submission. Please reach out to admin@twoperfectevents.com for assistance if the issue persists.`

  try {
    const result = await createContactForm({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      eventDate: parsed.data.eventDate ? formatLocalDate(parsed.data.eventDate) : null,
      comments: parsed.data.comments
    })

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Two Perfect Events <noreply@twoperfectevents.com>',
      to: ['info@twoperfectevents.com'],
      subject: `Contact form submission - ${parsed.data.firstName} ${parsed.data.lastName}`,
      react: EmailContactSubmit({
        payload: {
          firstName: parsed.data.firstName,
          lastName: parsed.data.lastName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          eventDate: parsed.data.eventDate ? formatLocalDate(parsed.data.eventDate) : undefined,
          comments: parsed.data.comments
        }
      }) as React.ReactElement
    })

    // Send confirmation email
    await resend.emails.send({
      from: 'Two Perfect Events <noreply@twoperfectevents.com>',
      to: [parsed.data.email],
      subject: 'Thank you for contacting Two Perfect Events',
      react: EmailContactConfirm({
        name: parsed.data.firstName
      }) as React.ReactElement
    })

    return {
      message: 'Thank you! We will be in touch shortly.',
      fields: parsed.data
    }
  } catch (error) {
    await log({
      message: `Contact form submission error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors',
      mention: true
    }).catch(() => {})
    return { message: errorMessage }
  } finally {
    // If newsletter is checked
    if (parsed.data?.newsletter === 'true') {
      const { firstName, lastName, email, phone, eventDate, comments, referral } = parsed.data
      // Call resend Audience & Contacts APIs
      await subscribeResend({ email, firstName, lastName })
      // Add user to subscriptions list
      const [person] = await createPerson({
        firstName,
        lastName,
        email,
        phone,
        ...(eventDate && { eventDate: eventDate?.toISOString() }),
        comments,
        referral
      })
      const [subscription] = await createSubscription({ name: 'Newsletter' })
      await createPersonsToSubscriptions({ personId: person.id, subscriptionId: subscription.id })
    }
  }
}

export async function subscribeAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = subscribeFormSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    
    await log({
      message: `Newsletter subscription validation error: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`,
      type: 'errors'
    }).catch(() => {})
    
    return {
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message)
    }
  }

  const errorMessage = `Oops, we had an issue with your newsletter subscription. Please reach out to admin@twoperfectevents.com for assistance if the issue persists.`

  try {
    // Add user to subscriptions list
    const { email } = parsed.data
    // Call resend Audience & Contacts APIs
    await subscribeResend({ email })
    // Add user to subscriptions list
    const [person] = await createPerson({ email })
    const [subscription] = await createSubscription({ name: 'Newsletter' })
    await createPersonsToSubscriptions({ personId: person.id, subscriptionId: subscription.id })

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
    await log({
      message: `Newsletter subscription error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      type: 'errors',
      mention: true
    }).catch(() => {})
    return { message: errorMessage }
  }
}

// Call resend Audience & Contacts APIs
const subscribeResend = async ({
  email,
  firstName,
  lastName
}: {
  email: string
  firstName?: string
  lastName?: string
}) => {
  const resend = new Resend(process.env.RESEND_ADMIN_API_KEY!)
  if (!resend || !email) {
    console.error(
      'Resend is not configured. You need to add a RESEND_ADMIN_API_KEY in your .env file for emails to work.'
    )
  }

  // Create contact with user data
  const contact = await resend.contacts.create({
    email,
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    unsubscribed: false,
    audienceId: 'a4ebedf1-1f0e-4bd8-9a2d-dcb0516f9b90'
  })
  console.log('user subscribed to newsletter', contact)
}
