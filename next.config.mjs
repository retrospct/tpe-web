/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@react-email/components', '@react-email/render', '@react-email/tailwind']
    //   optimizePackageImports: ['package-name']
  },
  transpilePackages: ['lucide-react'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      },
      {
        source: '/services/events',
        destination: '/services',
        permanent: true
      },
      {
        source: '/annies-biography',
        destination: '/about/team/annie-liou',
        permanent: true
      },
      {
        source: '/yokos-biography',
        destination: '/about/team/yoko-ohara',
        permanent: true
      },
      {
        source: '/justin-biography',
        destination: '/about/team/justin-lee',
        permanent: true
      },
      {
        source: '/justines-biography',
        destination: '/about/team/justine-alberto',
        permanent: true
      },
      {
        source: '/leah-biography',
        destination: '/about/team/leah-hwung',
        permanent: true
      },
      {
        source: '/leos-biography',
        destination: '/about/team/leo-huey',
        permanent: true
      },
      {
        source: '/marissa-biography',
        destination: '/about/team/marissa-velez',
        permanent: true
      },
      {
        source: '/mary-biography',
        destination: '/about/team/mary-vargas',
        permanent: true
      },
      {
        source: '/monicas-biography',
        destination: '/about/team/monica-luong',
        permanent: true
      },
      {
        source: '/natalies-biography',
        destination: '/about/team/natalie-mata',
        permanent: true
      },
      {
        source: '/staceys-biography',
        destination: '/about/team/stacey-park',
        permanent: true
      },
      {
        source: '/amy-josh',
        destination: '/portfolio/amy-josh',
        permanent: true
      },
      {
        source: '/backyard-transformation',
        destination: '/portfolio/backyard-farm-to-table',
        permanent: true
      },
      {
        source: '/brazilian-room',
        destination: '/portfolio/brazilian-room-ethereal-spring-blooms',
        permanent: true
      },
      {
        source: '/cal-academy-of-sciences',
        destination: '/portfolio/cal-academy-of-sciences',
        permanent: true
      },
      {
        source: '/city-of-palo-alto-employee-appreciation',
        destination: '/portfolio/city-of-palo-alto-employee-appreciation',
        permanent: true
      },
      {
        source: '/city-tropical',
        destination: '/portfolio/city-tropical',
        permanent: true
      },
      {
        source: '/greenhouse',
        destination: '/portfolio/eclectic-greenhouse',
        permanent: true
      },
      {
        source: '/hillsdale-high-1983-30-year-reunion',
        destination: '/portfolio/hillsdale-high-1983-30-year-reunion',
        permanent: true
      },
      {
        source: '/intercultural-fusion',
        destination: '/portfolio/intercultural-fusion',
        permanent: true
      },
      {
        source: '/jennifer-jimmy',
        destination: '/portfolio/jennifer-jimmy',
        permanent: true
      },
      {
        source: '/meg-tom',
        destination: '/portfolio/meg-tom',
        permanent: true
      },
      {
        source: '/mexicoinspired-wine-countr',
        destination: '/portfolio/mexicoinspired-wine-countr',
        permanent: true
      },
      {
        source: '/moongate-lounge',
        destination: '/portfolio/moongate-lounge',
        permanent: true
      },
      {
        source: '/oceanside-proposal',
        destination: '/portfolio/oceanside-proposal',
        permanent: true
      },
      {
        source: '/porsche-outing',
        destination: '/portfolio/signal-fx-private-jet-and-porsche-experience-day',
        permanent: true
      },
      {
        source: '/portfolio-1',
        destination: '/portfolio',
        permanent: true
      },
      {
        source: '/rajiv-jenny',
        destination: '/portfolio/rajiv-jenny',
        permanent: true
      },
      {
        source: '/redwoods-romance',
        destination: '/portfolio/redwoods-romance',
        permanent: true
      },
      {
        source: '/rosewood-sand-hill',
        destination: '/portfolio/rosewood-sand-hill',
        permanent: true
      },
      {
        source: '/san-francisco-burning-man-inspired',
        destination: '/portfolio/san-francisco-burning-man-inspired',
        permanent: true
      },
      {
        source: '/san-francisco-chinatown',
        destination: '/portfolio/san-francisco-chinatown',
        permanent: true
      },
      {
        source: '/san-francisco-city-hall',
        destination: '/portfolio/san-francisco-city-hall',
        permanent: true
      },
      {
        source: '/sf-chinatown',
        destination: '/portfolio/san-francisco-chinatown',
        permanent: true
      },
      {
        source: '/signalfx',
        destination: '/portfolio/signal-fx-private-jet-and-porsche-experience-day',
        permanent: true
      },
      {
        source: '/sip-see-shower',
        destination: '/portfolio/winnie-the-pooh-sip-and-see-shower',
        permanent: true
      },
      {
        source: '/sonoma-winery',
        destination: '/portfolio/sonoma-winery',
        permanent: true
      },
      {
        source: '/terra-gallery',
        destination: '/portfolio/terra-gallery',
        permanent: true
      },
      {
        source: '/thomas-fogarty-winery-jullia-paul',
        destination: '/portfolio/thomas-fogarty-winery-jullia-paul',
        permanent: true
      },
      {
        source: '/triple-s-ranch',
        destination: '/portfolio/triple-s-ranch',
        permanent: true
      }
    ]
  }
}
export default nextConfig
