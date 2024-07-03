import { capitalize } from '@/lib/utils'
import { Body, Container, Head, Heading, Html, Preview, Section, Tailwind, Text } from '@react-email/components'
import * as React from 'react'

interface EmailContactSubmitProps {
  payload: any
}

const defaultPayload = {
  name: 'Guest',
  email: 'missing@email.com',
  phone: '4158301739',
  eventDate: '2024-01-01',
  comments: 'Hello, world!',
  referral: 'Yelp page',
  newsletter: true
}

export const EmailContactSubmit: React.FC<Readonly<EmailContactSubmitProps>> = ({ payload = defaultPayload }) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            primary: '#9E3811',
            secondary: '#EEC8CB',
            foreground: '#5B3613',
            background: '#FFFAF6',
            accent: '#FCF4EC'
          }
        }
      }
    }}
  >
    <Html lang="en">
      <Head>
        <title>Two Perfect Events - new form submission</title>
      </Head>
      <Preview>{`New form submission - ${payload?.name}<${payload?.email}>`}</Preview>
      <Body>
        <Container>
          <Heading as="h2">New contact form submission!</Heading>
          {payload &&
            Object.keys(payload).map((key) => (
              <Section key={key}>
                <div className="mb-3 flex w-full items-center p-1">
                  <Heading as="h3" className="m-0 text-base">
                    {capitalize(key)}:&nbsp;
                  </Heading>
                  <Text className="m-0 text-base">
                    {key === 'newsletter' ? JSON.stringify(payload[key]) : payload[key]}
                  </Text>
                </div>
              </Section>
            ))}
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

export default EmailContactSubmit
