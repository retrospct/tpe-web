import { TpQuote, TpStar } from '@/components/icons'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({ slice }: TestimonialsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative my-16 flow-root md:my-24"
    >
      <div className="mb-24 flex justify-center">
        <div className="relative max-h-[466px] min-h-fit w-full max-w-6xl">
          {isFilled.image(slice.primary.image) && <PrismicNextImage field={slice.primary.image} />}
          <TpStar className="absolute left-6 top-1 z-20 text-pink md:left-8 md:top-2" />
          <TpStar className="absolute -bottom-4 right-2 z-20 text-pink md:right-20" />
        </div>
      </div>
      <div className="absolute bottom-0 right-8 z-10 flex w-full max-w-5xl justify-end md:right-1/3">
        <div className="relative flex min-h-40 min-w-72 items-center justify-center">
          {isFilled.richText(slice.primary.quote) && (
            <div className="relative max-w-52 text-left text-lg font-medium leading-6 text-brown">
              <PrismicRichText field={slice.primary.quote} />
            </div>
          )}
          <TpQuote className="absolute left-0 top-0 -z-10 h-full w-full text-pink" />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
