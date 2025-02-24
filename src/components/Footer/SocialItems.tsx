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
                  className="text-primary hover:text-accent-hover focus-visible:ring-accent-hover font-medium underline-offset-8 transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-label={`Link to Two Perfect Events ${item.platform} webpage`}
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
