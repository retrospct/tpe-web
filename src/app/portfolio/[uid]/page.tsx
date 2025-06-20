import { Heading } from '@/components'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, constructMetadata } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { isFilled } from '@prismicio/client'
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
  const page = await client.getByUID('event', params.uid).catch(() => notFound())

  return (
    <div className="mb-8 mt-0 flex w-full flex-col items-center justify-start lg:mb-14 lg:mt-4">
      <Separator className="mb-10 max-w-xl lg:mb-14" />
      <Heading richText={page.data.title} accents className="mb-4 text-pretty px-3 text-center uppercase" />
      <SliceZone slices={page.data.slices} components={components} />
      <section className="flex w-full flex-col items-center gap-6 text-center text-primary">
        <div className="mt-16 flex w-full max-w-6xl flex-col items-center justify-center gap-6 lg:flex-row">
          <div className="order-2 flex flex-1 items-center justify-center gap-3 lg:order-1">
            <ArrowLeft className="h-4 w-4 text-primary" />
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ variant: 'link' }), 'w-fit p-0 text-xl font-medium italic tracking-wider')}
            >
              BACK TO PORTFOLIO
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
  const page = await client.getByUID('event', params.uid).catch(() => notFound())
  const previousImages = (await parent).openGraph?.images || []
  const metadata = constructMetadata({
    ...(isFilled.keyText(page.data.meta_title) && { title: page.data.meta_title as string }),
    ...(isFilled.keyText(page.data.meta_description) && { description: page.data.meta_description as string }),
    image: page.data.meta_image.url,
    previousImages
  })

  return metadata
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('event')

  return pages.map((page) => {
    return { uid: page.uid }
  })
}

// import { Metadata } from "next";
// import { notFound } from "next/navigation";

// import { SliceZone } from "@prismicio/react";
// import * as prismic from "@prismicio/client";

// import { createClient } from "@/prismicio";
// import { components } from "@/slices";

// type Params = { uid: string };

// /**
//  * This page renders a Prismic Document dynamically based on the URL.
//  */

// export async function generateMetadata({
//   params,
// }: {
//   params: Params;
// }): Promise<Metadata> {
//   const client = createClient();
//   const page = await client
//     .getByUID("page", params.uid)
//     .catch(() => notFound());

//   return {
//     title: prismic.asText(page.data.title),
//     description: page.data.meta_description,
//     openGraph: {
//       title: page.data.meta_title || undefined,
//       images: [
//         {
//           url: page.data.meta_image.url || "",
//         },
//       ],
//     },
//   };
// }

// export default async function Page({ params, searchParams }: Props) {
//   const client = createClient();
//   const page = await client
//     .getByUID("page", params.uid)
//     .catch(() => notFound());

//   return <SliceZone slices={page.data.slices} components={components} />;
// }

// export async function generateStaticParams() {
//   const client = createClient();

//   /**
//    * Query all Documents from the API, except the homepage.
//    */
//   const pages = await client.getAllByType("page", {
//     predicates: [prismic.filter.not("my.page.uid", "home")],
//   });

//   /**
//    * Define a path for every Document.
//    */
//   return pages.map((page) => {
//     return { uid: page.uid };
//   });
// }
