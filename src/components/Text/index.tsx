import { cn } from '@/lib/utils'
import { RichTextField, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { components } from '../prismic'

export const Text = ({
  richText,
  text,
  size = 'lg',
  className,
  blogContent,
  ...props
}: {
  richText?: RichTextField | null
  text?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'lgg' | 'xl' | '2xl' | '3xl' | '4xl'
  className?: string
  blogContent?: boolean
}) => {
  if (!isFilled.richText(richText) && !text) return null
  return (
    <div className={cn('font-medium text-secondary', getTextSize(size), className)} {...props}>
      {text ? (
        <p className={cn('font-medium text-secondary', getTextSize(size), className)}>{text}</p>
      ) : (
        <PrismicRichText
          field={richText}
          components={
            blogContent
              ? {
                  ...components,
                  image: ({ node, key }) => {
                    const img = (
                      <PrismicNextImage
                        field={node}
                        className="h-auto w-full"
                        width={256}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        imgixParams={{ q: 90, w: 256 }}
                      />
                    )
                    return (
                      <div key={key} className="relative w-64">
                        {node.linkTo ? <PrismicNextLink field={node.linkTo}>{img}</PrismicNextLink> : img}
                      </div>
                    )
                  }
                }
              : components
          }
        />
      )}
    </div>
  )
}

const getTextSize = (size: 'xs' | 'sm' | 'md' | 'lg' | 'lgg' | 'xl' | '2xl' | '3xl' | '4xl') => {
  switch (size) {
    case 'xs':
      return '*:text-xs lg:*:text-xs'
    case 'sm':
      return '*:text-sm leading-normal *:leading-normal lg:*:leading-normal lg:*:text-sm'
    case 'md':
      return '*:text-base leading-normal *:leading-normal lg:*:leading-normal lg:*:text-base'
    case 'lgg':
      return '*:text-lg leading-normal *:leading-normal lg:*:leading-normal lg:*:text-lg'
    case 'xl':
      return '*:text-xl lg:*:text-2xl'
    case '2xl':
      return '*:text-2xl lg:*:text-3xl'
    case '3xl':
      return '*:text-3xl lg:*:text-4xl'
    case '4xl':
      return '*:text-4xl lg:*:text-5xl'
    default: // size="lg"
      return '*:text-lg leading-normal *:leading-normal lg:*:leading-normal lg:*:text-xl'
  }
}
