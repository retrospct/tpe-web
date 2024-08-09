import { Heading, Text } from '@/components'
import { cn, constructMetadata } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { asText, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { uid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: Props) {
  const client = createClient()
  const page = await client.getByUID('person', params.uid).catch(() => notFound())

  const full_width = true
  const person = page.data

  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-start px-6 pt-16 lg:px-0">
      <Heading
        text={`${asText(person.first_name)} ${asText(person.last_name)}'s Biography`}
        className="mb-16 text-center"
        accents
        size="lg"
      />
      <div className="grid auto-cols-auto grid-cols-1 items-center justify-start gap-x-6 gap-y-12 self-center px-3 text-center font-medium text-primary md:grid-cols-2 md:items-start md:justify-start lg:grid-cols-3">
        <div
          className={cn(
            'group/bio relative flex h-auto w-80 max-w-lg flex-col',
            full_width &&
              'col-span-1 w-full max-w-5xl gap-6 md:col-span-2 md:w-auto md:flex-row lg:col-span-3 lg:w-auto'
          )}
        >
          {isFilled.image(person?.fun_image) && (
            <PrismicNextImage
              field={person.fun_image}
              className={cn(
                'absolute left-0 top-0 hidden h-80 w-80 group-hover/bio:block',
                full_width && 'h-80 w-80 lg:h-96 lg:w-96'
              )}
              imgixParams={{
                fit: 'crop',
                crop: ['faces', 'edges'],
                w: full_width ? 384 : 320,
                h: full_width ? 384 : 320,
                q: 90
              }}
              loading="lazy"
              fallbackAlt=""
            />
          )}
          {isFilled.image(person?.image) && (
            <PrismicNextImage
              field={person.image}
              className={cn('h-80 w-80', full_width && 'h-80 w-80 lg:h-96 lg:w-96')}
              imgixParams={{
                fit: 'crop',
                crop: ['faces', 'edges'],
                w: full_width ? 384 : 320,
                h: full_width ? 384 : 320,
                q: 90
              }}
              fallbackAlt=""
            />
          )}

          <div className={cn('mt-4 flex w-full flex-col gap-1', full_width && 'mt-0')}>
            <div className="flex items-center gap-1">
              <Heading richText={person?.first_name} className="tracking-normal" size="xs" />
              <Heading richText={person?.last_name} className="tracking-normal" size="xs" />
              <Text richText={person?.pronouns} className="text-left tracking-normal text-primary" size="sm" />
            </div>
            <Text
              richText={person?.title}
              className="mt-1 w-full text-pretty text-left uppercase text-primary"
              size="md"
            />
            <Text
              richText={person?.bio}
              className="mt-3 w-full text-pretty text-left font-normal text-secondary"
              size="md"
            />
            <Text
              richText={person?.likes}
              className="mt-3 w-full text-pretty text-left font-normal text-secondary"
              size="md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('person', params.uid).catch(() => notFound())
  const previousImages = (await parent).openGraph?.images || []
  const title =
    `Two Perfect Events - ${asText(page.data.first_name)} ${asText(page.data.last_name)}'s Profile` ||
    'Two Perfect Events'
  const description =
    `${asText(page.data.first_name)} ${asText(page.data.title)} - ${asText(page.data.bio).substring(0, 240)}` ||
    'Two Perfect Events is a Palo Alto-based event planning studio, crafting unique, unforgettable weddings and events. We specialize in personalized details and flawless execution, ensuring every celebration reflects your unique style and creates lasting memories.'
  const metadata = constructMetadata({ title, description, previousImages })

  return metadata
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('profile')

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
