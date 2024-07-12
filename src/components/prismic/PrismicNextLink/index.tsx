import { PrismicNextLink as BasePrismicNextLink, PrismicNextLinkProps } from '@prismicio/next'

export const PrismicNextLink = (props: PrismicNextLinkProps) => {
  return <BasePrismicNextLink rel={({ isExternal }) => (isExternal ? 'noopener' : undefined)} {...props} />
}
