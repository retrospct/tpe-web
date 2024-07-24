import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import { Metadata } from 'next'

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const home = await client.getByUID('page', 'home')
  // const title = `${params.domain.toUpperCase()} - A ${
  //   process.env.NEXT_PUBLIC_APP_NAME
  // } Custom Domain`;
  // const description = `${params.domain.toUpperCase()} is a custom domain on ${
  //   process.env.NEXT_PUBLIC_APP_NAME
  // } - an open-source link management tool for modern marketing teams to create, share, and track short links.`;
  // return constructMetadata({
  //   title,
  //   description,
  // });

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? '' }]
    }
  }
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient()
  const home = await client.getByUID('page', 'home')

  return <SliceZone slices={home.data.slices} components={components} />
}
