import { APP_HOST, APP_NAME } from '@/lib/utils'
import type { Metadata } from 'next'

type OpenGraphType =
  | 'article'
  | 'book'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'profile'
  | 'website'
  | 'video.tv_show'
  | 'video.other'
  | 'video.movie'
  | 'video.episode'

interface ConstructMetadataProps {
  title?: string
  description?: string
  image?: string | null
  imageSquared?: string | null
  icons?: Metadata['icons']
  noIndex?: boolean
  previousImages?: any
  type?: OpenGraphType
  url?: string | URL
  name?: string
  alternates?: Metadata['alternates']
  otherOg?: { [key: string]: string | number | Array<string | number> }
}

export function constructMetadata({
  title = `${APP_NAME} - Chic + Multicultural Weddings & Events for Creative Souls`,
  description = `${APP_NAME} is a Palo Alto, CA based event planning studio, crafting unique, unforgettable weddings and events. We specialize in personalized details and flawless execution, ensuring every celebration reflects your unique style and creates lasting memories.`, // 'A full-service event planning company based in Palo Alto, CA.'
  // url, // optional canonical url
  image = '/social-card.jpg', // 1866x980 on dub, we use 1200x630
  // imageAlt = og:image:alt
  // imageDimensions = { width: 1200, height: 630 },
  imageSquared = '/social-card_squared.jpg', // 600x600
  // imageSquaredAlt = og:image:alt
  // imageAltDimensions = { width: 1200, height: 1200 },
  icons = [
    {
      rel: 'icon',
      sizes: 'any',
      url: '/favicon.ico'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '32x32',
      url: '/apple-touch-icon.png'
    }
  ],
  noIndex = false,
  previousImages,
  type = 'website',
  url,
  name = 'Two Perfect Events',
  alternates,
  otherOg
}: ConstructMetadataProps = {}): Metadata {
  return {
    metadataBase: new URL(`https://${APP_HOST}`),
    title,
    description,
    icons,
    openGraph: {
      type,
      title,
      description,
      ...(image && {
        images: [
          { url: image, width: 1200, height: 630 },
          { url: imageSquared, width: 600, height: 600 },
          ...previousImages
        ]
      }),
      ...(url && { url }),
      ...(name && { site_name: name }),
      ...(otherOg && { ...otherOg })
    },
    twitter: {
      title,
      description,
      ...(image && { card: 'summary_large_image', images: [image] }),
      creator: '@twoperfectevent'
    },
    ...(alternates && { alternates }),
    ...(noIndex && { robots: { index: false, follow: false } })
  }
}

// node_modules/next/dist/lib/metadata/types/opengraph-types.d.ts
// type OpenGraphArticle = OpenGraphMetadata & {
//   type: 'article'
//   publishedTime?: string
//   modifiedTime?: string
//   expirationTime?: string
//   authors?: null | string | URL | Array<string | URL>
//   section?: null | string
//   tags?: null | string | Array<string>
// }

// type OpenGraphProfile = OpenGraphMetadata & {
//   type: 'profile';
//   firstName?: null | string;
//   lastName?: null | string;
//   username?: null | string;
//   gender?: null | string;
// };

// const defaultMetadata: ConstructMetadataProps = {
//   title: `${APP_NAME} - Chic + Multicultural Weddings & Events for Creative Souls`,
//   description: `${APP_NAME} is a Palo Alto-based event planning studio, crafting unique, unforgettable weddings and events. We specialize in personalized details and flawless execution, ensuring every celebration reflects your unique style and creates lasting memories.`, // 'A full-service event planning company based in Palo Alto, CA.'
//   image: 'https://twoperfectevents.com/social-card.jpg', // 1866x980 on dub, we use 1200x630
//   imageSquared = '/social-card_squared.jpg', // 1200x1200
//   icons: [
//     {
//       rel: 'icon',
//       sizes: 'any',
//       url: '/favicon.ico'
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '32x32',
//       url: '/favicon-32x32.png'
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '16x16',
//       url: '/favicon-16x16.png'
//     },
//     {
//       rel: 'apple-touch-icon',
//       sizes: '32x32',
//       url: '/apple-touch-icon.png'
//     }
//   ],
//   noIndex: false
// }
