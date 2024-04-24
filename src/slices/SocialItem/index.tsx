import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `SocialItem`.
 */
export type SocialItemProps = SliceComponentProps<Content.SocialItemSlice>

/**
 * Component for "SocialItem" Slices.
 */
const SocialItem = ({ slice }: SocialItemProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      Placeholder component for social_item (variation: {slice.variation}) Slices
    </section>
  )
}

export default SocialItem
