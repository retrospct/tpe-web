import DismissableBanner from '@/components/DismissableBanner'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
// import { repositoryName } from '@/prismicio'
import { GoogleAnalytics } from '@next/third-parties/google'
// import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Crimson_Pro } from 'next/font/google'
import localFont from 'next/font/local'
import { PreloadResources } from './preload-resources'
import { PHProvider } from './providers'
// import dynamic from 'next/dynamic'

import '../styles/globals.css'

// const PostHogPageView = dynamic(() => import('./ph-pageview'), { ssr: false })
// const PrismicPreview = dynamic(() => import('@prismicio/next').then((mod) => mod.PrismicPreview), { ssr: false })

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
      <PreloadResources />
      <body>
        <PHProvider>
          <DismissableBanner>
            We&apos;re hiring for our next content creator + event producer! Please send a resume to{' '}
            <a
              href="mailto:leah@twoperfectevents.com?subject=Content%20Creator%20%2B%20Event%20Producer%20Role"
              target="_blank"
              rel="noopener noreferrer"
            >
              leah@twoperfectevents.com
            </a>{' '}
            to apply.
          </DismissableBanner>
          <Nav />
          {/* <PostHogPageView /> */}
          {children}
          <Footer />
          <Toaster position="bottom-center" richColors />
          <SpeedInsights sampleRate={0.5} />
          {/* <Analytics /> */}
          {/* <PrismicPreview repositoryName={repositoryName ?? 'tpe-web'} /> */}
        </PHProvider>
      </body>
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
