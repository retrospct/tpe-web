import { linkResolver } from '@/prismicio'
import {
  PrismicRichText as BasePrismicRichText,
  PrismicText as BasePrismicText,
  PrismicRichTextProps,
  PrismicTextProps
} from '@prismicio/react'

export const PrismicRichText = (props: PrismicRichTextProps) => {
  return <BasePrismicRichText linkResolver={linkResolver} {...props} />
}

export const PrismicText = (props: PrismicTextProps) => {
  return <BasePrismicText {...props} />
}
