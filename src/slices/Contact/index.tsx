import { ContactForm, Heading, Text } from '@/components'
import { Content, isFilled } from '@prismicio/client'
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
      className="flex w-full flex-col items-center bg-foreground py-16 text-primary sm:py-24"
    >
      {slice.variation === 'default' && (
        <div className="flex w-full max-w-7xl flex-col items-center justify-center px-3 text-primary lg:flex-row lg:px-0">
          <div className="flex w-full flex-col items-center justify-between">
            <Heading richText={slice.primary.title} size="md" accents className="text-center" />
            <Text richText={slice.primary.description} className="max-w-96 text-center text-secondary" />
            <ContactForm />
          </div>
          {isFilled.image(slice.primary.image) && (
            <div className="relative mx-3 mt-12 w-full max-w-[360px] text-center lg:mx-6 lg:mt-0 lg:max-w-[500px]">
              <PrismicNextImage
                field={slice.primary.image}
                imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Contact
