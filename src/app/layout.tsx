import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { repositoryName } from '@/prismicio'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Crimson_Pro } from 'next/font/google'
import localFont from 'next/font/local'
import { PHProvider } from './providers'

import dynamic from 'next/dynamic'
import '../styles/globals.css'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), { ssr: false })
const PrismicPreview = dynamic(() => import('@prismicio/next').then((mod) => mod.PrismicPreview), { ssr: false })

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
        'min-h-screen overflow-x-hidden bg-background font-sans antialiased focus-visible:ring-accent-hover',
        crimson.variable,
        belgant.variable
      )}
    >
      <PHProvider>
        <body>
          <Nav />
          <PostHogPageView />
          {children}
          <Footer />
          <Toaster position="bottom-center" richColors />
          <PrismicPreview repositoryName={repositoryName ?? 'tpe-web'} />
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
