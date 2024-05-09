import type { CollectionConfig } from 'payload/types'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'email'
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ]
}
