import { linkResolver } from '@/prismicio'
import { PrismicNextLink as BasePrismicNextLink, PrismicNextLinkProps } from '@prismicio/next'

export const PrismicNextLink = (props: PrismicNextLinkProps) => {
  return <BasePrismicNextLink linkResolver={linkResolver} {...props} />
}
