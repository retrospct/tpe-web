import { Body, Head, Heading, Html, Preview, Text } from '@react-email/components'
import * as React from 'react'

interface EmailContactConfirmProps {
  name: string
  replyTo?: string
  // url?: string
}

export const EmailContactConfirm: React.FC<Readonly<EmailContactConfirmProps>> = ({
  name = 'guest',
  replyTo = 'team@twoperfectevents.com'
  // url = 'https://twoperfectevents.com'
}) => (
  <Html lang="en">
    <Head />
    <Preview>{`Thank you for reaching out, we will get back to you asap. - TPE Team<${replyTo}>`}</Preview>
    <Body>
      <Heading as="h2">Thank you for reaching out, {name}!</Heading>
      <Text>We'll get back to you as soon as we can.</Text>
      {/* <Button href={url} style={{ background: '#000', color: '#fff', padding: '12px 20px' }}>
      Click me
    </Button> */}
    </Body>
  </Html>
)

export default EmailContactConfirm
