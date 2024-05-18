import { cn } from '@/lib/utils'
import { RichTextField, isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { components } from '../prismic'

export const Text = ({ richText, className }: { richText?: RichTextField | null; className?: string }) => {
  if (!isFilled.richText(richText)) return null
  return (
    <div className={cn('text-lg font-medium leading-8 text-secondary lg:text-xl', className)}>
      <PrismicRichText field={richText} components={components} />
    </div>
  )
}
