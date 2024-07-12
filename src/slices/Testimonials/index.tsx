import { Text } from '@/components'
import { TpQuote } from '@/components/icons'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = ({ slice }: TestimonialsProps): JSX.Element => {
  const background = isFilled.select(slice.primary.background) ? `bg-${slice.primary.background}` : ''
  const quoteStyles = getQuoteStyles(slice.primary.quote_position)
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn('relative flex w-full flex-col items-center justify-center pb-24 pt-0 md:py-32', background)}
    >
      <div className="relative flex h-96 w-full max-w-6xl flex-col items-center justify-center">
        <div className="relative max-h-[466px] min-h-fit max-w-6xl lg:max-h-[562px]">
          {isFilled.image(slice.primary.image) && <PrismicNextImage field={slice.primary.image} />}
          {/* <TpStar className="absolute left-6 top-1 z-20 text-primary md:left-8 md:top-2" />
          <TpStar className="absolute -bottom-4 right-2 z-20 text-primary md:right-20" /> */}
        </div>
        <div className={cn('absolute -bottom-14 z-10 flex w-full justify-center', quoteStyles)}>
          <div className="relative flex h-52 w-[22rem] items-center justify-center">
            <Text
              richText={slice.primary.quote}
              className="relative px-12 text-left text-base font-medium leading-6 lg:text-base"
            />
            <TpQuote className="absolute left-0 top-0 -z-10 h-full w-full text-accent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

const getQuoteStyles = (position: 'left' | 'center' | 'right') => {
  switch (position) {
    case 'left':
      return 'left-2 md:-top-16 md:justify-start'
    case 'center':
      return 'left-0 md:-bottom-20 md:justify-center'
    default:
      return 'right-2 md:-top-16 md:justify-end'
  }
}
