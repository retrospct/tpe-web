import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

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
      Placeholder component for nav_item (variation: {slice.variation}) Slices
    </li>
  )
}

export default NavItem
