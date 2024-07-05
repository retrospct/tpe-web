import { Heading, Text } from '@/components'
import { TpSquiggle } from '@/components/icons/TpSquiggle'
import { ImageCarousel } from '@/components/ImageCarousel'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isFilled, type Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>

const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  // const styles = slice.variation === 'default' ? 'pb-16 pt-8' : 'py-16'
  const background = isFilled.select(slice.primary.background) && `bg-${slice.primary.background}`

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        'flex w-full flex-col items-center gap-6 text-primary',
        `text-${slice.primary.text_align}`,
        background
        // styles,
      )}
    >
      {slice.variation === 'default' && (
        <div className="my-16 flex w-full max-w-7xl flex-col items-center justify-center gap-6">
          <Heading
            richText={slice.primary.title}
            size={isFilled.select(slice.primary.title_size) ? slice.primary.title_size : 'md'}
            accents
            className="text-center"
          />
          {isFilled.image(slice.primary.image) && (
            <div className="relative max-h-[466px] min-h-fit w-full max-w-6xl lg:max-h-[562px]">
              <PrismicNextImage field={slice.primary.image} />
            </div>
          )}
          {isFilled.group(slice.primary.packages) && (
            <div className="flex flex-col lg:flex-row">
              {slice.primary.packages.map((item, i) => (
                <div key={`${item.text}-${i}`} className="m-4 flex flex-col lg:m-6">
                  <Text richText={item.text} className="text-pretty text-xl font-medium text-primary" />
                </div>
              ))}
            </div>
          )}
          <Text
            richText={slice.primary.description}
            className={cn(
              'max-w-4xl text-balance font-sans text-lg font-normal text-secondary',
              `text-${slice.primary?.text_color || 'secondary'}`
            )}
          />
          {isFilled.link(slice.primary.cta_link) && (
            <div className="mt-8">
              <PrismicNextLink field={slice.primary.cta_link} className={buttonVariants({ variant: 'default' })}>
                {isFilled.richText(slice.primary.cta_text) && <PrismicRichText field={slice.primary.cta_text} />}
              </PrismicNextLink>
            </div>
          )}
          {slice.primary?.show_divider && <TpSquiggle className="w-full text-accent sm:w-auto" />}
        </div>
      )}
      {slice.variation === 'imageText' && (
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 py-16 lg:flex-row">
          {isFilled.image(slice.primary.image) && (
            <div className="relative max-h-[466px] max-w-xl lg:max-h-[562px]">
              <PrismicNextImage field={slice.primary.image} />
            </div>
          )}
          <div className="flex max-w-xl flex-col items-center">
            <Heading
              richText={slice.primary.title}
              size={isFilled.select(slice.primary.title_size) ? slice.primary.title_size : 'md'}
              accents
              className="text-center"
            />
            <Text
              richText={slice.primary.description}
              className="my-8 text-balance font-sans text-lg font-normal text-secondary"
            />
            {isFilled.link(slice.primary.cta_link) && (
              <PrismicNextLink field={slice.primary.cta_link} className={buttonVariants({ variant: 'default' })}>
                {isFilled.richText(slice.primary.cta_text) && <PrismicRichText field={slice.primary.cta_text} />}
              </PrismicNextLink>
            )}
          </div>
        </div>
      )}
      {slice.variation === 'buttonOnly' && (
        <div className="my-16 flex w-full max-w-6xl flex-col items-center justify-center gap-6 lg:flex-row">
          {isFilled.link(slice.primary.back_link) ? (
            <div className="order-2 flex flex-1 items-center justify-center gap-3 lg:order-1">
              <ArrowLeft className="h-4 w-4 text-primary" />
              <PrismicNextLink
                field={slice.primary.back_link}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'w-fit p-0 text-xl font-medium italic tracking-wider'
                )}
              >
                {isFilled.richText(slice.primary.back_text) && <PrismicRichText field={slice.primary.back_text} />}
              </PrismicNextLink>
            </div>
          ) : (
            <div className="order-2 flex-1 lg:order-1" />
          )}
          {isFilled.link(slice.primary.cta_link) && (
            <div className="order-1 flex-1 lg:order-2">
              <PrismicNextLink field={slice.primary.cta_link} className={buttonVariants({ variant: 'default' })}>
                {isFilled.richText(slice.primary.cta_text) && <PrismicRichText field={slice.primary.cta_text} />}
              </PrismicNextLink>
            </div>
          )}
          {isFilled.link(slice.primary.forward_link) ? (
            <div className="order-3 flex flex-1 items-center justify-center gap-3">
              <PrismicNextLink
                field={slice.primary.forward_link}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'w-fit p-0 text-xl font-medium italic tracking-wider'
                )}
              >
                {isFilled.richText(slice.primary.forward_text) && (
                  <PrismicRichText field={slice.primary.forward_text} />
                )}
              </PrismicNextLink>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          ) : (
            <div className="order-3 flex-1" />
          )}
        </div>
      )}
      {slice.variation === 'imageTextFeatured' && (
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 py-16 lg:flex-row">
          {isFilled.group(slice.primary.images) && (
            <ImageCarousel images={slice.primary.images} className="max-w-xl overflow-hidden" />
          )}
          <div className="flex max-w-xl flex-col items-center">
            <Heading
              richText={slice.primary.title}
              size={isFilled.select(slice.primary.title_size) ? slice.primary.title_size : 'md'}
              accents
              className="mb-8 text-center"
            />
            <Text
              richText={slice.primary.description}
              className="mb-8 text-balance font-sans text-lg font-normal text-secondary"
            />
            {isFilled.group(slice.primary.featured) && (
              <div className="grid grid-cols-2 md:grid-cols-3">
                {slice.primary.featured.map((feature) => (
                  <div key={JSON.stringify(feature)} className="flex items-center justify-center">
                    {isFilled.image(feature.logo) && (
                      <PrismicNextLink
                        field={isFilled.link(feature.logo_link) ? feature.logo_link : null}
                        className="relative flex h-32 w-32 items-center justify-center"
                        scroll={isFilled.link(feature.logo_link)}
                      >
                        <PrismicNextImage field={feature.logo} />
                      </PrismicNextLink>
                    )}
                  </div>
                ))}
                <div className="col-span-2 mt-3 flex w-full flex-wrap items-start justify-center gap-6 pl-3 md:col-span-3 md:flex-nowrap md:gap-3">
                  {slice.primary.featured.map((feature) => {
                    if (isFilled.richText(feature.text))
                      return <Text key={JSON.stringify(feature)} richText={feature.text} size="md" />
                    else return null
                  })}
                </div>
              </div>
            )}
            {isFilled.link(slice.primary.cta_link) && (
              <PrismicNextLink
                field={slice.primary.cta_link}
                className={cn(buttonVariants({ variant: 'default' }), 'mt-8')}
              >
                {isFilled.richText(slice.primary.cta_text) && <PrismicRichText field={slice.primary.cta_text} />}
              </PrismicNextLink>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default CallToAction
