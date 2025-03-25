import { constructMetadata } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { isFilled } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { uid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient()
  const home = await client.getByUID('page', 'home')
  const previousImages = (await parent).openGraph?.images || []
  const metadata = constructMetadata({
    ...(isFilled.keyText(home.data.meta_title) && { title: home.data.meta_title as string }),
    ...(isFilled.keyText(home.data.meta_description) && { description: home.data.meta_description as string }),
    image: home.data.meta_image.url,
    previousImages
  })

  // <meta property="og:site_name" content="Link preview site name">
  // <meta property="og:url" content="Canonical link preview URL">

  return metadata
}

export default async function Index({ params, searchParams }: Props) {
  // The client queries content from the Prismic API
  const client = createClient()
  const home = await client.getByUID('page', 'home')

  return <SliceZone slices={home.data.slices} components={components} />
}
