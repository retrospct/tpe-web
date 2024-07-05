import { Column, Img, Link, Row, Section } from '@react-email/components'

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''

export const FooterSocials = () => {
  return (
    <Section>
      <Row>
        <Column width={38}>
          <Link href="https://www.yelp.com/biz/two-perfect-events-palo-alto">
            <Img src={`${baseUrl}/static/img/socials/logo-yelp.png`} width="28" height="28" alt="Yelp logo" />
          </Link>
        </Column>
        <Column width={38}>
          <Link href="https://www.instagram.com/twoperfectevents">
            <Img src={`${baseUrl}/static/img/socials/logo-instagram.png`} width="28" height="28" alt="Instagram logo" />
          </Link>
        </Column>
        <Column width={38}>
          <Link href="https://www.facebook.com/twoperfectevents">
            <Img src={`${baseUrl}/static/img/socials/logo-facebook.png`} width="28" height="28" alt="Facebook logo" />
          </Link>
        </Column>
        <Column width={38}>
          <Link href="https://www.tiktok.com/@twoperfectevents">
            <Img src={`${baseUrl}/static/img/socials/logo-tiktok.png`} width="28" height="28" alt="Tiktok logo" />
          </Link>
        </Column>
        <Column width={38}>
          <Link href="https://www.pinterest.com/twoperfectevents">
            <Img src={`${baseUrl}/static/img/socials/logo-pinterest.png`} width="28" height="28" alt="Pinterest logo" />
          </Link>
        </Column>
        <Column />
      </Row>
    </Section>
  )
}
