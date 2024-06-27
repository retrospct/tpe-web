import { Heading, Text } from '@/components'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Profile`.
 */
export type ProfileProps = SliceComponentProps<Content.ProfileSlice>

/**
 * Component for "Profile" Slices.
 */
const Profile = ({ slice }: ProfileProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mx-auto mt-14 flex w-full max-w-7xl flex-col items-center justify-start px-6 lg:px-8"
    >
      {slice.variation === 'default' && (
        <div className="grid auto-cols-auto grid-cols-1 items-center justify-start gap-x-6 gap-y-12 self-center text-center font-medium text-primary md:grid-cols-2 md:items-start md:justify-start lg:grid-cols-3">
          {slice.items?.length > 0 &&
            slice.items.map(({ member, full_width }: { member: any; full_width?: boolean }) => (
              <div
                key={member.uid}
                className={cn(
                  'relative flex h-auto w-72 flex-col',
                  full_width &&
                    'col-span-1 w-72 flex-col gap-6 md:col-span-2 md:w-auto md:flex-row lg:col-span-3 lg:w-auto'
                )}
              >
                {isFilled.image(member?.data?.image) && (
                  <PrismicNextImage
                    field={member.data.image}
                    className={cn('h-72 w-72', full_width && 'h-72 w-72 md:h-96 md:w-96')}
                  />
                )}
                <div className={cn('mt-4 flex max-w-lg flex-col gap-1', full_width && 'mt-0')}>
                  <div className="flex items-center gap-1">
                    <Heading richText={member.data?.first_name} className="tracking-normal" size="xs" />
                    <Heading richText={member.data?.last_name} className="tracking-normal" size="xs" />
                    <Text
                      richText={member.data?.pronouns}
                      className="text-left text-sm tracking-normal text-primary lg:text-sm"
                    />
                  </div>
                  <Text
                    richText={member.data?.title}
                    className="mt-1 w-full text-pretty text-left text-base uppercase text-primary lg:text-base"
                  />
                  <Text
                    richText={member.data?.bio}
                    className="mt-3 w-full text-pretty text-left text-base font-normal text-secondary lg:text-base"
                  />
                  <Text
                    richText={member.data?.likes}
                    className="mt-3 w-full text-pretty text-left text-base text-secondary lg:text-base"
                  />
                </div>
              </div>
            ))}
          {/* <code className="text-left">
            <pre>{JSON.stringify(slice.items, null, 2)}</pre>
          </code> */}
        </div>
      )}
    </section>
  )
}

export default Profile
