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
    const redirects = sites.map((site) => {
      return {
        source: site.oldPath,
        destination: site.newPath,
        permanent: true
      }
    })
    return redirects
  }
}
export default nextConfig

const sites = [
  {
    source: '/home',
    destination: '/',
    permanent: true,
    priority: 1,
    changeFrequency: 'daily'
  },
  {
    source: '/services/events',
    destination: '/services',
    permanent: true,
    priority: 1,
    changeFrequency: 'daily'
  },
  {
    source: '/annies-biography',
    destination: '/about/team/annie-liou',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/yokos-biography',
    destination: '/about/team/yoko-ohara',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/justin-biography',
    destination: '/about/team/justin-lee',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/justines-biography',
    destination: '/about/team/justine-alberto',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/leah-biography',
    destination: '/about/team/leah-hwung',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/leos-biography',
    destination: '/about/team/leo-huey',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/marissa-biography',
    destination: '/about/team/marissa-velez',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/mary-biography',
    destination: '/about/team/mary-vargas',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/monicas-biography',
    destination: '/about/team/monica-luong',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/natalies-biography',
    destination: '/about/team/natalie-mata',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/staceys-biography',
    destination: '/about/team/stacey-park',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/amy-josh',
    destination: '/portfolio/amy-josh',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/backyard-transformation',
    destination: '/portfolio/backyard-farm-to-table',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/brazilian-room',
    destination: '/portfolio/brazilian-room-ethereal-spring-blooms',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/cal-academy-of-sciences',
    destination: '/portfolio/cal-academy-of-sciences',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/city-of-palo-alto-employee-appreciation',
    destination: '/portfolio/city-of-palo-alto-employee-appreciation',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/city-tropical',
    destination: '/portfolio/city-tropical',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/city-tropical-1',
    destination: '/portfolio/city-tropical',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/greenhouse',
    destination: '/portfolio/eclectic-greenhouse',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/hillsdale-high-1983-30-year-reunion',
    destination: '/portfolio/hillsdale-high-1983-30-year-reunion',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/new-gallery-1',
    destination: '/portfolio/hillsdale-high-1983-30-year-reunion',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/intercultural-fusion',
    destination: '/portfolio/intercultural-fusion',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/intercultural-fusion-1',
    destination: '/portfolio/intercultural-fusion',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/jennifer-jimmy',
    destination: '/portfolio/jennifer-jimmy',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/new-gallery-4',
    destination: '/portfolio/jennifer-jimmy',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/meg-tom',
    destination: '/portfolio/meg-tom',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/new-gallery',
    destination: '/portfolio/meg-tom',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/mexicoinspired-wine-countr',
    destination: '/portfolio/mexico-inspired-wine-country',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/mexico-inspired-wine-country',
    destination: '/portfolio/mexico-inspired-wine-country',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/moongate-lounge',
    destination: '/portfolio/moongate-lounge',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/oceanside-proposal',
    destination: '/portfolio/oceanside-proposal',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/porsche-outing',
    destination: '/portfolio/signal-fx-private-jet-and-porsche-experience-day',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/portfolio-1',
    destination: '/portfolio',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/rajiv-jenny',
    destination: '/portfolio/rajiv-jenny',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/redwoods-romance',
    destination: '/portfolio/redwoods-romance',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/rosewood-sand-hill',
    destination: '/portfolio/rosewood-sand-hill',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/new-gallery-3',
    destination: '/portfolio/rosewood-sand-hill',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/new-gallery-3',
    destination: '/portfolio/rosewood-sand-hill',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/san-francisco-burning-man-inspired',
    destination: '/portfolio/san-francisco-burning-man-inspired',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/san-francisco-chinatown',
    destination: '/portfolio/san-francisco-chinatown',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/san-francisco-city-hall',
    destination: '/portfolio/san-francisco-city-hall',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/sf-chinatown',
    destination: '/portfolio/san-francisco-chinatown',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/signalfx',
    destination: '/portfolio/signal-fx-private-jet-and-porsche-experience-day',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/sip-see-shower',
    destination: '/portfolio/winnie-the-pooh-sip-and-see-shower',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/sonoma-winery',
    destination: '/portfolio/sonoma-winery',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/sonoma-winery-1',
    destination: '/portfolio/sonoma-winery',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/terra-gallery',
    destination: '/portfolio/terra-gallery',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/terra-gallery-1',
    destination: '/portfolio/terra-gallery',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/thomas-fogarty-winery-jullia-paul',
    destination: '/portfolio/thomas-fogarty-winery-jullia-paul',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/thomas-fogarty-winery-jullia-paul-1',
    destination: '/portfolio/thomas-fogarty-winery-jullia-paul',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/triple-s-ranch',
    destination: '/portfolio/triple-s-ranch',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  },
  {
    source: '/triple-s-ranch-1',
    destination: '/portfolio/triple-s-ranch',
    permanent: true,
    priority: 0.75,
    changeFrequency: 'daily'
  }
]

// [
//   {
//     source: '/home',
//     destination: '/',
//     permanent: true
//   },
//   {
//     source: '/services/events',
//     destination: '/services',
//     permanent: true
//   },
//   {
//     source: '/annies-biography',
//     destination: '/about/team/annie-liou',
//     permanent: true
//   },
//   {
//     source: '/yokos-biography',
//     destination: '/about/team/yoko-ohara',
//     permanent: true
//   },
//   {
//     source: '/justin-biography',
//     destination: '/about/team/justin-lee',
//     permanent: true
//   },
//   {
//     source: '/justines-biography',
//     destination: '/about/team/justine-alberto',
//     permanent: true
//   },
//   {
//     source: '/leah-biography',
//     destination: '/about/team/leah-hwung',
//     permanent: true
//   },
//   {
//     source: '/leos-biography',
//     destination: '/about/team/leo-huey',
//     permanent: true
//   },
//   {
//     source: '/marissa-biography',
//     destination: '/about/team/marissa-velez',
//     permanent: true
//   },
//   {
//     source: '/mary-biography',
//     destination: '/about/team/mary-vargas',
//     permanent: true
//   },
//   {
//     source: '/monicas-biography',
//     destination: '/about/team/monica-luong',
//     permanent: true
//   },
//   {
//     source: '/natalies-biography',
//     destination: '/about/team/natalie-mata',
//     permanent: true
//   },
//   {
//     source: '/staceys-biography',
//     destination: '/about/team/stacey-park',
//     permanent: true
//   },
//   {
//     source: '/amy-josh',
//     destination: '/portfolio/amy-josh',
//     permanent: true
//   },
//   {
//     source: '/backyard-transformation',
//     destination: '/portfolio/backyard-farm-to-table',
//     permanent: true
//   },
//   {
//     source: '/brazilian-room',
//     destination: '/portfolio/brazilian-room-ethereal-spring-blooms',
//     permanent: true
//   },
//   {
//     source: '/cal-academy-of-sciences',
//     destination: '/portfolio/cal-academy-of-sciences',
//     permanent: true
//   },
//   {
//     source: '/city-of-palo-alto-employee-appreciation',
//     destination: '/portfolio/city-of-palo-alto-employee-appreciation',
//     permanent: true
//   },
//   {
//     source: '/city-tropical',
//     destination: '/portfolio/city-tropical',
//     permanent: true
//   },
//   {
//     source: '/greenhouse',
//     destination: '/portfolio/eclectic-greenhouse',
//     permanent: true
//   },
//   {
//     source: '/hillsdale-high-1983-30-year-reunion',
//     destination: '/portfolio/hillsdale-high-1983-30-year-reunion',
//     permanent: true
//   },
//   {
//     source: '/intercultural-fusion',
//     destination: '/portfolio/intercultural-fusion',
//     permanent: true
//   },
//   {
//     source: '/jennifer-jimmy',
//     destination: '/portfolio/jennifer-jimmy',
//     permanent: true
//   },
//   {
//     source: '/meg-tom',
//     destination: '/portfolio/meg-tom',
//     permanent: true
//   },
//   {
//     source: '/mexicoinspired-wine-countr',
//     destination: '/portfolio/mexicoinspired-wine-countr',
//     permanent: true
//   },
//   {
//     source: '/moongate-lounge',
//     destination: '/portfolio/moongate-lounge',
//     permanent: true
//   },
//   {
//     source: '/oceanside-proposal',
//     destination: '/portfolio/oceanside-proposal',
//     permanent: true
//   },
//   {
//     source: '/porsche-outing',
//     destination: '/portfolio/signal-fx-private-jet-and-porsche-experience-day',
//     permanent: true
//   },
//   {
//     source: '/portfolio-1',
//     destination: '/portfolio',
//     permanent: true
//   },
//   {
//     source: '/rajiv-jenny',
//     destination: '/portfolio/rajiv-jenny',
//     permanent: true
//   },
//   {
//     source: '/redwoods-romance',
//     destination: '/portfolio/redwoods-romance',
//     permanent: true
//   },
//   {
//     source: '/rosewood-sand-hill',
//     destination: '/portfolio/rosewood-sand-hill',
//     permanent: true
//   },
//   {
//     source: '/san-francisco-burning-man-inspired',
//     destination: '/portfolio/san-francisco-burning-man-inspired',
//     permanent: true
//   },
//   {
//     source: '/san-francisco-chinatown',
//     destination: '/portfolio/san-francisco-chinatown',
//     permanent: true
//   },
//   {
//     source: '/san-francisco-city-hall',
//     destination: '/portfolio/san-francisco-city-hall',
//     permanent: true
//   },
//   {
//     source: '/sf-chinatown',
//     destination: '/portfolio/san-francisco-chinatown',
//     permanent: true
//   },
//   {
//     source: '/signalfx',
//     destination: '/portfolio/signal-fx-private-jet-and-porsche-experience-day',
//     permanent: true
//   },
//   {
//     source: '/sip-see-shower',
//     destination: '/portfolio/winnie-the-pooh-sip-and-see-shower',
//     permanent: true
//   },
//   {
//     source: '/sonoma-winery',
//     destination: '/portfolio/sonoma-winery',
//     permanent: true
//   },
//   {
//     source: '/terra-gallery',
//     destination: '/portfolio/terra-gallery',
//     permanent: true
//   },
//   {
//     source: '/thomas-fogarty-winery-jullia-paul',
//     destination: '/portfolio/thomas-fogarty-winery-jullia-paul',
//     permanent: true
//   },
//   {
//     source: '/triple-s-ranch',
//     destination: '/portfolio/triple-s-ranch',
//     permanent: true
//   }
// ]
