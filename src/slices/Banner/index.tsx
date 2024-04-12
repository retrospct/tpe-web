import { TpStar } from '@/components/svg'
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
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 bg-red py-4 md:py-0"
    >
      {slice.items.length > 0 &&
        slice.items.map((item, i) => (
          <div key={`item-${i + 1}`} className="flex items-center justify-center gap-6 text-pink">
            <TpStar />
            {isFilled.richText(item.title) && (
              <div className="text-2xl font-light tracking-widest">
                <PrismicRichText field={item.title} />
              </div>
            )}
            {slice.items.length - 1 === i ? <TpStar /> : <TpStar className="block sm:hidden" />}
          </div>
        ))}
    </section>
  )
}

export default Banner
