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
      className="flex w-full flex-col text-red"
    >
      {slice.variation === 'default' && (
        <>
          {isFilled.richText(slice.primary.title) && (
            <div className="text-center">
              <PrismicRichText field={slice.primary.title} />
            </div>
          )}
          <div className="flex w-full flex-col items-center justify-center sm:flex-row">
            {slice.items.length > 0 &&
              slice.items.map((item) => (
                <div
                  key={JSON.stringify(item)}
                  className={cn(
                    'flex w-full flex-col items-center',
                    item.image_left ? 'sm:flex-row-reverse' : 'sm:flex-row'
                  )}
                >
                  {isFilled.link(item.link) && (
                    <PrismicNextLink
                      field={item.link}
                      // className=""
                    >
                      {isFilled.image(item.image) && (
                        <div className="relative w-full max-w-60 text-center">
                          <PrismicNextImage
                            field={item.image}
                            imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
                            className="object-cover"
                          />
                          {isFilled.richText(item.link_text) && <PrismicRichText field={item.link_text} />}
                        </div>
                      )}
                    </PrismicNextLink>
                  )}
                  {isFilled.richText(item.list) && <PrismicRichText field={item.list} />}
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Services
