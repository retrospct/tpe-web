import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicText } from '@prismicio/react'

export async function Nav() {
  const client = createClient()
  const navigation = await client.getByUID('nav', 'main-nav')
  return (
    <nav>
      <ul>
        {/* Renders top-level links. */}
        {navigation.data.slices.map((slice) => {
          return (
            <li key={slice.id}>
              <PrismicNextLink field={slice.primary.link}>
                <PrismicText field={slice.primary.name} />
              </PrismicNextLink>
              {/* Renders child links, if present. */}
              {slice.items.length > 0 && (
                <ul>
                  {slice.items.map((item) => {
                    return (
                      <li key={JSON.stringify(item)}>
                        <PrismicNextLink field={item.child_link}>
                          <PrismicText field={item.child_name} />
                        </PrismicNextLink>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
