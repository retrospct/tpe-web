import { Heading, Text } from '@/components'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Timeline`.
 */
export type TimelineProps = SliceComponentProps<Content.TimelineSlice>

/**
 * Component for "Timeline" Slices.
 */
const Timeline = ({ slice }: TimelineProps): JSX.Element => {
  const background = isFilled.select(slice.primary.background) ? `bg-${slice.primary.background}` : 'bg-foreground'

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn('flex w-full flex-col items-center justify-center', background)}
    >
      {slice.variation === 'default' && (
        <div className="flex w-full max-w-7xl flex-col items-center justify-center px-6 py-16 lg:px-12 lg:py-24">
          <Heading richText={slice.primary.title} className="mb-14 text-center text-3xl lg:text-4xl" accents />
          {isFilled.group(slice.primary.timeline) && (
            <div className="grid grid-cols-2 grid-rows-1 items-start justify-center gap-x-6 gap-y-9 overflow-hidden text-left md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4">
              {slice.primary.timeline.map((item, i) => (
                <div className="max-w-1/3 flex flex-col items-start justify-start gap-x-4 gap-y-1 sm:max-w-44 md:flex-row lg:max-w-60">
                  <Text
                    text={i < 9 ? `0${i + 1}` : `${i + 1}`}
                    className="leading-none text-primary lg:leading-none"
                    size="xl"
                  />
                  <Text
                    richText={item.name}
                    className="font-light leading-none text-secondary lg:leading-none"
                    size="xl"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Timeline
