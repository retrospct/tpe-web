// import { TpSquiggle } from '@/components/icons'
import { Heading, Text } from '@/components'
import { TpSquiggle } from '@/components/icons/TpSquiggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isFilled, type Content } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react'

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>
  }
  // label: ({ node, children }) => {
  //   if (node.data.label === 'codespan') {
  //     return <code>{children}</code>
  //   }
  // }
}

/**
 * Props for `HeroImage`.
 */
export type HeroImageProps = SliceComponentProps<Content.HeroImageSlice>

/**
 * Component for "HeroImage" Slices.
 */
const HeroImage = ({ slice }: HeroImageProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="relative">
      {slice.variation === 'default' && (
        <div className={cn('relative isolate pt-0', slice.primary.padding && 'pb-12 sm:pb-16 lg:pb-20')}>
          {isFilled.image(slice.primary.image) && (
            <div
              className={cn(
                'relative flow-root min-w-full overflow-hidden',
                isFilled.select(slice.primary.image_height) && slice.primary.image_height === 'short'
                  ? 'h-[calc(66dvh-120px)] max-h-[431px] sm:h-[431px] sm:min-h-[431px]'
                  : 'h-[calc(66dvh-120px)] max-h-[652px] sm:h-[652px] sm:min-h-[652px]'
              )}
            >
              <PrismicNextImage
                field={slice.primary.image}
                imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
                className="object-cover"
                fill
                priority
              />
            </div>
          )}
          {(isFilled.richText(slice.primary.title) ||
            isFilled.link(slice.primary.cta_link) ||
            isFilled.richText(slice.primary.description)) && (
            <div className="mx-auto mt-16 flow-root max-w-5xl px-6 text-left sm:mt-24 lg:px-8">
              {isFilled.richText(slice.primary.title) && (
                <div className="max-w-4xl text-pretty font-serif text-4xl font-normal tracking-wider text-primary sm:text-5xl">
                  <PrismicRichText field={slice.primary.title} />
                  <div className="w-full after:mb-0 after:ml-0 after:mt-2 after:block after:h-[12px] after:w-full after:bg-squiggle after:md:ml-28 after:md:h-[20px] after:md:w-[400px]" />
                  {/* <TpSquiggle className="w-full text-accent sm:w-auto" /> */}
                </div>
              )}

              {(isFilled.link(slice.primary.cta_link) || isFilled.richText(slice.primary.description)) && (
                <div className="mt-8 flex flex-col-reverse items-center justify-center gap-x-12 sm:mt-10 sm:flex-row">
                  {isFilled.link(slice.primary.cta_link) && (
                    <div className="mt-8 sm:mt-0">
                      <PrismicNextLink
                        field={slice.primary.cta_link}
                        className={buttonVariants({ variant: 'default' })}
                      >
                        {isFilled.richText(slice.primary.cta_text) && (
                          <PrismicRichText field={slice.primary.cta_text} />
                        )}
                      </PrismicNextLink>
                    </div>
                  )}
                  {isFilled.richText(slice.primary.description) && (
                    <div className="text-left text-2xl font-medium leading-8 text-brown">
                      <PrismicRichText field={slice.primary.description} components={components} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {slice.variation === 'textImage' && (
        <div className="relative pb-12 pt-0 sm:pb-16 lg:pb-20">
          <div className="relative flex w-full flex-col items-center justify-center gap-6 bg-foreground px-6 py-10 text-left sm:py-28 lg:flex-row lg:px-8">
            {/* <div className="mx-auto max-w-5xl px-6 text-left lg:px-8"> */}
            <div className="flex w-full max-w-xl flex-col">
              {isFilled.richText(slice.primary.title) && (
                <Heading
                  richText={slice.primary.title}
                  accentBefore
                  accentSize="lg"
                  className="self-start font-sans text-7xl font-light leading-none sm:text-9xl lg:text-9xl"
                />
              )}
              {isFilled.richText(slice.primary.title_bottom) && (
                <Heading
                  richText={slice.primary.title_bottom}
                  accentAfter
                  accentSize="lg"
                  className="mb-6 ml-0 self-end text-right text-7xl leading-none sm:ml-24 sm:self-start sm:text-9xl lg:mb-6 lg:text-9xl"
                />
              )}
              <Text
                richText={slice.primary.description}
                className="mb-3 text-left font-sans text-lg font-normal text-secondary lg:mb-6 lg:text-lg"
              />
              {/* <TpSquiggle className="w-full text-accent sm:w-auto" /> */}
            </div>

            {/* <div className="mt-8 flex flex-col-reverse items-center justify-center gap-x-12 sm:mt-10 sm:flex-row">
              <div className="mt-8 sm:mt-0">
                {isFilled.link(slice.primary.cta_link) && (
                  <PrismicNextLink field={slice.primary.cta_link} className={buttonVariants({ variant: 'default' })}>
                    {isFilled.richText(slice.primary.cta_text) && <PrismicRichText field={slice.primary.cta_text} />}
                  </PrismicNextLink>
                )}
              </div>
              {isFilled.richText(slice.primary.description) && (
                <div className="text-left text-2xl font-medium leading-8 text-brown">
                  <PrismicRichText field={slice.primary.description} components={components} />
                </div>
              )}
            </div> */}
            {/* </div> */}
            <TpSquiggle className="block h-auto w-full px-4 text-accent sm:max-w-xl lg:absolute lg:bottom-8 lg:px-0" />
            {isFilled.image(slice.primary.image) && (
              <div className="relative mx-3 mt-3 w-full max-w-[360px] text-center lg:mx-6 lg:mt-0 lg:max-w-[584px]">
                <PrismicNextImage
                  field={slice.primary.image}
                  imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default HeroImage

// import type { Content } from '@prismicio/client'
// import { PrismicNextLink } from '@prismicio/next'
// import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from '@prismicio/react'
// import styles from './index.module.css'

// const components: JSXMapSerializer = {
//   hyperlink: ({ node, children }) => {
//     return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>
//   },
//   label: ({ node, children }) => {
//     if (node.data.label === 'codespan') {
//       return <code>{children}</code>
//     }
//   }
// }

// /**
//  * Props for `RichText`.
//  */
// type RichTextProps = SliceComponentProps<Content.RichTextSlice>

// /**
//  * Component for "RichText" Slices.
//  */
// const RichText = ({ slice }: RichTextProps): JSX.Element => {
//   return (
//     <section className={styles.richtext}>
//       <PrismicRichText field={slice.primary.content} components={components} />
//     </section>
//   )
// }

// export default RichText
