import { Text } from '@/components'
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
        <>
          <div className="my-4 columns-2 gap-0 text-center font-medium text-primary lg:my-6 lg:columns-3 lg:gap-3">
            {slice.items.length > 0 &&
              slice.items.map((item) => (
                <div key={JSON.stringify(item)} className="relative overflow-hidden px-1 pt-3">
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
          <Text richText={slice.primary.photo_credits} className="mt-4 w-full text-center text-primary" size="md" />
        </>
      )}
    </section>
  )
}

export default ImageGrid
