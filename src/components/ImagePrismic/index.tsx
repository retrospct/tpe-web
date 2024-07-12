import { cn } from '@/lib/utils'
import { ImageField, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

export const ImagePrismic = ({ image, className }: { image: ImageField; className?: string }) => {
  if (!isFilled.image(image)) return null
  return (
    <div className={cn('relative', className)}>
      <PrismicNextImage field={image} />
    </div>
  )
}
