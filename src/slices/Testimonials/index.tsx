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
      className={cn(
        'relative flex w-full flex-col items-center justify-center pb-20 pt-12 md:pb-32 md:pt-24',
        background
      )}
    >
      <div className="relative flex min-h-[400px] w-full max-w-6xl flex-col items-center justify-start md:min-h-[500px] md:justify-center">
        <div className="relative max-h-[500px] min-h-fit max-w-6xl">
          {isFilled.image(slice.primary.image) && (
            <PrismicNextImage
              field={slice.primary.image}
              width={1000}
              height={500}
              sizes="100vw"
              className="h-auto w-full"
            />
          )}
          {/* <TpStar className="absolute left-6 top-1 z-20 text-primary md:left-8 md:top-2" />
          <TpStar className="absolute -bottom-4 right-2 z-20 text-primary md:right-20" /> */}
        </div>
        <div className={cn('absolute -bottom-5 z-10 flex w-full justify-center', quoteStyles)}>
          <div className="relative flex h-52 w-[22rem] items-center justify-center">
            <Text richText={slice.primary.quote} size="md" className="relative px-12 text-left font-medium leading-6" />
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
      return 'left-0 sm:left-3 xl:-left-8 lg:top-3 lg:justify-start'
    case 'center':
      return 'left-0 md:-bottom-20 md:justify-center'
    default:
      return 'right-2 md:top-3 md:justify-end'
  }
}
