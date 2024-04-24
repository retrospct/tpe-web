import { Heading } from '@/components'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

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
      className="mx-auto my-16 max-w-7xl text-red sm:my-24"
    >
      {slice.variation === 'default' && (
        <div className="flex flex-col items-center justify-center text-red lg:flex-row">
          <div className="flex w-full flex-col items-center justify-between">
            <Heading richText={slice.primary.title} />
            <p className="mt-11">Form goes here</p>
          </div>
          <div className="relative mx-3 mt-12 w-full max-w-[360px] text-center lg:mx-6 lg:mt-0 lg:max-w-[500px]">
            <PrismicNextImage
              field={slice.primary.image}
              imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
              className="object-cover"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact
