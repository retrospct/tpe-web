import { APP_HOST } from '@/lib/utils'
import { MetadataRoute } from 'next'
import siteconfig from '../../siteconfig.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let sites: MetadataRoute.Sitemap = []
  siteconfig.forEach((site) =>
    sites.push({
      url: `https://${APP_HOST}${site.source}` as string,
      lastModified: new Date(),
      changeFrequency: (site?.changeFrequency || 'daily') as
        | 'daily'
        | 'always'
        | 'hourly'
        | 'weekly'
        | 'monthly'
        | 'yearly'
        | 'never'
        | undefined,
      priority: site?.priority || 0.75
    })
  )
  const sitemap = mainsites.concat(sites)
  console.log('mainsites.concat(sites)', mainsites.concat(sites))
  return sitemap
}

const mainsites: MetadataRoute.Sitemap = [
  {
    url: `https://${APP_HOST}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://${APP_HOST}/about`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://${APP_HOST}/contact`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://${APP_HOST}/portfolio`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://${APP_HOST}/services`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://${APP_HOST}/services/design`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://${APP_HOST}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://${APP_HOST}/photo-credits`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.75
  },
  {
    url: `https://${APP_HOST}/privacy`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.75
  },
]
