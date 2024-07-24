import { APP_HOST } from '@/lib/utils'
import type { Metadata } from 'next'

export function constructMetadata({
  title = `${process.env.NEXT_PUBLIC_APP_NAME} - Link Management for Modern Marketing Teams`,
  description = `${process.env.NEXT_PUBLIC_APP_NAME} is the open-source link management infrastructure for modern marketing teams to create, share, and track short links.`,
  image = 'https://assets.dub.co/thumbnail.jpg',
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
