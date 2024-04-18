import { Content, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `NavItem`.
 */
export type NavItemProps = SliceComponentProps<Content.NavItemSlice>

/**
 * Component for "NavItem" Slices.
 */
const NavItem = ({ slice }: NavItemProps): JSX.Element => {
  return (
    <li data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      {isFilled.link(slice.primary.link) && (
        <PrismicNextLink field={slice.primary.link}>
          {isFilled.richText(slice.primary.name) && <PrismicText field={slice.primary.name} />}
        </PrismicNextLink>
      )}
    </li>
  )
}

export default NavItem
