import { EventsGrid, HeadingDivider } from '@/components'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `EventsList`.
 */
export type EventsListProps = SliceComponentProps<Content.EventsListSlice>

/**
 * Component for "EventsList" Slices.
 */
const EventsList = ({ slice }: EventsListProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="my-10 w-full">
      {slice.variation === 'default' && (
        <div className="flex w-full max-w-4xl flex-col items-center justify-center">
          {isFilled.richText(slice.primary.title) && (
            <HeadingDivider
              richText={slice.primary.title}
              anchor={
                isFilled.keyText(slice.primary.anchor_link)
                  ? slice.primary.anchor_link.toLowerCase().replace(/\s/g, '-')
                  : slice.slice_type
              }
              className="max-w-full"
            />
          )}
          <EventsGrid events={slice?.items} />
        </div>
      )}
    </section>
  )
}

export default EventsList
