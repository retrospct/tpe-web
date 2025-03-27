'use server'

import { createContactForm, createPerson, createPersonsToSubscriptions, createSubscription } from '@/drizzle/db'
import { InsertContactForm } from '@/drizzle/schema'
import { sendBatchEmail, sendEmail } from '@/emails'
import { EmailContactConfirm } from '@/emails/contact-confirm'
import { EmailContactSubmit } from '@/emails/contact-submit'
import { formatLocalDate } from '@/lib/utils'
import { contactFormSchema, subscribeFormSchema } from '@/lib/validations'
// import { headers } from 'next/headers'
import { Resend } from 'resend'

export type FormState = {
  message: string
  fields?: Record<string, string | Date | boolean>
  issues?: string[]
}

// async function IP() {
//   const FALLBACK_IP_ADDRESS = '0.0.0.0'
//   const forwardedFor = headers().get('x-forwarded-for')
//   if (forwardedFor) return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
//   return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
// }

export async function submitContactAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data)
  // console.log('contact_form_raw', formData)
  const parsed = contactFormSchema.safeParse(formData)
  // console.log('contact_form', parsed)
  // console.log('contact_form_error', parsed.error)
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

  const errorMessage = `Opps, we had an issue with your contact form submission. Please reach out to admin@twoperfectevents.com for assistance if the issue persists.`
  // const token = formData['cf-turnstile-response'] ?? ''

  // // Validate the token by calling the "/siteverify" API endpoint.
  // let formDataCf = new FormData()
  // formDataCf.append('secret', process.env.CFTS_SECRET!)
  // formDataCf.append('response', token)
  // formDataCf.append('remoteip', await IP())
  // // const idempotencyKey = crypto.randomUUID()
  // // formDataCf.append('idempotency_key', idempotencyKey)

  // const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  // const firstResult = await fetch(url, { body: formDataCf, method: 'POST' })
  // const outcome = await firstResult.json()
  // if (outcome.success) {
  // console.log('CF Turnstile success...')
  try {
    // Add new contact form submission to database
    await createContactForm({ ...(parsed.data as InsertContactForm), raw: JSON.stringify(parsed.data) })

    // Send new submission email to TPE team
    // Send confirmation email to user
    await sendBatchEmail([
      {
        to: process.env.NODE_ENV === 'development' ? ['delivered@resend.dev'] : 'leah@twoperfectevents.com',
        from: 'Two Perfect Events <contact@email.twoperfectevents.com>',
        subject: `TPE form submission from ${parsed.data.firstName}<${parsed.data.email}>`,
        react: EmailContactSubmit({
          payload: { ...parsed.data, eventDate: formatLocalDate(parsed.data?.eventDate) }
        })
      },
      {
        to: parsed.data?.email || 'leah@twoperfectevents.com',
        from: 'Two Perfect Events <contact@email.twoperfectevents.com>',
        subject: 'Thank you for contacting Two Perfect Events!',
        react: EmailContactConfirm({ name: parsed.data.firstName })
      }
    ])

    return { message: `Thank you! We will get back to you as soon as possible.` }
  } catch (error) {
    console.error('contact form error', error)
    return { message: errorMessage }
  }
  // finally {
  //   // If newsletter is checked
  //   if (parsed.data?.newsletter === 'true') {
  //     const { firstName, lastName, email, phone, eventDate, comments, referral } = parsed.data
  //     fetch('/api/resend', {
  //       method: 'POST',
  //       body: JSON.stringify({ firstName, lastName, email, phone, eventDate, comments, referral })
  //     })
  //   }
  // }
  //     // Call resend Audience & Contacts APIs
  //     await subscribeResend({ email, firstName, lastName })
  //     // Add user to subscriptions list
  //     const [person] = await createPerson({
  //       firstName,
  //       lastName,
  //       email,
  //       phone,
  //       ...(eventDate && { eventDate: eventDate?.toISOString() }),
  //       comments,
  //       referral
  //     })
  //     const [subscription] = await createSubscription({ name: 'Newsletter' })
  //     await createPersonsToSubscriptions({ personId: person.id, subscriptionId: subscription.id })
  //   }
  // }
  // } else {
  //   console.error('turnstile contact form error', outcome)
  //   return { message: errorMessage }
  // }
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

  const errorMessage = `Opps, we had an issue with your newsletter form submission. Please reach out to admin@twoperfectevents.com for assistance if the issue persists.`
  // const token = formData['cf-turnstile-response'] ?? ''

  // // Validate the token by calling the "/siteverify" API endpoint.
  // let formDataCf = new FormData()
  // formDataCf.append('secret', process.env.CFTS_SECRET!)
  // formDataCf.append('response', token)
  // formDataCf.append('remoteip', await IP())
  // // const idempotencyKey = crypto.randomUUID()
  // // formDataCf.append('idempotency_key', idempotencyKey)

  // const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  // const firstResult = await fetch(url, { body: formDataCf, method: 'POST' })
  // const outcome = await firstResult.json()
  // if (outcome.success) {
  //   // console.log('CF Turnstile success...')

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
      to: parsed.data?.email || 'me@jlee.cool',
      from: 'Two Perfect Events <contact@email.twoperfectevents.com>',
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
    return { message: errorMessage }
  }
  // } else {
  //   console.error('turnstile subscribe form error', outcome)
  //   return { message: errorMessage }
  // }
}

// Call resend Audience & Contacts APIs
export const subscribeResend = async ({
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
  // const names = name ? name.trim()?.split(' ') : []
  // const firstName = names?.length > 0 ? names[0] : ''
  // const lastName = names?.length > 1 ? names.slice(1).join(' ') : ''
  const contact = await resend.contacts.create({
    email,
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    unsubscribed: false,
    audienceId: 'a4ebedf1-1f0e-4bd8-9a2d-dcb0516f9b90'
  })
  console.log('user subscribed to newsletter', contact)
}
