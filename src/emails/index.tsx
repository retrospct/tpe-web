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
import { Resend } from 'resend'

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const sendEmail = async ({
  to,
  subject,
  from,
  bcc,
  text = 'ERROR: No email template provided.',
  react,
  marketing
}: {
  to: string | string[]
  subject: string
  from?: string
  bcc?: string
  text?: string
  react?: ReactElement<any, string | JSXElementConstructor<any>> | ReactNode
  marketing?: boolean
}) => {
  if (process.env.NODE_ENV === 'development' && !resend) {
    // Set up a fake email client for development
    console.info(`Email to ${to} with subject ${subject} sent from ${from || process.env.NEXT_PUBLIC_APP_NAME}`)
    return Promise.resolve()
  } else if (!resend) {
    console.error('Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.')
    return Promise.resolve()
  }

  // await resend.emails.send({
  //   from: 'you@example.com',
  //   to: 'user@gmail.com',
  //   subject: 'hello world',
  //   react: <Email url="https://example.com" />,
  // });
  return resend.emails.send({
    from:
      from || marketing
        ? 'leah@email.twoperfectevents.com'
        : process.env.NEXT_PUBLIC_IS_DUB
          ? 'system@email.twoperfectevents.com'
          : `${process.env.NEXT_PUBLIC_APP_NAME} <system@${process.env.NEXT_PUBLIC_APP_DOMAIN}>`,
    to,
    bcc,
    reply_to: from,
    // reply_to: process.env.NEXT_PUBLIC_IS_DUB
    //   ? 'team@email.twoperfectevents.com'
    //   : `team@${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
    subject,
    ...(react ? { react } : { text })
    // ...(text && { text }),
    // ...(react && { react: render(react) }),
    // ...(marketing && {
    // MessageStream: "broadcast",
    // }),
  })
}
