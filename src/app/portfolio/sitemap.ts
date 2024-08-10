import { APP_HOST } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { MetadataRoute } from 'next'
import { notFound } from 'next/navigation'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient()
  const pages = await client.getAllByType('event').catch(() => notFound())
  return pages.map((post) => ({
    url: `https://${APP_HOST}/portfolio/${post.uid}`,
    lastModified: post?.last_publication_date ? new Date(post?.last_publication_date) : new Date(),
    changeFrequency: 'daily',
    priority: 1
  }))
}
