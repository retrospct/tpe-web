import { APP_HOST, APP_NAME } from '@/lib/utils'
import type { Metadata } from 'next'

interface ConstructMetadataProps {
  title?: string
  description?: string
  image?: string | null
  imageSquared?: string | null
  icons?: Metadata['icons']
  noIndex?: boolean
  previousImages?: any
}

export function constructMetadata({
  title = `${APP_NAME} - Chic + Multicultural Weddings & Events for Creative Souls`,
  description = `${APP_NAME} is a Palo Alto-based event planning studio, crafting unique, unforgettable weddings and events. We specialize in personalized details and flawless execution, ensuring every celebration reflects your unique style and creates lasting memories.`, // 'A full-service event planning company based in Palo Alto, CA.'
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
  previousImages
}: ConstructMetadataProps = {}): Metadata {
  return {
    title,
    description,
    icons,
    openGraph: {
      title,
      description,
      ...(image && {
        images: [
          { url: image, width: 1200, height: 630 },
          { url: imageSquared, width: 600, height: 600 },
          ...previousImages
        ]
      })
    },
    twitter: {
      title,
      description,
      ...(image && { card: 'summary_large_image', images: [image] }),
      creator: '@twoperfectevent'
    },

    metadataBase: new URL(`https://${APP_HOST}`),
    ...(noIndex && { robots: { index: false, follow: false } })
  }
}

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
