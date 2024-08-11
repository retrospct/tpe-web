import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Two Perfect Events & Weddings',
    short_name: 'Two Perfect Events',
    description:
      'Two Perfect Events is a Palo Alto, CA based event planning studio, crafting unique, unforgettable weddings and events. We specialize in personalized details and flawless execution, ensuring every celebration reflects your unique style and creates lasting memories.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  }
}
