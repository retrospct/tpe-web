import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// type Params = { uid: string }

export default async function Page() {
  const client = createClient()
  const page = await client.getByUID('page', 'blog').catch(() => notFound())

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('page', 'blog').catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('page')

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
