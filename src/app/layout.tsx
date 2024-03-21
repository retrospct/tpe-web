import { repositoryName } from '@/prismicio'
import { PrismicPreview } from '@prismicio/next'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  )
}
