import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import config from '../slicemachine.config.json'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 */
const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'page',
    uid: 'home',
    path: '/'
  },
  {
    type: 'page',
    path: '/:uid'
  },
  {
    type: 'page',
    uid: 'events',
    path: '/services'
  },
  // {
  //   type: 'page',
  //   uid: 'events',
  //   path: '/services/events'
  // },
  {
    type: 'page',
    uid: 'design',
    path: '/services/design'
  },
  {
    type: 'portfolio',
    path: '/portfolio'
  },
  {
    type: 'event',
    path: '/portfolio/:uid'
  },
  {
    type: 'page',
    uid: 'blog',
    path: '/blog'
  },
  {
    type: 'post',
    path: '/blog/:uid'
  },
  {
    type: 'person',
    path: '/about/team/:uid'
  }
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config
  })

  prismicNext.enableAutoPreviews({ client })

  return client
}

/**
 * Link resolver for client side link resolving
 * https://prismic.io/docs/technical-reference/prismicio-next#link-resolvers-in-the-app-router
 *
 * @param doc - The Prismic document to resolve a URL for.
 */
export function linkResolver(doc: prismic.FilledContentRelationshipField) {
  if (doc.type === 'post') {
    return '/blog/' + doc.uid
  }
  return '/'
}
