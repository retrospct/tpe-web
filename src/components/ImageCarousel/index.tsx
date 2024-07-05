'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { GroupField, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import Autoplay from 'embla-carousel-autoplay'
import { ServicesSliceGraphicDesignPrimaryImagesItem, Simplify } from '../../../prismicio-types'

export const ImageCarousel = ({
  images,
  controls = false,
  duration = 4000,
  className
}: {
  images: GroupField<Simplify<ServicesSliceGraphicDesignPrimaryImagesItem>>
  controls?: boolean
  duration?: number
  className?: string
}) => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: duration, stopOnInteraction: false, stopOnMouseEnter: true })]}
      className={cn('relative', className)}
    >
      <CarouselContent>
        {images.map(
          (item, i) =>
            isFilled.image(item.image) && (
              <CarouselItem key={`design-img-${i}`} className="flex items-center justify-center">
                <div className={cn('relative max-h-[466px] min-h-fit max-w-5xl lg:max-h-[562px]', className)}>
                  <PrismicNextImage field={item.image} />
                </div>
              </CarouselItem>
            )
        )}
      </CarouselContent>
      {controls && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  )
}
