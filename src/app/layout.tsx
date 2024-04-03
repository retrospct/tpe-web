import { repositoryName } from '@/prismicio'
import { PrismicPreview } from '@prismicio/next'
import { Inter } from 'next/font/google'

import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  )
}
