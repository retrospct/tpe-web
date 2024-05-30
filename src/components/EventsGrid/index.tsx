import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import Link from 'next/link'
import { TpLogoCircle } from '../icons'

export const EventsGrid = ({ events }: { events: any }) => {
  if (events?.length === 0)
    return (
      <div className="flex w-full flex-col items-center justify-center px-6 py-10">
        <TpLogoCircle className="text-accent opacity-60" />
      </div>
    )

  return (
    <div className="grid auto-cols-auto grid-cols-1 items-center justify-start gap-8 self-center text-center font-medium text-primary md:grid-cols-2 md:items-start md:justify-start md:gap-4 lg:grid-cols-3">
      {events.map(({ event }: { event: any }) => (
        <div key={event.uid} className="relative w-72">
          {event?.url && (
            <Link href={event.url} className="flex flex-col items-center justify-start">
              {isFilled.image(event?.data?.thumbnail) && (
                <PrismicNextImage field={event.data.thumbnail} className="h-96 w-auto" />
              )}
              {isFilled.richText(event?.data?.title) && (
                <div className="mt-4 text-balance text-xl uppercase leading-none">
                  <PrismicRichText field={event.data.title} />
                </div>
              )}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
