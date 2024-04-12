import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const post = await client.getByUID('post', params.uid).catch(() => notFound())

  return <SliceZone slices={post.data.slices} components={components} />
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient()
  const post = await client.getByUID('post', params.uid).catch(() => notFound())

  return {
    title: post.data.meta_title,
    description: post.data.meta_description
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const posts = await client.getAllByType('post')

  return posts.map((post) => {
    return { uid: post.uid }
  })
}
