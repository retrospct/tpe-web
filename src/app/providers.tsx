'use client'

import { repositoryName } from '@/prismicio'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
// import PostHogPageView from './ph-pageview'

import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./ph-pageview'), { ssr: false })
const PrismicPreview = dynamic(() => import('@prismicio/next').then((mod) => mod.PrismicPreview), { ssr: false })

// if (typeof window !== 'undefined') {
//   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
//     api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
//     person_profiles: 'identified_only',
//     capture_pageview: false, // Disable automatic pageview capture, as we capture manually
//     capture_pageleave: true // Re-enables pageleave capture
//   })
// }

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: 'https://us.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true // Re-enables pageleave capture
    })
  }, [])
  return (
    <PostHogProvider client={posthog}>
      <PostHogPageView />
      {children}
      <PrismicPreview repositoryName={repositoryName ?? 'tpe-web'} />
    </PostHogProvider>
  )
}
