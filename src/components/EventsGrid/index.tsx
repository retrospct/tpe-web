import { blurImage } from '@/lib/utils'
import { isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import { TpLogoCircle } from '../icons'
import { Text } from '../Text'

export const EventsGrid = ({ events }: { events: any }) => {
  if (events?.length === 0)
    return (
      <div className="flex w-full flex-col items-center justify-center px-6 py-10">
        <TpLogoCircle className="text-accent opacity-60" />
      </div>
    )

  return (
    <div className="grid auto-cols-auto grid-cols-1 items-center justify-start gap-8 self-center text-center font-medium text-primary md:grid-cols-2 md:items-start md:justify-start md:gap-4 lg:grid-cols-3">
      {events.map(async ({ event }: { event: any }) => {
        const blurImgData = await blurImage(event.data.thumbnail.url, { width: 280, height: 384 })
        return (
          <div key={event.uid} className="relative w-72">
            {event?.url && (
              <Link href={event.url} className="group flex flex-col items-center justify-start">
                {isFilled.image(event?.data?.thumbnail) && (
                  <PrismicNextImage
                    field={event.data.thumbnail}
                    className="h-96 w-auto"
                    placeholder="blur"
                    blurDataURL={blurImgData}
                    // blurDataURL={rgbDataURL(252, 244, 236)}
                    fallbackAlt=""
                  />
                )}
                {isFilled.richText(event?.data?.title) && (
                  <Text
                    richText={event.data.title}
                    className="my-4 text-balance uppercase text-primary underline-offset-4 transition-colors *:leading-none group-hover:text-primary/90 group-hover:underline"
                    size="md"
                  />
                )}
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
