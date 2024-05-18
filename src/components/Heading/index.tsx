import { TpStar } from '@/components/icons'
import { cn } from '@/lib/utils'
import { RichTextField, isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

export const Heading = ({
  richText,
  className,
  sectionTitle = false,
  accents = false,
  accentBefore = false,
  accentAfter = false,
  accentSize = 'md'
}: {
  richText?: RichTextField | null
  className?: string
  sectionTitle?: boolean
  accents?: boolean
  accentBefore?: boolean
  accentAfter?: boolean
  accentSize?: 'sm' | 'md' | 'lg'
}) => {
  return (
    isFilled.richText(richText) && (
      <div
        className={cn(
          'font-serif text-4xl font-normal tracking-wider text-primary lg:text-5xl',
          (accents || accentBefore || accentAfter) && 'flex items-center justify-center',
          sectionTitle && 'mx-3 text-center lg:mx-6',
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
  anchor = text?.toLowerCase().replace(/\s/g, '-')
}: {
  text?: string
  richText?: RichTextField | null
  className?: string
  anchor?: string
}) => {
  return (
    <div id={anchor} className={cn('relative mb-6 w-full', className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-2 border-accent" />
      </div>
      <div className="relative flex items-center justify-start">
        <TpStar className="-ml-2 bg-background text-primary xl:-ml-8" />
        <div className="bg-background px-4 font-serif text-2xl uppercase leading-8 text-primary lg:text-3xl">
          {isFilled.richText(richText) ? <PrismicRichText field={richText} /> : text}
        </div>
      </div>
    </div>
  )
}
