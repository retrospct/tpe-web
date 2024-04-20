import { TpStar } from '@/components/icons'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-16 flex w-full flex-col items-center justify-between text-red sm:my-24 md:flex-row"
    >
      {slice.variation === 'default' && (
        <>
          <div className="flex w-full flex-col items-center justify-between">
            {isFilled.richText(slice.primary.title) && (
              <div className="mx-3 flex items-center justify-center text-center font-serif text-4xl font-normal tracking-wider text-red lg:mx-6 lg:text-5xl">
                <TpStar className="mr-5 text-pink" />
                <PrismicRichText field={slice.primary.title} />
                <TpStar className="ml-5 text-pink" />
              </div>
            )}
            <p className="mt-11">Form goes here</p>
          </div>
          <div className="max-w-1/2 lg:max-w-1/3 relative mx-3 mt-12 w-full text-center lg:mx-6 lg:mt-0">
            <PrismicNextImage
              field={slice.primary.image}
              imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
              className="object-cover"
            />
          </div>
        </>
      )}
    </section>
  )
}

export default Contact
