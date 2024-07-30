import { Text } from '@/components'
import { cn, getBase64Blur } from '@/lib/utils'
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
              slice.items.map(async (item) => {
                return (
                  <div key={JSON.stringify(item)} className="relative overflow-hidden px-1 pt-2 lg:pt-5">
                    {isFilled.image(item.image) && (
                      <PrismicNextImage
                        // field={{...item.image, url: item.layout === 'portrait' ? `${item.image.url}?w=320` : item.layout === 'square' ? `${item.image.url}?w=320&h=320` : `${item.image.url}?w=320&h=240`, dimensions: { width: 320, height: item.layout === 'portrait' || item.layout === 'square' ? 320 : 240 }}}
                        field={{
                          ...item.image,
                          dimensions: {
                            width: 320,
                            height: item.layout === 'portrait' ? 480 : item.layout === 'landscape' ? 240 : 320
                          }
                        }}
                        // loader={undefined}
                        className={cn(
                          'h-auto w-auto object-cover',
                          item.layout === 'portrait' ? 'w-80' : item.layout === 'square' ? 'h-80 w-80' : 'h-60 w-80'
                        )}
                        imgixParams={{
                          w: 320,
                          h: item.layout === 'portrait' ? 480 : item.layout === 'landscape' ? 240 : 320,
                          q: 90,
                          fit: 'crop',
                          crop: ['faces', 'edges']
                        }}
                        placeholder="blur"
                        // blurDataURL={rgbDataURL(238, 200, 203)}
                        blurDataURL={getBase64Blur(item.layout)}
                        fallbackAlt=""
                      />
                    )}
                  </div>
                )
              })}
          </div>
          <Text richText={slice.primary.credits} className="mt-4 w-full text-center text-primary" size="md" />
        </>
      )}
    </section>
  )
}

export default ImageGrid
