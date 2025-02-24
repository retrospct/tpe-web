import { constructMetadata } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { isFilled } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Params, SearchParams } from '@/lib/types'

type Props = {
  params: Params
  searchParams: SearchParams
}

export default async function Page() {
  const client = createClient()
  const page = await client
    .getByUID('page', 'blog', {
      fetchLinks: ['posts', 'post', 'post.uid', 'post.title', 'post.preview', 'post.thumbnail']
    })
    .catch(() => notFound())

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('page', 'blog').catch(() => notFound())
  const previousImages = (await parent).openGraph?.images || []
  const metadata = constructMetadata({
    ...(isFilled.keyText(page.data.meta_title) && { title: page.data.meta_title as string }),
    ...(isFilled.keyText(page.data.meta_description) && { description: page.data.meta_description as string }),
    image: page.data.meta_image.url,
    previousImages
  })

  return metadata
}

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType('page', {
//     fetchLinks: ['posts', 'post', 'post.uid', 'post.title', 'post.preview', 'post.thumbnail']
//   })

//   return pages.map((page) => {
//     return { uid: page.uid }
//   })
// }
