import { APP_HOST } from '@/lib/utils'
import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers()
  let domain = headersList.get('host') as string

  if (domain === 'localhost:3000' || domain.endsWith('.vercel.app')) {
    // for local development and preview URLs
    domain = APP_HOST
  }

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date()
    }
  ]
}
