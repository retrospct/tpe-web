import { TpStar } from '@/components/icons'
import { cn } from '@/lib/utils'
import { RichTextField, isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

export const Heading = ({ richText, className }: { richText?: RichTextField | null; className?: string }) => {
  return (
    isFilled.richText(richText) && (
      <div
        className={cn(
          'mx-3 flex items-center justify-center text-center font-serif text-4xl font-normal tracking-wider text-red lg:mx-6 lg:text-5xl',
          className
        )}
      >
        <TpStar className="mr-5 text-primary" />
        <PrismicRichText field={richText} />
        <TpStar className="ml-5 text-primary" />
      </div>
    )
  )
}

export const HeadingDivider = ({
  text,
  richText,
  className
}: {
  text?: string
  richText?: RichTextField | null
  className?: string
}) => {
  return (
    <div className={cn('relative mb-6 w-full', className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-2 border-accent" />
      </div>
      <div className="relative flex items-center justify-start">
        <TpStar className="-ml-2 bg-background text-primary xl:-ml-8" />
        <span className="bg-background px-4 font-serif text-4xl uppercase leading-8 text-primary">
          {isFilled.richText(richText) ? <PrismicRichText field={richText} /> : text}
        </span>
      </div>
    </div>
  )
}
