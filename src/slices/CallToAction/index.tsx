import { Heading, Text } from '@/components'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isFilled, type Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

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
          <Heading richText={slice.primary.title} accents sectionTitle />
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
            className="text-balance font-sans text-lg font-normal text-secondary"
          />
          {isFilled.link(slice.primary.cta_link) && (
            <div className="mt-8">
              <PrismicNextLink field={slice.primary.cta_link} className={buttonVariants({ variant: 'default' })}>
                {isFilled.richText(slice.primary.cta_text) && <PrismicRichText field={slice.primary.cta_text} />}
              </PrismicNextLink>
            </div>
          )}
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
            <Heading richText={slice.primary.title} accents sectionTitle />
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
    </section>
  )
}

export default CallToAction
