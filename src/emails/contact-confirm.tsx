import { Button, Heading, Html, Text } from '@react-email/components'
import * as React from 'react'

interface EmailContactConfirmProps {
  firstName: string
  url?: string
}

export const EmailContactConfirm: React.FC<Readonly<EmailContactConfirmProps>> = ({
  firstName,
  url = 'https://twoperfectevents.com'
}) => (
  <Html lang="en">
    <Heading as="h2">Thank you for reaching out, {firstName}!</Heading>
    <Text>We'll get back to you as soon as we can.</Text>
    <Button href={url} style={{ background: '#000', color: '#fff', padding: '12px 20px' }}>
      Click me
    </Button>
  </Html>
)
