import { Heading, Text } from '@/components'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Callout`.
 */
export type CalloutProps = SliceComponentProps<Content.CalloutSlice>

/**
 * Component for "Callout" Slices.
 */
const Callout = ({ slice }: CalloutProps): JSX.Element => {
  const background = isFilled.select(slice.primary.background) ? `bg-${slice.primary.background}` : 'bg-foreground'
  const textColor =
    slice.variation === 'partners' && isFilled.select(slice.primary.text_color)
      ? `text-${slice.primary.text_color}`
      : 'text-primary'

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn('flex w-full flex-col items-center justify-center', background)}
    >
      {slice.variation === 'default' && (
        <div className="flex w-full max-w-5xl flex-col items-center justify-center text-balance px-6 py-16 text-center md:flex-row md:text-left">
          <Heading richText={slice.primary.title} accents={slice.primary.accents} />
          <div
            className="inset-0 mx-auto my-8 flex w-full max-w-20 items-center md:mx-10 md:w-[2px]"
            aria-hidden="true"
          >
            <div className="w-full border-t-2 border-accent px-6 py-0 md:w-[2px] md:border-l-2 md:px-0 md:py-6" />
          </div>
          <Text richText={slice.primary.body} />
        </div>
      )}
      {slice.variation === 'partners' && (
        <div className="flex w-full flex-col items-center justify-center divide-x-0 divide-y-2 divide-accent px-6 py-16 text-center md:flex-row md:divide-x-2 md:divide-y-0 md:text-left">
          <Heading
            richText={slice.primary.title}
            accents={slice.primary.accents}
            className="w-full pb-10 pr-0 text-center md:w-64 md:pb-0 md:pr-8 lg:w-fit lg:pr-14"
          />
          {/* <div
            className="inset-0 mx-auto my-8 flex w-full max-w-20 items-stretch md:mx-10 md:h-full md:min-h-full md:w-[2px]"
            aria-hidden="true"
          >
            <div className="w-full border-t-2 border-accent px-6 py-0 md:w-[2px] md:border-l-2 md:px-0 md:py-6" />
          </div> */}
          {isFilled.group(slice.primary.venues) && (
            <div className="grid grid-cols-2 items-start gap-x-6 gap-y-5 overflow-hidden pl-0 pt-10 md:grid-cols-3 md:pl-8 md:pt-0 lg:grid-cols-4 lg:gap-x-12 lg:pl-14">
              {slice.primary.venues.map((venue) =>
                isFilled.link(venue.link) ? (
                  <PrismicNextLink field={venue.link}>
                    <Text
                      richText={venue.name}
                      className={cn('w-32 leading-tight md:w-28 lg:w-32 lg:leading-tight', textColor)}
                      size="md"
                    />
                  </PrismicNextLink>
                ) : (
                  <Text
                    richText={venue.name}
                    className={cn('w-32 leading-tight md:w-28 lg:w-32 lg:leading-tight', textColor)}
                    size="md"
                  />
                )
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Callout
