import { cn } from '@/lib/utils'
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
      className="mx-auto flex w-full max-w-8xl flex-col items-center justify-start"
    >
      {slice.variation === 'default' && (
        <div className="my-10 columns-1 gap-1 text-center font-medium text-primary md:columns-2 md:gap-2 lg:my-16 lg:columns-3 lg:gap-3">
          {slice.items.length > 0 &&
            slice.items.map((item) => (
              <div key={JSON.stringify(item)} className="relative mb-3 overflow-hidden">
                {isFilled.image(item.image) && (
                  <PrismicNextImage
                    field={item.image}
                    // fill={item.layout !== 'portrait'}
                    className={cn(
                      'h-auto w-auto object-cover',
                      item.layout === 'portrait' ? 'w-80' : item.layout === 'square' ? 'h-80 w-80' : 'h-60 w-80'
                    )}
                  />
                )}
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
