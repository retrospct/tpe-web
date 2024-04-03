import { isFilled, type Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

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
      className="bg-main-bg relative isolate pt-12 sm:pt-16 lg:pt-20"
    >
      {/* <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div> */}
      <div className="pb-12 sm:pb-16 lg:pb-20">
        {/* mt-16 flow-root sm:mt-24 */}
        <div className="flow-root">
          {/* -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 */}
          <div className="bg-main-bg w-full">
            {/* <img
                  src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                /> */}
            {isFilled.image(slice.primary.image) && <PrismicNextImage field={slice.primary.image} className="w-full" />}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 flow-root max-w-5xl text-left sm:mt-24">
            {isFilled.richText(slice.primary.title) && (
              <div className="max-w-4xl text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                <PrismicRichText field={slice.primary.title} />
              </div>
            )}
            <div className="mt-10 flex items-center justify-center gap-x-12">
              <div className="bg-pink min-w-fit p-2 hover:bg-rose-300">
                <a
                  href="#"
                  className="border-red text-red inline-block text-nowrap border-2 border-solid px-16 py-7 text-lg font-semibold focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-8 focus-visible:outline-rose-400"
                >
                  {isFilled.richText(slice.primary.button_text) && (
                    <PrismicRichText field={slice.primary.button_text} />
                  )}
                </a>
              </div>
              {isFilled.richText(slice.primary.description) && (
                <div className="mt-6 text-right text-lg leading-8 text-gray-600">
                  <PrismicRichText field={slice.primary.description} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div> */}
    </section>
  )
}

export default HeroImage
