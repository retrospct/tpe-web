import { Column, Img, Link, Row, Section } from '@react-email/components'

const baseUrl = process.env.NEXT_PUBLIC_APP_HOST ? `https://${process.env.NEXT_PUBLIC_APP_HOST}` : '/static'

const socials = [
  {
    name: 'yelp',
    url: 'https://www.yelp.com/biz/two-perfect-events-palo-alto',
    img: `${baseUrl}/img/socials/logo-yelp@2x.png`,
    alt: 'Yelp logo'
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/twoperfectevents',
    img: `${baseUrl}/img/socials/logo-instagram@2x.png`,
    alt: 'Instagram logo'
  },
  {
    name: 'facebook',
    url: 'https://www.facebook.com/twoperfectevents',
    img: `${baseUrl}/img/socials/logo-facebook@2x.png`,
    alt: 'Facebook logo'
  },
  {
    name: 'tiktok',
    url: 'https://www.tiktok.com/@twoperfectevents',
    img: `${baseUrl}/img/socials/logo-tiktok@2x.png`,
    alt: 'Tiktok logo'
  },
  {
    name: 'pinterest',
    url: 'https://www.pinterest.com/twoperfectevents',
    img: `${baseUrl}/img/socials/logo-pinterest@2x.png`,
    alt: 'Pinterest logo'
  }
]

export const FooterSocials = () => {
  return (
    <Section className="px-5">
      <Row>
        {/* Social links */}
        {socials.map((social) => (
          <Column key={social.name} width={40}>
            <Link href={social.url}>
              <Img
                src={social.img}
                width="28"
                height="28"
                alt={social.alt}
                className="rounded-full bg-[#FFFAF6] p-[5px]"
              />
            </Link>
          </Column>
        ))}
        {/* Spacer */}
        <Column />
      </Row>
    </Section>
  )
}
