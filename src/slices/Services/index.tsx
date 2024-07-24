import { Heading, HeadingDivider, Text } from '@/components'
import { ImageCarousel } from '@/components/ImageCarousel'
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
  const styles = slice.variation === 'default' ? 'py-16 sm:py-24' : 'pt-16 pb-8 sm:pt-24 sm:pb-14'
  const background = isFilled.select(slice.primary.background) ? `bg-${slice.primary.background}` : 'bg-foreground'

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn('relative flex w-full flex-col items-center justify-start text-primary', styles, background)}
    >
      {slice.variation === 'default' && (
        <>
          <Heading richText={slice.primary.title} accents className="text-center" />
          <div className="flex w-full flex-col items-center justify-center lg:flex-row">
            {isFilled.group(slice.primary.services) &&
              slice.primary.services.map((item) => (
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
                        <div className="relative mx-6 w-full max-w-60 overflow-hidden rounded-t-full border-[5px] border-solid border-primary text-center transition-transform group-hover:scale-105 group-hover:border-primary lg:mx-12">
                          <PrismicNextImage
                            field={item.image}
                            imgixParams={{ crop: ['faces', 'edges'], fit: 'crop', w: 1, h: 1 }}
                            className="object-cover"
                          />
                        </div>
                      )}
                      {isFilled.richText(item.title) && (
                        <div className="relative mx-6 mt-5 w-full max-w-60 text-center text-xl font-normal tracking-wider underline underline-offset-8 lg:mx-12">
                          <PrismicRichText field={item.title} />
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
        <div className="flex w-full max-w-6xl flex-col items-center justify-center">
          <Heading richText={slice.primary.title} accents className="text-center" />
          <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:items-start">
            {isFilled.group(slice.primary.services) &&
              slice.primary.services.map((item) => (
                <div key={JSON.stringify(item)} className="mt-8 flex flex-col items-center lg:mt-12">
                  {isFilled.link(item.link) && (
                    <PrismicNextLink field={item.link} className="group">
                      {isFilled.image(item.image) && (
                        <div className="relative mx-2 w-full max-w-60 overflow-hidden border-[3px] border-solid border-primary text-center transition-transform group-hover:scale-105 lg:mx-5">
                          <PrismicNextImage
                            field={item.image}
                            imgixParams={{ crop: ['faces', 'edges'], fit: 'crop', w: 1, h: 1 }}
                            className="object-cover"
                          />
                        </div>
                      )}
                      {isFilled.richText(item.title) && (
                        <div className="relative mx-2 mt-5 w-full max-w-60 text-center font-serif text-2xl font-normal tracking-wider lg:mx-5">
                          <PrismicRichText field={item.title} />
                        </div>
                      )}
                    </PrismicNextLink>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
      {slice.variation === 'designServices' && (
        <>
          <HeadingDivider richText={slice.primary.title} bg={background} className="max-w-5xl" />
          <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">
            {isFilled.group(slice.primary.services) &&
              slice.primary.services.map((service) => (
                <div key={JSON.stringify(service)} className="mt-8 flex max-w-72 flex-col items-center lg:mt-12">
                  {isFilled.image(service.image) && (
                    <div className="relative mx-2 mb-7 w-full overflow-hidden border-[3px] border-solid border-primary text-center transition-transform group-hover:scale-105 lg:mx-5">
                      <PrismicNextImage
                        field={service.image}
                        imgixParams={{ crop: ['faces', 'edges'], fit: 'crop', w: 1, h: 1 }}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <Heading richText={service.title} size="xs" className="mb-2 w-full text-left font-sans" />
                  <Text richText={service.description} size="md" />
                </div>
              ))}
          </div>
        </>
      )}
      {slice.variation === 'graphicDesign' && (
        <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-8">
          <HeadingDivider richText={slice.primary.title} bg={background} className="mb-0" />
          <Text richText={slice.primary.description} size="md" className="max-w-4xl text-pretty text-center" />
          {/* {isFilled.image(slice.primary.image) && (
            <div className="relative max-h-[466px] min-h-fit max-w-6xl lg:max-h-[562px]">
              <PrismicNextImage field={slice.primary.image} />
            </div>
          )} */}
          {isFilled.group(slice.primary.images) && <ImageCarousel images={slice.primary.images} controls />}
        </div>
      )}
    </section>
  )
}

export default Services
