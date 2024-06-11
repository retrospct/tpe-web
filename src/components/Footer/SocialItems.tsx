import { SliceZone, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { FooterDocumentDataSlicesSlice } from '../../../prismicio-types'
import { TpBrandFacebook, TpBrandInstagram, TpBrandPinterest, TpBrandTikTok, TpBrandYelp } from '../icons'

const platforms = new Map([
  ['Facebook', { platform: 'Facebook', icon: <TpBrandFacebook /> }],
  ['Instagram', { platform: 'Instagram', icon: <TpBrandInstagram /> }],
  ['Yelp', { platform: 'Yelp', icon: <TpBrandYelp /> }],
  ['TikTok', { platform: 'TikTok', icon: <TpBrandTikTok /> }],
  ['Pinterest', { platform: 'Pinterest', icon: <TpBrandPinterest /> }],
  ['Unknown', { platform: 'Unknown', icon: <TpBrandFacebook /> }]
])

export const SocialItems = ({ slices }: { slices: SliceZone<FooterDocumentDataSlicesSlice> }) => {
  return slices.map((slice) => {
    if (slice.slice_type === 'social_item') {
      return (
        <div key={slice.id} className="flex items-center justify-center gap-6">
          {slice.items.map(
            (item) =>
              isFilled.link(item.link) && (
                <PrismicNextLink
                  key={JSON.stringify(item)}
                  field={item.link}
                  className="font-medium text-primary underline-offset-8 transition-all hover:scale-105 hover:text-primary/90"
                >
                  {platforms.get(item?.platform || 'Unknown')?.icon}
                </PrismicNextLink>
              )
          )}
        </div>
      )
    }
  })
}
export default SocialItems
