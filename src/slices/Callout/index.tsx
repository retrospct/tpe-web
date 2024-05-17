import { Heading, Text } from '@/components'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Callout`.
 */
export type CalloutProps = SliceComponentProps<Content.CalloutSlice>

/**
 * Component for "Callout" Slices.
 */
const Callout = ({ slice }: CalloutProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex w-full flex-col items-center justify-center bg-foreground"
    >
      {slice.variation === 'default' && (
        <div className="flex w-full max-w-5xl flex-col items-center justify-center text-balance px-6 py-16 text-center md:flex-row md:text-left">
          <Heading richText={slice.primary.title} />
          <div
            className="inset-0 mx-auto my-8 flex w-full max-w-20 items-center md:mx-10 md:w-[2px]"
            aria-hidden="true"
          >
            <div className="w-full border-t-2 border-accent px-6 py-0 md:w-[2px] md:border-l-2 md:px-0 md:py-6" />
          </div>
          <Text richText={slice.primary.body} />
        </div>
      )}
    </section>
  )
}

export default Callout
