'use client'
import { repositoryName } from "@/prismicio";
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('../app/PostHogPageView'), { ssr: false })
const PrismicPreview = dynamic(() => import('@prismicio/next').then((mod) => mod.PrismicPreview), { ssr: false })

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PostHogPageView />
      <PrismicPreview repositoryName={repositoryName} />
      {children}
    </>
  )
}