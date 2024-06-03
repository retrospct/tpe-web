import { cn } from '@/lib/utils'
import { RichTextField, isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { components } from '../prismic'

export const Text = ({
  richText,
  size = 'lg',
  className
}: {
  richText?: RichTextField | null
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}) => {
  if (!isFilled.richText(richText)) return null
  return (
    <div className={cn('font-medium text-secondary', getTextSize(size), className)}>
      <PrismicRichText field={richText} components={components} />
    </div>
  )
}

const getTextSize = (size: 'xs' | 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'xs':
      return 'text-xs lg:text-xs'
    case 'sm':
      return 'text-sm lg:text-sm'
    case 'md':
      return 'text-base lg:text-base'
    default:
      // leading-8
      return 'text-lg lg:text-xl'
  }
}
