import { TpRating } from '@/components/icons/TpRating'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Awards`.
 */
export type AwardsProps = SliceComponentProps<Content.AwardsSlice>

/**
 * Component for "Awards" Slices.
 */
const Awards = ({ slice }: AwardsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex items-center justify-center bg-foreground"
    >
      {slice.variation === 'default' && (
        <div className="my-10 flex w-full max-w-7xl flex-col items-center justify-evenly text-center font-medium text-primary lg:my-16 lg:flex-row">
          {slice.items.length > 0 &&
            slice.items.map((item) => (
              <div key={JSON.stringify(item)} className="flex flex-col items-center justify-center py-6">
                {isFilled.richText(item.title) && (
                  <p className="m-0 h-4 leading-none">
                    <PrismicText field={item.title} />
                  </p>
                )}
                {isFilled.image(item.logo) && isFilled.link(item.link) ? (
                  <PrismicNextLink field={item.link}>
                    <PrismicNextImage field={item.logo} className="mt-2 h-12 w-auto" />
                  </PrismicNextLink>
                ) : (
                  <PrismicNextImage field={item.logo} className="mt-2 h-12 w-auto" />
                )}
                {isFilled.richText(item.subtitle) && !isFilled.number(item.rating) && (
                  <p className="mt-2 h-4 leading-none">
                    <PrismicText field={item.subtitle} />
                  </p>
                )}
                {isFilled.number(item.rating) && <TpRating rating={item.rating} className="mt-2" />}
              </div>
            ))}
        </div>
      )}
    </section>
  )
}

export default Awards
