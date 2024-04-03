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
      className="bg-red flex h-screen items-center justify-center gap-6"
    >
      {slice.items.length > 0 &&
        slice.items.map((item, i) => (
          <div key={`item-${i + 1}`} className="text-pink flex items-center justify-center gap-6">
            <StarSVG />
            {isFilled.richText(item.title) && (
              <div className="text-2xl tracking-widest">
                <PrismicRichText field={item.title} />
              </div>
            )}
            {slice.items.length - 1 === i && <StarSVG />}
          </div>
        ))}
    </section>
  )
}

export default Banner
