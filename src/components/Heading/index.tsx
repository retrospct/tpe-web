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
        <TpStar className="mr-5 text-pink" />
        <PrismicRichText field={richText} />
        <TpStar className="ml-5 text-pink" />
      </div>
    )
  )
}
