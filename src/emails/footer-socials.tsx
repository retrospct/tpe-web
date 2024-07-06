import { Column, Img, Link, Row, Section } from '@react-email/components'

const baseUrl = process.env.APP_URL ? `https://${process.env.APP_URL}` : '/static'

export const FooterSocials = () => {
  return (
    <Section className="px-5">
      <Row>
        <Column width={40}>
          <Link href="https://www.yelp.com/biz/two-perfect-events-palo-alto">
            <Img
              src={`${baseUrl}/img/socials/logo-yelp@2x.png`}
              width="28"
              height="28"
              alt="Yelp logo"
              className="rounded-full bg-[#FFFAF6] p-[5px]"
            />
          </Link>
        </Column>
        <Column width={40}>
          <Link href="https://www.instagram.com/twoperfectevents">
            <Img
              src={`${baseUrl}/img/socials/logo-instagram@2x.png`}
              width="28"
              height="28"
              alt="Instagram logo"
              className="rounded-full bg-[#FFFAF6] p-[5px]"
            />
          </Link>
        </Column>
        <Column width={40}>
          <Link href="https://www.facebook.com/twoperfectevents">
            <Img
              src={`${baseUrl}/img/socials/logo-facebook@2x.png`}
              width="28"
              height="28"
              alt="Facebook logo"
              className="rounded-full bg-[#FFFAF6] p-[5px]"
            />
          </Link>
        </Column>
        <Column width={40}>
          <Link href="https://www.tiktok.com/@twoperfectevents">
            <Img
              src={`${baseUrl}/img/socials/logo-tiktok@2x.png`}
              width="28"
              height="28"
              alt="Tiktok logo"
              className="rounded-full bg-[#FFFAF6] p-[5px]"
            />
          </Link>
        </Column>
        <Column width={40}>
          <Link href="https://www.pinterest.com/twoperfectevents">
            <Img
              src={`${baseUrl}/img/socials/logo-pinterest@2x.png`}
              width="28"
              height="28"
              alt="Pinterest logo"
              className="rounded-full bg-[#FFFAF6] p-[5px]"
            />
          </Link>
        </Column>
        <Column />
      </Row>
    </Section>
  )
}
