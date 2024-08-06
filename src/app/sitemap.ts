import { MetadataRoute } from 'next'
import siteconfig from '../../siteconfig.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let sites: MetadataRoute.Sitemap = []
  siteconfig.forEach((site) =>
    sites.push({
      url: `https://twopefectevents.com${site.source}` as string,
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
    url: `https://twopefectevents.com`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://twopefectevents.com/about`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://twopefectevents.com/contact`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://twopefectevents.com/portfolio`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://twopefectevents.com/services`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: `https://twopefectevents.com/services/design`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  }
]
