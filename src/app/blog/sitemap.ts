import { APP_HOST } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { MetadataRoute } from 'next'
import { notFound } from 'next/navigation'

// { uid }: { uid: string }
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient()
  const posts = await client.getAllByType('post').catch(() => notFound())
  return posts.map((post) => ({
    url: `https://${APP_HOST}/blog/${post.uid}`,
    lastModified: post?.last_publication_date || new Date(),
    changeFrequency: 'daily',
    priority: 1
  }))
}
