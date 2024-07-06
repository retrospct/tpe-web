import { Column, Img, Link, Row, Section } from '@react-email/components'

const baseUrl = process.env.APP_URL ? `https://${process.env.APP_URL}` : '/static'

export const FooterSocials = () => {
  return (
    <Section>
      <Row>
        <Column width={38}>
          <Link href="https://www.yelp.com/biz/two-perfect-events-palo-alto">
            <Img src={`${baseUrl}/img/socials/logo-yelp.png`} width="28" height="28" alt="Yelp logo" />
          </Link>
        </Column>
        <Column width={38}>
          <Link href="https://www.instagram.com/twoperfectevents">
            <Img src={`${baseUrl}/img/socials/logo-instagram.png`} width="28" height="28" alt="Instagram logo" />
          </Link>
        </Column>
        <Column width={38}>
          <Link href="https://www.facebook.com/twoperfectevents">
            <Img src={`${baseUrl}/img/socials/logo-facebook.png`} width="28" height="28" alt="Facebook logo" />
          </Link>
        </Column>
        <Column width={38}>
          <Link href="https://www.tiktok.com/@twoperfectevents">
            <Img src={`${baseUrl}/img/socials/logo-tiktok.png`} width="28" height="28" alt="Tiktok logo" />
          </Link>
        </Column>
        <Column width={38}>
          <Link href="https://www.pinterest.com/twoperfectevents">
            <Img src={`${baseUrl}/img/socials/logo-pinterest.png`} width="28" height="28" alt="Pinterest logo" />
          </Link>
        </Column>
        <Column />
      </Row>
    </Section>
  )
}
