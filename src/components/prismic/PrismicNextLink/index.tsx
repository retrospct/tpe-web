import { PrismicNextLink as BasePrismicNextLink, PrismicNextLinkProps } from '@prismicio/next'

// NOTE: Temp override to fix issues with @prismicio/next >v1.6.0 until a full upgrade of next.js + prismicio is done
type BasePrismicNextLinkProps = PrismicNextLinkProps & { prefetch?: boolean }

export const PrismicNextLink = (props: BasePrismicNextLinkProps) => {
  return <BasePrismicNextLink rel={({ isExternal }) => (isExternal ? 'noopener' : undefined)} {...props} />
}
