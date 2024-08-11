import { Text } from '@/components'
import { blurImage, cn, ImageLayout } from '@/lib/utils'
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
            {/* {slice.items.length > 0 && <Buttonn items={slice.items} />} */}
            {slice.items.length > 0 &&
              slice.items.map(async (item) => {
                const imgWActual = item.image.dimensions?.width || 320
                const imgHActual = item.image.dimensions?.height || 480
                const layout: ImageLayout =
                  imgWActual === imgHActual ? 'square' : imgWActual > imgHActual ? 'landscape' : 'portrait'
                // console.log('item', item, 'layout', layout)
                const imgW = 320
                const imgH = layout === 'portrait' ? 480 : layout === 'landscape' ? 240 : imgW
                const blurImgData = await blurImage(item.image.url, { layout })
                return (
                  <div key={JSON.stringify(item)} className="relative overflow-hidden px-1 pt-2 lg:pt-5">
                    {isFilled.image(item.image) && (
                      <PrismicNextImage
                        field={{
                          ...item.image,
                          dimensions: { width: imgW, height: imgH }
                        }}
                        className={cn(
                          'h-auto object-cover',
                          layout === 'portrait' ? 'w-80' : layout === 'square' ? 'h-80 w-80' : 'h-60 w-80'
                        )}
                        imgixParams={{
                          w: imgW,
                          h: imgH,
                          q: 90,
                          fit: 'crop',
                          crop: ['faces', 'edges']
                        }}
                        width={imgW}
                        height={imgH}
                        placeholder="blur"
                        blurDataURL={blurImgData}
                        // blurDataURL={rgbDataURL(252, 244, 236) rgbDataURL(238, 200, 203)}
                        // blurDataURL={getBase64Blur(layout)}
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
