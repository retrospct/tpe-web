import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { repositoryName } from '@/prismicio'
import { GoogleAnalytics } from '@next/third-parties/google'
import { PrismicPreview } from '@prismicio/next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Crimson_Pro } from 'next/font/google'
import localFont from 'next/font/local'
import { PHProvider } from './providers'

import '../styles/globals.css'

const crimson = Crimson_Pro({ subsets: ['latin'], variable: '--font-crimson', preload: true })
const belgant = localFont({ src: './font/belgant-aesthetic.otf', variable: '--font-belgant', preload: true })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-background focus-visible:ring-accent-hover min-h-screen overflow-x-hidden font-sans antialiased',
        crimson.variable,
        belgant.variable
      )}
    >
      <PHProvider>
        <body>
          <Nav />
          {children}
          <Footer />
          <Toaster position="bottom-center" richColors />
          {process.env.NODE_ENV === 'development' && <PrismicPreview repositoryName={repositoryName ?? 'tpe-web'} />}
          <SpeedInsights sampleRate={0.5} />
          <Analytics />
        </body>
      </PHProvider>
      <GoogleAnalytics gaId="G-BK1E6E3S2L" />
    </html>
  )
}

// import { sendGAEvent } from '@next/third-parties/google'
// {/* <button
//   onClick={() => sendGAEvent({ event: 'buttonClicked', value: 'xyz' })}
// >
//   Send Event
// </button> */}
