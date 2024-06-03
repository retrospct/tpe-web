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
  const styles = slice.variation === 'default' ? 'py-16 sm:py-24' : 'bg-foreground pt-16 pb-8 sm:pt-24 sm:pb-14'
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn('flex w-full flex-col text-primary', styles)}
    >
      {slice.variation === 'default' && (
        <>
          <Heading richText={slice.primary.title} size="md" accents className="text-center" />
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
                        <div className="relative mx-6 w-full max-w-60 overflow-hidden rounded-t-full border-[5px] border-solid border-primary text-center transition-transform group-hover:scale-105 lg:mx-12">
                          <PrismicNextImage
                            field={item.image}
                            imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
                            className="object-cover"
                          />
                        </div>
                      )}
                      {isFilled.richText(item.link_text) && (
                        <div className="relative mx-6 mt-5 w-full max-w-60 text-center text-xl font-normal tracking-wider underline underline-offset-8 lg:mx-12">
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
      {slice.variation === 'mainServices' && (
        <>
          <Heading richText={slice.primary.title} accents className="text-center" />
          <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:items-start">
            {slice.items.length > 0 &&
              slice.items.map((item) => (
                <div key={JSON.stringify(item)} className="mt-8 flex flex-col items-center lg:mt-12">
                  {isFilled.link(item.link) && (
                    <PrismicNextLink field={item.link} className="group">
                      {isFilled.image(item.image) && (
                        <div className="relative mx-2 w-full max-w-60 overflow-hidden border-[3px] border-solid border-primary text-center transition-transform group-hover:scale-105 lg:mx-5">
                          <PrismicNextImage
                            field={item.image}
                            imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
                            className="object-cover"
                          />
                        </div>
                      )}
                      {isFilled.richText(item.link_text) && (
                        <div className="relative mx-2 mt-5 w-full max-w-60 text-center font-serif text-2xl font-normal tracking-wider lg:mx-5">
                          <PrismicRichText field={item.link_text} />
                        </div>
                      )}
                    </PrismicNextLink>
                  )}
                  {/* {isFilled.richText(item.list) && (
                    <div className="mx-0 mt-6 text-center text-xl font-medium leading-loose text-brown lg:mt-0 xl:mx-12">
                      <PrismicRichText field={item.list} />
                    </div>
                  )} */}
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Services
