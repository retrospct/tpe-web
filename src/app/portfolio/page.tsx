import { Heading } from '@/components'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceZone } from '@prismicio/react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('portfolio', 'portfolio', {
      fetchLinks: ['event', 'weddings', 'event.uid', 'event.title', 'event.thumbnail']
    })
    .catch(() => notFound())

  return (
    <div className="mx-auto my-14 flex w-full max-w-7xl flex-col items-center">
      <Heading richText={page.data.title} />
      <p className="text-center text-primary">NAVIGATION HERE</p>
      {/* {page?.data && (
        <div className="mx-auto flex w-full flex-col items-center justify-center px-6 text-center text-red lg:flex-row lg:justify-between lg:px-12">
          <code className="text-left">
            <pre>{JSON.stringify(page.data, null, 2)}</pre>
          </code>
        </div>
      )} */}
      <div className="my-10 flex w-full flex-col items-center justify-center">
        <h2 className="self-start font-serif text-4xl text-primary">Weddings</h2>
        <div className="flex w-full max-w-8xl flex-col items-center justify-evenly text-center font-medium text-red lg:my-3 lg:flex-row">
          {page.data?.weddings &&
            page.data.weddings.map(({ event }: { event: any }) => (
              <div key={event.uid} className="mx-3 my-6 flex flex-col items-center justify-center">
                {event?.url && (
                  <Link href={event.url}>
                    {isFilled.image(event?.data?.thumbnail) && (
                      <PrismicNextImage field={event.data.thumbnail} className="h-96 w-auto" />
                    )}
                    {isFilled.richText(event?.data?.title) && (
                      <div className="mt-4 text-lg uppercase leading-none">
                        <PrismicRichText field={event.data.title} />
                      </div>
                    )}
                  </Link>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="my-10 flex w-full flex-col items-center justify-center">
        <h2 className="self-start font-serif text-4xl text-primary">Private Parties</h2>
        <div className="flex w-full max-w-8xl flex-col items-center justify-evenly text-center font-medium text-red lg:my-3 lg:flex-row">
          {page.data?.private &&
            page.data.private.map(({ event }: { event: any }) => (
              <div key={event.uid} className="mx-3 my-6 flex flex-col items-center justify-center">
                {event?.url && (
                  <Link href={event.url}>
                    {isFilled.image(event?.data?.thumbnail) && (
                      <PrismicNextImage field={event.data.thumbnail} className="h-96 w-auto" />
                    )}
                    {isFilled.richText(event?.data?.title) && (
                      <div className="mt-4 text-lg uppercase leading-none">
                        <PrismicRichText field={event.data.title} />
                      </div>
                    )}
                  </Link>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="my-10 flex w-full flex-col items-center justify-center">
        <h2 className="self-start font-serif text-4xl text-primary">Corporate</h2>
        <div className="flex w-full max-w-8xl flex-col items-center justify-evenly text-center font-medium text-red lg:my-3 lg:flex-row">
          {page.data?.corporate &&
            page.data.corporate.map(({ event }: { event: any }) => (
              <div key={event.uid} className="mx-3 my-6 flex flex-col items-center justify-center">
                {event?.url && (
                  <Link href={event.url}>
                    {isFilled.image(event?.data?.thumbnail) && (
                      <PrismicNextImage field={event.data.thumbnail} className="h-96 w-auto" />
                    )}
                    {isFilled.richText(event?.data?.title) && (
                      <div className="mt-4 text-lg uppercase leading-none">
                        <PrismicRichText field={event.data.title} />
                      </div>
                    )}
                  </Link>
                )}
              </div>
            ))}
        </div>
      </div>
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
