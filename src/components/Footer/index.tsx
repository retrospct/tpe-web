import { createClient } from '@/prismicio'

import { cn } from '@/lib/utils'
import { isFilled } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import NavItems from './NavItems'
import NavLogo from './NavLogo'

export default async function Footer() {
  const client = createClient()
  const navigation = await client.getByUID('footer', 'main-footer')

  return (
    <footer className="my-16">
      <NavLogo />
      <NavItems navigation={navigation} />

      {isFilled.richText(navigation.data.newsletter_cta) && isFilled.richText(navigation.data.newsletter_text) && (
        <div className="mx-auto mt-8 flex w-full flex-col items-center justify-center px-6 text-center text-red lg:px-12">
          <div className="mb-3 flex items-center justify-center gap-1">
            <input
              type="email"
              placeholder={
                isFilled.keyText(navigation.data.newsletter_input) ? navigation.data.newsletter_input : 'Email Address*'
              }
              // value={navigation.data.newsletter_input}
              required
            />
            <PrismicRichText field={navigation.data.newsletter_cta} />
          </div>
          <div className="max-w-72 font-light">
            <PrismicRichText field={navigation.data.newsletter_text} />
          </div>
        </div>
      )}

      {/* {navigation.data?.newsletter?.length > 0 && (
        <div className="mx-auto flex w-full flex-col items-center justify-center px-6 text-center text-red lg:flex-row lg:justify-between lg:px-12">
          {navigation.data.newsletter.map((news) => {
            if (isFilled.richText(news.text)) {
              return <PrismicRichText key={JSON.stringify(news)} field={news.text} />
            }
            if (isFilled.richText(news.cta)) {
              return <PrismicRichText key={JSON.stringify(news)} field={news.cta} />
            }
            if (isFilled.richText(news.input)) {
              return <PrismicRichText key={JSON.stringify(news)} field={news.input} />
            }
          })}
        </div>
      )} */}
      {navigation.data?.statements?.length > 0 && (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 text-center text-red lg:flex-row lg:justify-between lg:px-12">
          {navigation.data.statements.map(
            (statement, i) =>
              isFilled.richText(statement.text) && (
                <div
                  key={`statement-${i}`}
                  className={cn('mt-6 text-sm', i === 1 && 'order-first text-base font-medium lg:order-none')}
                >
                  <PrismicRichText field={statement.text} />
                </div>
              )
          )}
        </div>
      )}
      {isFilled.richText(navigation.data.copyright) && (
        <div className="mx-auto mt-6 max-w-xs px-6 text-center text-xs text-red lg:mt-1 lg:max-w-full lg:px-12">
          <PrismicRichText field={navigation.data.copyright} />
        </div>
      )}
    </footer>
  )
}

// 'use client'

// import Link from 'next/link'
// import * as React from 'react'

// import { TpLogo } from '@/components/icons'
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle
// } from '@/components/ui/navigation-menu'
// import { cn } from '@/lib/utils'

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: 'Alert Dialog',
//     href: '/docs/primitives/alert-dialog',
//     description: 'A modal dialog that interrupts the user with important content and expects a response.'
//   },
//   {
//     title: 'Hover Card',
//     href: '/docs/primitives/hover-card',
//     description: 'For sighted users to preview content available behind a link.'
//   },
//   {
//     title: 'Progress',
//     href: '/docs/primitives/progress',
//     description:
//       'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.'
//   },
//   {
//     title: 'Scroll-area',
//     href: '/docs/primitives/scroll-area',
//     description: 'Visually or semantically separates content.'
//   },
//   {
//     title: 'Tabs',
//     href: '/docs/primitives/tabs',
//     description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
//   },
//   {
//     title: 'Tooltip',
//     href: '/docs/primitives/tooltip',
//     description:
//       'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.'
//   }
// ]

// export function Navigation() {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
//                     href="/"
//                   >
//                     {/* <Icons.logo className="h-6 w-6" /> */}
//                     <TpLogo />
//                     <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
//                     <p className="text-muted-foreground text-sm leading-tight">
//                       Beautifully designed components that you can copy and paste into your apps. Accessible.
//                       Customizable. Open Source.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               <ListItem href="/docs" title="Introduction">
//                 Re-usable components built using Radix UI and Tailwind CSS.
//               </ListItem>
//               <ListItem href="/docs/installation" title="Installation">
//                 How to install dependencies and structure your app.
//               </ListItem>
//               <ListItem href="/docs/primitives/typography" title="Typography">
//                 Styles for headings, paragraphs, lists...etc
//               </ListItem>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//               {components.map((component) => (
//                 <ListItem key={component.title} title={component.title} href={component.href}>
//                   {component.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <Link href="/docs" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

// const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
//   ({ className, title, children, ...props }, ref) => {
//     return (
//       <li>
//         <NavigationMenuLink asChild>
//           <a
//             ref={ref}
//             className={cn(
//               'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
//               className
//             )}
//             {...props}
//           >
//             <div className="text-sm font-medium leading-none">{title}</div>
//             <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
//           </a>
//         </NavigationMenuLink>
//       </li>
//     )
//   }
// )
// ListItem.displayName = 'ListItem'
