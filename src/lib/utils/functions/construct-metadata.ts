import { APP_HOST } from '@/lib/utils'
import type { Metadata } from 'next'

export function constructMetadata({
  title = `${process.env.NEXT_PUBLIC_APP_NAME} - Chic + Multicultural Weddings & Events for Creative Souls`,
  description = `${process.env.NEXT_PUBLIC_APP_NAME} believes weddings should be as unique as your love story and events should create core memories for all that attend. We embrace the unconventional to plan the most fun, authentic, and take-your-breath-away event experiences.`,
  image = 'https://twoperfectevents.com/social-card.jpg', // 1866x980
  icons = [
    // {
    //   rel: "icon",
    //   sizes: "any",
    //   url: "/favicon.ico"
    // },
    {
      rel: 'apple-touch-icon',
      sizes: '32x32',
      url: '/apple-touch-icon.png'
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
    }
  ],
  noIndex = false,
  previousImages
}: {
  title?: string
  description?: string
  image?: string | null
  icons?: Metadata['icons']
  noIndex?: boolean
  previousImages?: any
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: [
          {
            url: image
          },
          ...previousImages
        ]
      })
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: 'summary_large_image',
        images: [image]
      }),
      creator: '@twoperfectevents'
    },
    icons,
    metadataBase: new URL(`https://${APP_HOST}`),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
