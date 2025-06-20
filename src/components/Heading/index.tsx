import { TpStar } from '@/components/icons'
import { cn } from '@/lib/utils'
import { RichTextField, isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { ReactNode } from 'react'

export const Heading = ({
  richText,
  text,
  className,
  size = 'lg',
  accents = false,
  accentBefore = false,
  accentAfter = false,
  accentSize = 'md'
}: {
  richText?: RichTextField | null
  text?: string
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | '7xl'
  accents?: boolean
  accentBefore?: boolean
  accentAfter?: boolean
  accentSize?: 'sm' | 'md' | 'lg'
}) => {
  const components = {
    heading1: ({ children }: { children: ReactNode }) => (
      <h1 className={cn('mb-0', getTitleSize(size !== 'lg' ? size : 'lg'))}>{children}</h1>
    ),
    heading2: ({ children }: { children: ReactNode }) => (
      <h2 className={cn('mb-0', getTitleSize(size !== 'lg' ? size : 'md'))}>{children}</h2>
    ),
    heading3: ({ children }: { children: ReactNode }) => (
      <h3 className={cn('mb-0', getTitleSize(size !== 'lg' ? size : 'sm'))}>{children}</h3>
    )
  }
  return (
    (isFilled.richText(richText) || text) && (
      <div
        className={cn(
          'font-serif font-normal tracking-widest text-primary *:tracking-widest',
          (accents || accentBefore || accentAfter) && 'flex items-center justify-center',
          className
        )}
      >
        {(accents || accentBefore) && <TpStar className={cn('mr-5 text-primary', getAccentSize(accentSize))} />}
        {text ? (
          <h2 className={cn('mb-0', getTitleSize(size))}>{text}</h2>
        ) : (
          <PrismicRichText field={richText} components={components} />
        )}
        {(accents || accentAfter) && <TpStar className={cn('ml-5 text-primary', getAccentSize(accentSize))} />}
      </div>
    )
  )
}

const getTitleSize = (size: 'xs' | 'sm' | 'md' | 'lg' | '7xl') => {
  switch (size) {
    case 'xs':
      return 'text-xl lg:text-2xl'
    case 'sm':
      return 'text-2xl lg:text-3xl'
    case 'md':
      return 'text-3xl lg:text-4xl'
    case '7xl':
      return 'text-5xl lg:text-7xl'
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
    <div id={anchor} className={cn('relative mb-6 w-full max-w-full overflow-hidden', className)}>
      <div className="absolute inset-0 flex max-w-full items-center pl-2 xl:pl-8" aria-hidden="true">
        <div className="relative w-full border border-accent" />
      </div>
      <div className="relative flex items-center justify-start">
        <TpStar className={cn('text-primary', bg)} />
        <div
          className={cn(
            'bg-background px-4 font-serif text-2xl uppercase leading-8 tracking-widest text-primary lg:text-3xl',
            bg
          )}
        >
          {isFilled.richText(richText) ? <PrismicRichText field={richText} /> : text}
        </div>
      </div>
    </div>
  )
}
