import { Heading, Text } from '@/components'
import { cn } from '@/lib/utils'
import { asText, Content, isFilled } from '@prismicio/client'
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
      className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-start px-6 pt-16 lg:px-0"
    >
      {slice.variation === 'default' && (
        <>
          <Heading text={asText(slice.primary.title)} className="mb-16 text-center" accents size="lg" />
          <div className="grid auto-cols-auto grid-cols-1 items-center justify-start gap-x-6 gap-y-12 self-center px-3 text-center font-medium text-primary md:grid-cols-2 md:items-start md:justify-start lg:grid-cols-3">
            {isFilled.group(slice.primary.persons) &&
              slice.primary.persons.map(({ person, full_width }: { person: any; full_width?: boolean }) => (
                <div
                  key={person.id}
                  className={cn(
                    'group/bio relative flex h-auto w-80 max-w-lg flex-col',
                    full_width &&
                      'col-span-1 w-full max-w-5xl gap-6 md:col-span-2 md:w-auto md:flex-row lg:col-span-3 lg:w-auto'
                  )}
                >
                  {isFilled.image(person?.data?.fun_image) && (
                    <PrismicNextImage
                      field={person.data.fun_image}
                      className={cn(
                        'absolute left-0 top-0 hidden h-80 w-80 group-hover/bio:block',
                        full_width && 'h-80 w-80 lg:h-96 lg:w-96'
                      )}
                      imgixParams={{
                        fit: 'crop',
                        crop: ['faces', 'edges'],
                        w: full_width ? 384 : 320,
                        h: full_width ? 384 : 320,
                        q: 90
                      }}
                      loading="lazy"
                      fallbackAlt=""
                    />
                  )}
                  {isFilled.image(person?.data?.image) && (
                    <PrismicNextImage
                      field={person.data.image}
                      className={cn('h-80 w-80', full_width && 'h-80 w-80 lg:h-96 lg:w-96')}
                      imgixParams={{
                        fit: 'crop',
                        crop: ['faces', 'edges'],
                        w: full_width ? 384 : 320,
                        h: full_width ? 384 : 320,
                        q: 90
                      }}
                      fallbackAlt=""
                    />
                  )}

                  <div className={cn('mt-4 flex w-full flex-col gap-1', full_width && 'mt-0')}>
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
                      className="mt-1 w-full text-pretty text-left uppercase text-primary"
                      size="md"
                    />
                    <Text
                      richText={person.data?.bio}
                      className="mt-3 w-full text-pretty text-left font-normal text-secondary"
                      size="md"
                    />
                    <Text
                      richText={person.data?.likes}
                      className="mt-3 w-full text-pretty text-left font-normal text-secondary"
                      size="md"
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
