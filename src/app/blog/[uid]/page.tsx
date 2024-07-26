import { Heading, Text } from '@/components'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import { ArrowLeft } from 'lucide-react'
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: { uid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: Props) {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())

  return (
    <div className="mx-auto mb-14 mt-4 max-w-5xl px-3">
      <Separator className="mx-auto mb-14 max-w-xl" />
      <Heading richText={page.data.title} accents className="mb-12 text-pretty text-center uppercase" />
      <SliceZone slices={page.data.slices} components={components} />
      <Text richText={page.data.content} />
      <section className="flex w-full flex-col items-center gap-6 text-center text-primary">
        <div className="my-16 flex w-full max-w-6xl flex-col items-center justify-center gap-6 lg:flex-row">
          <div className="order-2 flex flex-1 items-center justify-center gap-3 lg:order-1">
            <ArrowLeft className="h-4 w-4 text-primary" />
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: 'link' }), 'w-fit p-0 text-xl font-medium italic tracking-wider')}
            >
              BACK TO BLOG
            </Link>
          </div>
          <div className="order-1 flex-1 lg:order-2">
            <Link href="/contact" className={cn(buttonVariants({ variant: 'default' }), 'italic')}>
              BOOK NOW
            </Link>
          </div>
          <div className="order-3 flex-1" />
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient()
  const post = await client.getByUID('post', params.uid).catch(() => notFound())
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.data.meta_title || 'Two Perfect Events',
    description: post.data.meta_description || 'A full-service event planning company based in Palo Alto, CA.',
    openGraph: {
      title: post.data.meta_title || 'Two Perfect Events',
      images: [{ url: post.data.meta_image.url || '' }, ...previousImages]
    }
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const posts = await client.getAllByType('post')

  return posts.map((post) => {
    return { uid: post.uid }
  })
}
