import { Heading } from '@/components'
import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client.getByUID('portfolio', 'portfolio').catch(() => notFound())

  return (
    <div className="mx-auto my-14 flex w-full max-w-7xl flex-col items-center">
      <Heading richText={page.data.title} />
      <p className="text-center text-red">NAVIGATION HERE</p>
      {page.data?.weddings?.length > 0 && (
        <div className="mx-auto flex w-full flex-col items-center justify-center px-6 text-center text-red lg:flex-row lg:justify-between lg:px-12">
          {JSON.stringify(page.data.weddings)}
          {page.linked_documents.map((link) => (
            <p key={JSON.stringify(link)}>{JSON.stringify(link)}</p>
          ))}
          {page.data.weddings.map((wedding, i) => (
            <div
              key={`wedding-${i}`}
              className={cn('mt-6 text-sm', i === 1 && 'order-first text-base font-medium lg:order-none')}
            >
              {wedding.event.link_type}
              {/* <PrismicRichText field={wedding.text} /> */}
            </div>
          ))}
        </div>
      )}
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('portfolio', 'portfolio').catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('portfolio')

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
