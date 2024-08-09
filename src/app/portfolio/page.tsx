import { Heading } from '@/components'
import { Separator } from '@/components/ui/separator'
import { constructMetadata } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { isFilled } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: { uid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: Props) {
  const client = createClient()
  const page = await client
    .getByUID('portfolio', 'portfolio', {
      fetchLinks: ['event', 'weddings', 'event.uid', 'event.title', 'event.thumbnail']
    })
    .catch(() => notFound())

  return (
    <div className="relative mx-auto mb-8 mt-0 flex w-full max-w-7xl flex-col items-center justify-start px-6 lg:mb-14 lg:mt-4 lg:px-8">
      {/* <div className="inset-0 mx-auto my-8 flex w-full max-w-xl items-center" aria-hidden="true">
        <div className="w-full border-t-2 border-accent px-6" />
      </div> */}
      <Separator className="mb-10 max-w-xl lg:mb-14" />
      <Heading richText={page.data.title} accents className="text-center" />
      <ul className="mt-8 flex w-full max-w-xl justify-evenly text-center text-primary sm:text-lg">
        <li className="underline-offset-8 hover:text-primary/85 hover:underline">
          <Link href="#weddings" shallow>
            WEDDINGS
          </Link>
        </li>
        <li className="underline-offset-8 hover:text-primary/85 hover:underline">
          <Link href="#private-parties" shallow>
            PRIVATE PARTIES
          </Link>
        </li>
        <li className="underline-offset-8 hover:text-primary/85 hover:underline">
          <Link href="#corporate" shallow>
            CORPORATE
          </Link>
        </li>
      </ul>
      {/* <div className="my-10 flex w-full flex-col items-center justify-center">
        <HeadingDivider text="Weddings" className="max-w-4xl" />
        <EventsGrid events={page.data?.weddings} />
      </div>
      <div className="my-10 flex w-full flex-col items-center justify-center">
        <HeadingDivider text="Private Parties" className="max-w-4xl" />
        <EventsGrid events={page.data?.private} />
      </div>
      <div className="my-10 flex w-full flex-col items-center justify-center">
        <HeadingDivider text="Corporate" className="max-w-4xl" />
        <EventsGrid events={page.data?.corporate} />
      </div> */}
      <SliceZone slices={page.data.slices} components={components} />
      {/* UNCOMMENT TO DEBUG DATA PAYLOAD */}
      {/* {page?.data && (
        <div className="mx-auto flex w-full flex-col items-center justify-center px-6 text-center text-red lg:flex-row lg:justify-between lg:px-12">
          <DebugJSON data={page.data} />
        </div>
      )} */}
    </div>
  )
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('portfolio', 'portfolio').catch(() => notFound())
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
//   // const pages = await client.getAllByType('portfolio', {
//   //   fetchLinks: ['event', 'weddings', 'event.uid', 'event.title', 'event.thumbnail']
//   // })
//   const page = await client.getByUID('portfolio', 'portfolio', {
//     fetchLinks: ['event', 'weddings', 'event.uid', 'event.title', 'event.thumbnail']
//   })

//   return page.map((page) => {
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
