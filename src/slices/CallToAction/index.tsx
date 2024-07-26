import { Heading, ImagePrismic, Text } from '@/components'
import { TpSquiggle } from '@/components/icons/TpSquiggle'
import { ImageCarousel } from '@/components/ImageCarousel'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { isFilled, type Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>

const CallToAction = ({ slice, ...props }: CallToActionProps): JSX.Element => {
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
      {slice.variation === 'default' && <DefaultCTASlice slice={slice} {...props} />}
      {slice.variation === 'imageText' && <ImageText slice={slice} {...props} />}
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
        <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 py-16 lg:flex-row lg:gap-0">
          {isFilled.group(slice.primary.images) && (
            <ImageCarousel images={slice.primary.images} className="w-full max-w-xl overflow-hidden" />
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
                <div className="col-span-2 mt-3 flex w-full flex-wrap items-center justify-center gap-6 text-center md:col-span-3 md:flex-nowrap md:items-start md:gap-3 md:pl-3 md:text-left">
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

const DefaultCTASlice = ({ slice }: CallToActionProps) => {
  if (slice.variation !== 'default') return null

  const padding = () => {
    if (!isFilled.select(slice.primary.padding)) return 'my-16'
    switch (slice.primary.padding) {
      case 'top':
        return 'mt-16'
      case 'bottom':
        return 'mb-16'
      default:
        return 'my-16'
    }
  }

  return (
    <div className={cn('flex w-full max-w-7xl flex-col items-center justify-center gap-6', padding())}>
      {slice.primary.show_separator && <Separator className="mb-14 mt-4 max-w-xl" />}
      <Heading
        richText={slice.primary.title}
        size={isFilled.select(slice.primary.title_size) ? slice.primary.title_size : 'md'}
        accents
        className="text-center"
      />
      <ImagePrismic image={slice.primary.image} className="max-h-[466px] min-h-fit w-full max-w-6xl lg:max-h-[562px]" />
      {isFilled.group(slice.primary.packages) && (
        <div className="mt-3 flex flex-col lg:flex-row">
          {slice.primary.packages.map((item, i) => (
            <div key={`${item.text}-${i}`} className="m-4 flex flex-col lg:mt-6">
              <Text
                richText={item.text}
                className={cn('text-pretty text-xl font-medium', `text-${slice.primary?.text_color || 'primary'}`)}
              />
            </div>
          ))}
        </div>
      )}
      <Text
        richText={slice.primary.description}
        className={cn(
          'max-w-4xl text-balance font-sans text-lg font-normal',
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
  )
}

const ImageText = ({ slice }: CallToActionProps) => {
  if (slice.variation !== 'imageText') return null
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 py-16 lg:flex-row">
      <ImagePrismic image={slice.primary.image} className="max-h-[466px] max-w-xl lg:max-h-[562px]" />
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
  )
}
