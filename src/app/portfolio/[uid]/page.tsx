import { Heading } from '@/components'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client.getByUID('event', params.uid).catch(() => notFound())

  return (
    <div className="mb-14 mt-8">
      <Link href="/portfolio" className={cn(buttonVariants({ variant: 'link' }), 'mx-auto mb-6 w-full p-0 text-lg')}>
        <ArrowLeft />
      </Link>
      <Heading richText={page.data.title} accents sectionTitle className="text-pretty" />
      <SliceZone slices={page.data.slices} components={components} />
      <Link href="/portfolio" className={cn(buttonVariants({ variant: 'link' }), 'mx-auto mt-6 w-full text-lg')}>
        <ArrowLeft className="mr-2 inline-block h-4 w-4" /> PORTFOLIO
      </Link>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('event', params.uid).catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description
  }
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

// export default async function Page({ params }: { params: Params }) {
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
