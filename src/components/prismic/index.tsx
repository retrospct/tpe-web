import { PrismicNextLink } from '@prismicio/next'
import { JSXMapSerializer } from '@prismicio/react'

export const components: JSXMapSerializer = {
  // heading1: ({ children, key }) => <h1 key={key}>{children}</h1>,
  // heading2: ({ children, key }) => <h2 key={key}>{children}</h2>,
  // heading3: ({ children, key }) => <h3 key={key}>{children}</h3>,
  // heading4: ({ children, key }) => <h4 key={key}>{children}</h4>,
  // heading5: ({ children, key }) => <h5 key={key}>{children}</h5>,
  // heading6: ({ children, key }) => <h6 key={key}>{children}</h6>,
  // paragraph: ({ children, key }) => <p key={key}>{children}</p>,
  // preformatted: ({ node, key }) => <pre key={key}>{node.text}</pre>,
  // strong: ({ children, key }) => <strong key={key}>{children}</strong>,
  // em: ({ children, key }) => <em key={key}>{children}</em>,
  // listItem: ({ children, key }) => <li key={key}>{children}</li>,
  // oListItem: ({ children, key }) => <li key={key}>{children}</li>,
  list: ({ children, key }) => (
    <ul key={key} className="list-inside list-disc">
      {children}
    </ul>
  ),
  oList: ({ children, key }) => (
    <ol key={key} className="list-inside list-decimal">
      {children}
    </ol>
  ),
  // image: ({ node, key }) => {
  //   const img = (
  //     <img
  //       src={node.url}
  //       alt={node.alt ?? undefined}
  //       data-copyright={node.copyright ? node.copyright : undefined}
  //     />
  //   )
  //   return (
  //     <p key={key} className='block-img'>
  //       {node.linkTo ? (
  //         <PrismicLink
  //           linkResolver={args.linkResolver}
  //           internalComponent={args.internalLinkComponent}
  //           externalComponent={args.externalLinkComponent}
  //           field={node.linkTo}
  //         >
  //           {img}
  //         </PrismicLink>
  //       ) : (
  //         img
  //       )}
  //     </p>
  //   )
  // },
  // embed: ({ node, key }) => (
  //   <div
  //     key={key}
  //     data-oembed={node.oembed.embed_url}
  //     data-oembed-type={node.oembed.type}
  //     data-oembed-provider={node.oembed.provider_name}
  //     dangerouslySetInnerHTML={{ __html: node.oembed.html ?? '' }}
  //   />
  // ),
  hyperlink: ({ node, children }) => {
    return (
      <span className="underline-offset-4 transition-colors hover:text-primary/85 hover:underline">
        <PrismicNextLink field={node.data}>{children}</PrismicNextLink>
      </span>
    )
  }
  // label: ({ node, children }) => {
  //   if (node.data.label === 'codespan') {
  //     return <code>{children}</code>
  //   }
  // }
  // label: ({ node, children, key }) => (
  //   <span key={key} className={node.data.label}>
  //     {children}
  //   </span>
  // ),
  // span: ({ text, key }) => {
  //   const result: React.ReactNode[] = []
  //   let i = 0
  //   for (const line of text.split('\n')) {
  //     if (i > 0) {
  //       result.push(<br key={`${i}__break`} />)
  //     }
  //     result.push(
  //       <React.Fragment key={`${i}__line`}>{line}</React.Fragment>
  //     )
  //     i++
  //   }
  //   return <React.Fragment key={key}>{result}</React.Fragment>
  // },
}
