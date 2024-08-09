import { constructMetadata } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { isFilled } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { uid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: Props) {
  const client = createClient()
  const page = await client.getByUID('page', 'design').catch(() => notFound())

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('page', 'design').catch(() => notFound())
  const previousImages = (await parent).openGraph?.images || []
  const metadata = constructMetadata({
    ...(isFilled.keyText(page.data.meta_title) && { title: page.data.meta_title as string }),
    ...(isFilled.keyText(page.data.meta_description) && { description: page.data.meta_description as string }),
    image: page.data.meta_image.url,
    previousImages
  })

  return metadata
}

// export async function generateStaticParams() {
//   const client = createClient()
//   const pages = await client.getAllByType('page', {
//     filters: [
//       filter.not('my.page.uid', 'home'),
//       filter.not('my.page.uid', 'portfolio'),
//       filter.not('my.page.uid', 'blog')
//     ]
//   })

//   return pages.map((page) => {
//     return { uid: page.uid }
//   })
// }

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
