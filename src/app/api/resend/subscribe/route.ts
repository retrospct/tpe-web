import { createContactForm } from '@/drizzle/db'
import { InsertContactForm } from '@/drizzle/schema'
import { subscribeResend } from '@/lib/actions'
import { contactFormSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body: z.infer<typeof contactFormSchema> = await req.json()
    // console.log('body', body)

    const { firstName, lastName, email, phone, eventDate, comments, referral } = body
    // TODO: add a step to filter out only needed fields from body
    const resend = process.env.RESEND_ADMIN_API_KEY ? new Resend(process.env.RESEND_ADMIN_API_KEY) : null

    if (!resend || !email) {
      console.error('Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.')
      return NextResponse.json({ error: 'Error initializing resend client' }, { status: 500 })
    }
    // Call resend Audience & Contacts APIs
    await subscribeResend({ email, firstName, lastName })

    // Add new contact form submission to database
    await createContactForm({ ...(body as InsertContactForm), raw: JSON.stringify(body) })

    // // Add user to subscriptions list
    // const [person] = await createPerson({
    //   firstName,
    //   lastName,
    //   email,
    //   phone,
    //   ...(eventDate && { eventDate: eventDate?.toISOString() }),
    //   comments,
    //   referral
    // })
    // console.log('person', person)

    // const [subscription] = await createSubscription({ name: 'Newsletter' })
    // console.log('subscription', subscription)
    // await createPersonsToSubscriptions({ personId: person.id, subscriptionId: subscription.id })
    // Create contact with user data
    // const contact = await resend.contacts.create({
    //   email: body.email,
    //   ...(firstName && { firstName }),
    //   ...(lastName && { lastName }),
    //   unsubscribed: false,
    //   audienceId: 'a4ebedf1-1f0e-4bd8-9a2d-dcb0516f9b90'
    // })
    // console.log('contact', contact)

    // if (!contact?.data || contact?.error) {
    //   return NextResponse.json({ error: contact?.error || 'Adding contact to resend error!' }, { status: 500 })
    // }

    return NextResponse.json({ message: 'User subscribed to newsletter' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
