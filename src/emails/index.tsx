// sendEmail({
//   email: user.email as string,
//   from: "steven@dub.co",
//   subject: `${
//     attemptCount == 2
//       ? "2nd notice: "
//       : attemptCount == 3
//         ? "3rd notice: "
//         : ""
//   }Your payment for Dub.co failed`,
//   react: (
//     <FailedPayment
//       attemptCount={attemptCount}
//       amountDue={amountDue}
//       user={{
//         name: user.name,
//         email: user.email as string,
//       }}
//       workspace={workspace}
//     />
//   ),
// }),

import { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import { CreateBatchOptions, CreateEmailOptions, Resend } from 'resend'

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface SendEmailProps {
  to: string | string[]
  subject: string
  from?: string
  replyTo?: string
  bcc?: string
  text?: string
  react?: ReactElement<any, string | JSXElementConstructor<any>> | ReactNode
  // marketing?: boolean
}

export const sendEmail = async ({
  to,
  subject,
  from = 'Two Perfect Events <contact@email.twoperfectevents.com>',
  replyTo = 'contact@email.twoperfectevents.com',
  // bcc,
  // text = 'ERROR: No email template provided.',
  react,
  ...rest
  // marketing
}: CreateEmailOptions) => {
  // if (process.env.NODE_ENV === 'development' && !resend) {
  //   // Set up a fake email client for development
  //   console.info(`Email to ${to} with subject ${subject} sent from ${from || process.env.NEXT_PUBLIC_APP_NAME}`)
  //   return Promise.resolve()
  // } else if
  if (!resend) {
    console.error('Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.')
    return Promise.resolve()
  }

  return resend.emails.send({
    from,
    to,
    // bcc,
    replyTo,
    subject,
    react,
    ...rest
    // ...(react ? { react } : { text })
    // ...(text && { text }),
    // ...(react && { react: render(react) }),
    // ...(marketing && {
    // MessageStream: "broadcast",
    // }),
  })
}

export const sendBatchEmail = async (emails: CreateBatchOptions) => {
  if (!resend) {
    console.error('Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.')
    return Promise.resolve()
  }

  return resend.batch.send(emails)
}
