import { capitalize } from '@/lib/utils'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
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

const baseUrl = process.env.APP_URL ? `https://${process.env.APP_URL}` : '/static'

export const EmailContactSubmit: React.FC<Readonly<EmailContactSubmitProps>> = ({ payload = defaultPayload }) => {
  const previewText = `New form submission - ${payload?.name}<${payload?.email}>`
  return (
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
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="mx-auto my-auto bg-white px-2 font-sans">
            <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] px-5 pb-5">
              <Section className="bg-white p-3">
                <Link href="https://twoperfectevents.com">
                  <Img
                    src={`${baseUrl}/img/logo-tpe@2x.png`}
                    width="266"
                    height="124"
                    alt="Two Perfect Events"
                    className="mx-auto my-0"
                  />
                </Link>
              </Section>
              <Heading as="h2" className="mx-0 my-8 text-balance p-0 text-[24px] font-normal text-black">
                New contact form submission!
              </Heading>
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
        </Tailwind>
      </Html>
    </Tailwind>
  )
}

export default EmailContactSubmit
