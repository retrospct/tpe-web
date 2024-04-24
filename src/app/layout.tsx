import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { cn } from '@/lib/utils'
import { repositoryName } from '@/prismicio'
import { PrismicPreview } from '@prismicio/next'
import { Crimson_Pro } from 'next/font/google'
import localFont from 'next/font/local'

import '../styles/globals.css'

const crimson = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson'
})

const belgant = localFont({ src: './font/belgant-aesthetic.otf', variable: '--font-belgant' })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('bg-almond', crimson.variable, belgant.variable)}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName ?? 'tpe-web'} />
    </html>
  )
}
