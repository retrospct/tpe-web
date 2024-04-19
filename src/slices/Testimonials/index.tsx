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
      className="relative isolate bg-almond pb-12 pt-0 sm:pb-16 lg:pb-20"
    >
      <div className="flex justify-center">
        <div className="relative max-h-[466px] w-full max-w-6xl bg-almond sm:min-h-[465px]">
          {isFilled.image(slice.primary.image) && (
            <PrismicNextImage
              field={slice.primary.image}
              imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
              className="object-cover"
              fill
              priority
            />
          )}
          <TpStar className="absolute left-32 top-2 z-20 text-pink" />
          <TpStar className="absolute -bottom-4 right-8 z-20 text-pink" />
        </div>
      </div>
      <div className="absolute bottom-0 right-1/3 z-10 mx-auto flex max-w-5xl justify-end">
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
