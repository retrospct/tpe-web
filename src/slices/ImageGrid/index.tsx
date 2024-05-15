import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ImageGrid`.
 */
export type ImageGridProps = SliceComponentProps<Content.ImageGridSlice>

/**
 * Component for "ImageGrid" Slices.
 */
const ImageGrid = ({ slice }: ImageGridProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex items-center justify-center"
    >
      {slice.variation === 'default' && (
        <div className="my-10 flex w-full max-w-8xl flex-col items-center justify-center text-center font-medium text-red lg:my-16 lg:flex-row">
          {slice.items.length > 0 &&
            slice.items.map((item) => (
              <div key={JSON.stringify(item)} className="m-3 flex flex-col items-center justify-center">
                {isFilled.image(item.image) && <PrismicNextImage field={item.image} className="h-96 w-auto" />}
                {/* {isFilled.richText(item.caption) && (
                  <div className="m-0 h-4 leading-none">
                    <PrismicRichText field={item.caption} />
                  </div>
                )} */}
                {/* <p>{item.layout}</p> */}
              </div>
            ))}
        </div>
      )}
    </section>
  )
}

export default ImageGrid
