import { cn } from '@/lib/utils'
import { RichTextField, isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { components } from '../prismic'

export const Text = ({
  richText,
  text,
  size = 'lg',
  className,
  ...props
}: {
  richText?: RichTextField | null
  text?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'lgg' | 'xl' | '2xl' | '3xl' | '4xl'
  className?: string
}) => {
  if (!isFilled.richText(richText) && !text) return null
  return (
    <div className={cn('font-medium text-secondary', getTextSize(size), className)} {...props}>
      {text ? (
        <p className={cn('font-medium text-secondary', getTextSize(size), className)}>{text}</p>
      ) : (
        <PrismicRichText field={richText} components={components} />
      )}
    </div>
  )
}

const getTextSize = (size: 'xs' | 'sm' | 'md' | 'lg' | 'lgg' | 'xl' | '2xl' | '3xl' | '4xl') => {
  switch (size) {
    case 'xs':
      return 'text-xs lg:text-xs'
    case 'sm':
      return 'text-sm leading-normal *:leading-normal lg:leading-normal lg:text-sm'
    case 'md':
      return 'text-base leading-normal *:leading-normal lg:leading-normal lg:text-base'
    case 'lgg':
      return 'text-lg leading-normal *:leading-normal lg:leading-normal lg:text-lg'
    case 'xl':
      return 'text-xl lg:text-2xl'
    case '2xl':
      return 'text-2xl lg:text-3xl'
    case '3xl':
      return 'text-3xl lg:text-4xl'
    case '4xl':
      return 'text-4xl lg:text-5xl'
    default: // size="lg"
      return 'text-lg leading-normal *:leading-normal lg:leading-normal lg:text-xl'
  }
}
