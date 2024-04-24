import { Heading } from '@/components'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>

/**
 * Component for "Services" Slices.
 */
const Services = ({ slice }: ServicesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-16 flex w-full flex-col text-red sm:my-24"
    >
      {slice.variation === 'default' && (
        <>
          <Heading richText={slice.primary.title} />
          <div className="flex w-full flex-col items-center justify-center lg:flex-row">
            {slice.items.length > 0 &&
              slice.items.map((item) => (
                <div
                  key={JSON.stringify(item)}
                  className={cn(
                    'mt-8 flex w-full flex-col items-center lg:mt-12',
                    item.image_left ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  )}
                >
                  {isFilled.link(item.link) && (
                    <PrismicNextLink field={item.link} className="group">
                      {isFilled.image(item.image) && (
                        <div className="relative mx-6 w-full max-w-60 overflow-hidden rounded-t-full border-[5px] border-solid border-pink text-center transition-transform group-hover:scale-105 lg:mx-12">
                          <PrismicNextImage
                            field={item.image}
                            imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
                            className="object-cover"
                          />
                        </div>
                      )}
                      {isFilled.richText(item.link_text) && (
                        <div className="relative mx-6 mt-5 w-full max-w-60 text-center text-xl font-normal tracking-wider underline underline-offset-8 transition-transform group-hover:scale-105 lg:mx-12">
                          <PrismicRichText field={item.link_text} />
                        </div>
                      )}
                    </PrismicNextLink>
                  )}
                  {isFilled.richText(item.list) && (
                    <div className="mx-0 mt-6 text-center text-xl font-medium leading-loose text-brown lg:mt-0 xl:mx-12">
                      <PrismicRichText field={item.list} />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Services
