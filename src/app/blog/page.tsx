import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { uid: string }
  searchParams: { [key: string]: string | string[] | undefined }
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

  return {
    title: page.data.meta_title || 'Two Perfect Events',
    description: page.data.meta_description || 'A full-service event planning company based in Palo Alto, CA.',
    openGraph: {
      title: page.data.meta_title || 'Two Perfect Events',
      images: [{ url: page.data.meta_image.url || '' }, ...previousImages]
    }
  }
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
