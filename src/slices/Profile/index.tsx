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
      className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-start px-6 pt-16 lg:px-8"
    >
      {slice.variation === 'default' && (
        <>
          <Heading richText={slice.primary.title} className="mb-16 text-center" accents />
          <div className="grid auto-cols-auto grid-cols-1 items-center justify-start gap-x-6 gap-y-12 self-center text-center font-medium text-primary md:grid-cols-2 md:items-start md:justify-start lg:grid-cols-3">
            {isFilled.group(slice.primary.persons) &&
              slice.primary.persons.map(({ person, full_width }: { person: any; full_width?: boolean }) => (
                <div
                  key={person.id}
                  className={cn(
                    'relative flex h-auto w-80 flex-col',
                    full_width &&
                      'col-span-1 w-80 flex-col gap-6 md:col-span-2 md:w-auto md:flex-row lg:col-span-3 lg:w-auto'
                  )}
                >
                  {isFilled.image(person?.data?.image) && (
                    <PrismicNextImage
                      field={person.data.image}
                      className={cn('h-80 w-80', full_width && 'h-80 w-80 md:h-96 md:w-96')}
                    />
                  )}
                  <div className={cn('mt-4 flex max-w-lg flex-col gap-1', full_width && 'mt-0')}>
                    <div className="flex items-center gap-1">
                      <Heading richText={person.data?.first_name} className="tracking-normal" size="xs" />
                      <Heading richText={person.data?.last_name} className="tracking-normal" size="xs" />
                      <Text
                        richText={person.data?.pronouns}
                        className="text-left tracking-normal text-primary"
                        size="sm"
                      />
                    </div>
                    <Text
                      richText={person.data?.title}
                      className="mt-1 w-full text-pretty text-left text-base uppercase text-primary lg:text-base"
                    />
                    <Text
                      richText={person.data?.bio}
                      className="mt-3 w-full text-pretty text-left text-base font-normal text-secondary lg:text-base"
                    />
                    <Text
                      richText={person.data?.likes}
                      className="mt-3 w-full text-pretty text-left text-base text-secondary lg:text-base"
                    />
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Profile
