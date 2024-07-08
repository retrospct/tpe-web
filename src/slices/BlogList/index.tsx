import { Text } from '@/components'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'

/**
 * Props for `BlogList`.
 */
export type BlogListProps = SliceComponentProps<Content.BlogListSlice>

/**
 * Component for "BlogList" Slices.
 */
const BlogList = ({ slice }: BlogListProps): JSX.Element => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="my-10 w-full">
      {slice.variation === 'default' && (
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-16">
          {isFilled.group(slice.primary.posts) &&
            slice.primary.posts.map(({ post }: { post: any }) => (
              <div key={post?.id || post.data?.uid}>
                {post?.url && (
                  <Link href={post.url} className="flex items-start justify-center gap-6">
                    {isFilled.image(post?.data?.thumbnail) && (
                      <PrismicNextImage field={post.data.thumbnail} className="h-96 w-auto" />
                    )}
                    <div className="flex max-w-lg flex-col gap-6 p-1">
                      <Text richText={post?.data?.title} size="2xl" className="text-balance text-primary" />
                      <Text richText={post?.data?.preview} className="text-pretty" />
                    </div>
                  </Link>
                )}
              </div>
            ))}
        </div>
      )}
    </section>
  )
}

export default BlogList
