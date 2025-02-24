import { repositoryName } from "@/prismicio";
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { PrismicPreview } from '@prismicio/next'

const PostHogPageView = dynamic(() => import('../app/PostHogPageView'))
// const PrismicPreview = dynamic(() => import('@prismicio/next').then((mod) => mod.PrismicPreview))

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PostHogPageView />
      {children}
      {process.env.NODE_ENV === 'development' && <PrismicPreview repositoryName={repositoryName ?? 'tpe-web'} />}
    </>
  )
}