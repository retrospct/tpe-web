import type { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email'
  },
  // auth: true,
  auth: {
    // tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 8, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000 // Time period to allow the max login attempts
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ]
}
