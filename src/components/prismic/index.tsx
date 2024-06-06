import { PrismicNextLink } from '@prismicio/next'
import { JSXMapSerializer } from '@prismicio/react'

export const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return (
      <span className="underline">
        <PrismicNextLink field={node.data}>{children}</PrismicNextLink>
      </span>
    )
  }
  // label: ({ node, children }) => {
  //   if (node.data.label === 'codespan') {
  //     return <code>{children}</code>
  //   }
  // }
}
