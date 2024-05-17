// import { TpSquiggle } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative isolate pt-0"
    >
      <div className="pb-12 sm:pb-16 lg:pb-20">
        {/* mt-16 flow-root sm:mt-24 */}
        <div className="flow-root">
          {/* -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 */}
          <div className="relative h-[calc(66dvh-120px)] max-h-[652px] min-w-full overflow-hidden sm:h-[652px] sm:min-h-[652px]">
            {isFilled.image(slice.primary.image) && (
              <PrismicNextImage
                field={slice.primary.image}
                imgixParams={{ crop: 'faces,edges', fit: 'crop', w: 1, h: 1 }}
                className="object-cover"
                fill
                priority
              />
            )}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 flow-root max-w-5xl text-left sm:mt-24">
            {isFilled.richText(slice.primary.title) && (
              <div className="max-w-4xl text-pretty font-serif text-4xl font-normal tracking-wider text-primary sm:text-5xl">
                <PrismicRichText field={slice.primary.title} />
                <div className="after:bg-squiggle w-full after:mb-0 after:ml-0 after:mt-2 after:block after:h-[12px] after:w-full after:md:ml-28 after:md:h-[20px] after:md:w-[400px]" />
                {/* <TpSquiggle className="w-full text-accent sm:w-auto" /> */}
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse items-center justify-center gap-x-12 sm:mt-10 sm:flex-row">
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
            </div>
          </div>
        </div>
      </div>
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
