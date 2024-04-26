import { TpSquiggle } from '@/components/icons'
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
              <div className="max-w-4xl font-serif text-4xl font-normal tracking-wider text-red sm:text-5xl">
                <PrismicRichText field={slice.primary.title} />
                <TpSquiggle className="w-full text-pink" />
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
                <div className="text-left text-2xl font-medium leading-8 text-brown sm:text-right">
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

// {/* <div
//   className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//   aria-hidden="true"
// >
//   <div
//     className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
//     style={{
//       clipPath:
//         'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
//     }}
//   />
// </div> */}
// {/* <div
//   className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//   aria-hidden="true"
// >
//   <div
//     className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
//     style={{
//       clipPath:
//         'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
//     }}
//   />
// </div> */}
