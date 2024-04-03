import StarSVG from '@/components/svg/Star'
import { Content, isFilled } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Banner`.
 */
export type BannerProps = SliceComponentProps<Content.BannerSlice>

/**
 * Component for "Banner" Slices.
 */
const Banner = ({ slice }: BannerProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-red flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-4 md:py-0"
    >
      {slice.items.length > 0 &&
        slice.items.map((item, i) => (
          <div key={`item-${i + 1}`} className="text-pink flex items-center justify-center gap-6">
            <StarSVG />
            {isFilled.richText(item.title) && (
              <div className="text-2xl font-light tracking-widest">
                <PrismicRichText field={item.title} />
              </div>
            )}
            {slice.items.length - 1 === i ? <StarSVG /> : <StarSVG className="block sm:hidden" />}
          </div>
        ))}
    </section>
  )
}

export default Banner
