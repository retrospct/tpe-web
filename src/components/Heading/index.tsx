import { TpStar } from '@/components/icons'
import { cn } from '@/lib/utils'
import { RichTextField, isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

export const Heading = ({
  richText,
  className,
  size = 'lg',
  accents = false,
  accentBefore = false,
  accentAfter = false,
  accentSize = 'md'
}: {
  richText?: RichTextField | null
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  accents?: boolean
  accentBefore?: boolean
  accentAfter?: boolean
  accentSize?: 'sm' | 'md' | 'lg'
}) => {
  return (
    isFilled.richText(richText) && (
      <div
        className={cn(
          'font-serif font-normal tracking-wider text-primary',
          getTitleSize(size),
          (accents || accentBefore || accentAfter) && 'flex items-center justify-center',
          className
        )}
      >
        {(accents || accentBefore) && <TpStar className={cn('mr-5 text-primary', getAccentSize(accentSize))} />}
        <PrismicRichText field={richText} />
        {(accents || accentAfter) && <TpStar className={cn('ml-5 text-primary', getAccentSize(accentSize))} />}
      </div>
    )
  )
}

const getTitleSize = (size: 'xs' | 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'xs':
      return 'text-xl lg:text-2xl'
    case 'sm':
      return 'text-2xl lg:text-3xl'
    case 'md':
      return 'text-3xl lg:text-4xl'
    default:
      return 'text-4xl lg:text-5xl'
  }
}

const getAccentSize = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'h-4 w-4'
    case 'md':
      return 'h-6 w-6'
    case 'lg':
      return 'h-8 w-8'
  }
}

export const HeadingDivider = ({
  text,
  richText,
  className,
  anchor = text?.toLowerCase().replace(/\s/g, '-'),
  bg = 'bg-background'
}: {
  text?: string
  richText?: RichTextField | null
  className?: string
  anchor?: string
  bg?: string
}) => {
  return (
    <div id={anchor} className={cn('relative mb-6 w-[calc(100%-0.5rem)] xl:w-[calc(100%-2rem)]', className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-2 border-accent" />
      </div>
      <div className="relative flex items-center justify-start">
        <TpStar className={cn('-ml-2 text-primary xl:-ml-8', bg)} />
        <div className={cn('bg-background px-4 font-serif text-2xl uppercase leading-8 text-primary lg:text-3xl', bg)}>
          {isFilled.richText(richText) ? <PrismicRichText field={richText} /> : text}
        </div>
      </div>
    </div>
  )
}
