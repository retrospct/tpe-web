import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import { FooterSocials } from './footer-socials'

interface EmailContactConfirmProps {
  name: string
  // replyTo?: string
  previewText?: string
  subject?: string
  body?: string
}

const baseUrl = process.env.APP_URL ? `https://${process.env.APP_URL}` : '/static'

export const EmailContactConfirm = ({
  name = 'guest',
  // replyTo = 'team@twoperfectevents.com',
  previewText = 'Thank you for contacting Two Perfect Events!',
  subject = 'Thank you for reaching out!',
  body = 'We will get back to you as soon as we can.'
}: EmailContactConfirmProps) => {
  // const previewText = `Thank you for contacting Two Perfect Events! - TPE Team<${replyTo}>`
  const firstName = name.trim().split(' ')[0]
  return (
    <Html lang="en">
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-1 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] pb-5">
            <Section className="bg-[#FFFAF6] p-3">
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
            <Section className="px-5">
              <Heading className="mx-0 my-8 text-balance p-0 text-[24px] font-normal text-black">{subject}</Heading>
              <Text className="text-[14px] leading-[24px] text-black">Hello {firstName},</Text>
              <Text className="text-pretty text-[14px] leading-[24px] text-black">{body}</Text>
              <Text className="text-[14px] leading-[24px] text-black">
                Sincerely,
                <br />
                <strong>The TPE team</strong>
              </Text>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <FooterSocials />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

EmailContactConfirm.PreviewProps = {
  name: 'Justin',
  // replyTo: 'no-reply@email.twoperfectevents.com',
  previewText: 'Thank you for contacting Two Perfect Events!',
  subject: 'Thank you for reaching out!',
  body: 'We will get back to you as soon as we can.'
} as EmailContactConfirmProps

export default EmailContactConfirm
