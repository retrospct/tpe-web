'use client'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { asText, isFilled } from '@prismicio/client'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ChevronDownIcon, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { forwardRef, useState } from 'react'
import { NavDocument } from '../../../prismicio-types'
import { TpStar } from '../icons'
import NavLogo from './NavLogo'

const NavItems = ({ navigation, ...props }: { navigation: NavDocument<string> }) => {
  const pathname = usePathname()
  return (
    <nav className="mx-auto flex w-full max-w-3xl items-center justify-center px-6 py-3 lg:px-8">
      <NavigationMenu>
        <NavigationMenuList className="w-full flex-none flex-col justify-between gap-4 md:flex-row md:gap-0">
          {navigation.data.slices.map((slice, i) => {
            const link = isFilled.link(slice.primary.link) && slice.primary.link?.url ? slice.primary.link.url : ''
            if (slice.items.length > 0) {
              return (
                <NavigationMenuItem key={`nav-item-${i}`} className="group/active relative">
                  <NavigationMenuTrigger className="px-5 text-primary">
                    <Link href={link}>{isFilled.richText(slice.primary.name) && asText(slice.primary.name)}</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="relative pb-1">
                    <ul className="grid w-[160px] grid-cols-1 items-center justify-center gap-2 px-2 py-5">
                      {slice.items.map((item) => (
                        <ListItem
                          key={asText(item.name)}
                          title={asText(item.name)}
                          href={isFilled.link(item.link) ? item.link.url : '/'}
                          {...props}
                        >
                          {asText(item.description)}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                  <TpStar
                    className={cn(
                      'absolute -bottom-1 left-[calc(50%-13px)] hidden h-[12px] w-[12px] text-primary',
                      pathname === link || (pathname.startsWith(link) && link !== '/') ? 'block' : 'hidden'
                    )}
                  />
                </NavigationMenuItem>
              )
            } else {
              return (
                <NavigationMenuItem key={`nav-item-${i}`} className="group/active relative">
                  <Link href={link} legacyBehavior passHref {...props}>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'px-5')}>
                      {isFilled.richText(slice.primary.name) && asText(slice.primary.name)}
                    </NavigationMenuLink>
                  </Link>
                  <TpStar
                    className={cn(
                      'absolute -bottom-1 left-[calc(50%-6px)] hidden h-[12px] w-[12px] text-primary group-hover/active:block group-hover/active:text-accent',
                      pathname === link || (pathname.startsWith(link) && link !== '/') ? 'block' : 'hidden'
                    )}
                  />
                </NavigationMenuItem>
              )
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}

export default NavItems

export const NavItemsSheet = ({
  navigation
  // closeSheet,
  // ...props
}: {
  navigation: NavDocument<string>
  // closeSheet: () => void
}) => {
  const pathname = usePathname()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="link" aria-label={sheetOpen ? 'Close main nav menu' : 'Open main nav menu'}>
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <VisuallyHidden.Root asChild>
          <SheetHeader>
            <SheetTitle>Mobile Website Navigation</SheetTitle>
            <SheetDescription>Two Perfect Events website mobile navigation.</SheetDescription>
          </SheetHeader>
        </VisuallyHidden.Root>
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="w-full">
            <NavLogo onClick={() => setSheetOpen(false)} />
            <div className="flex w-full max-w-3xl items-center justify-start py-6 pl-6 pr-2">
              <NavigationMenu>
                <NavigationMenuList className="mx-1 flex w-full flex-col items-start justify-between gap-4 space-x-0 text-center">
                  {navigation.data.slices.map((slice, i) => {
                    const link =
                      isFilled.link(slice.primary.link) && slice.primary.link?.url ? slice.primary.link.url : ''
                    if (slice.items.length > 0) {
                      return (
                        <NavigationMenuItem
                          key={`nav-item-${i}`}
                          className="relative flex flex-col items-start justify-center gap-3"
                        >
                          <Link
                            href={link}
                            passHref
                            onClick={() => setSheetOpen(false)}
                            className={cn(navigationMenuTriggerStyle(), 'px-0 text-left')}
                          >
                            {isFilled.richText(slice.primary.name) && asText(slice.primary.name)}
                            <ChevronDownIcon className="ml-1 h-5 w-5" />
                          </Link>
                          {/* <TpStar className="peer/service:hover:block peer/service:hover:text-accent absolute -left-6 top-[calc(50%-5px)] hidden h-[12px] w-[12px] text-primary" /> */}
                          <ul className="grid max-w-[400px] grid-cols-1 gap-2 pl-3">
                            {slice.items.map((item) => (
                              <ListItemSheet
                                key={`mobile-nav-item-${asText(item.name)}`}
                                title={asText(item.name)}
                                href={isFilled.link(item.link) ? item.link.url : '/'}
                                onClick={() => setSheetOpen(false)}
                                className="group/item relative px-0 text-left"
                              >
                                {isFilled.richText(item.description) && asText(item.description)}
                                <TpStar className="absolute -left-6 top-[calc(50%-9px)] hidden h-[12px] w-[12px] text-primary group-hover/item:block group-hover/item:text-accent" />
                              </ListItemSheet>
                            ))}
                          </ul>
                        </NavigationMenuItem>
                      )
                    } else {
                      return (
                        <NavigationMenuItem
                          key={`nav-item-${i}`}
                          className="group/active relative flex items-center justify-center gap-3"
                        >
                          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'px-0')} asChild>
                            <Link href={link} passHref onClick={() => setSheetOpen(false)}>
                              {isFilled.richText(slice.primary.name) && asText(slice.primary.name)}
                            </Link>
                          </NavigationMenuLink>
                          <TpStar
                            className={cn(
                              'absolute -left-6 top-[calc(50%-5px)] hidden h-[12px] w-[12px] text-primary group-hover/active:block group-hover/active:text-accent',
                              pathname === link || (pathname.startsWith(link) && link !== '/') ? 'block' : 'hidden'
                            )}
                          />
                        </NavigationMenuItem>
                      )
                    }
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, href, children, ...props }, ref) => {
    return (
      <li key={`list-item-${title}`}>
        <NavigationMenuLink asChild>
          {/* legacyBehavior */}
          <Link ref={ref} href={href || '/'} passHref {...props}>
            <div
              className={cn(
                'group/item relative block cursor-pointer select-none space-y-1 py-3 text-center leading-none outline-none focus:bg-accent/50 focus:text-accent-foreground disabled:opacity-5',
                className
              )}
            >
              {/* <div className="flex items-center justify-between gap-6"> */}
              {/* <ListItemIcon icon={title} /> */}
              {/* <div className="block"> */}
              <div className="text-lg font-medium italic leading-none text-primary">{title}</div>
              {children}
              {/* <TpStar className="absolute -bottom-1 left-[calc(50%-6px)] hidden h-[12px] w-[12px] text-primary group-hover/item:block group-hover/item:text-accent" /> */}
              <TpStar className="absolute left-4 top-[calc(50%-9px)] hidden h-[12px] w-[12px] text-primary group-hover/item:block group-hover/item:text-accent" />
              {/* {children && (
                <p className="text-md important:no-underline relative line-clamp-2 mt-3 text-pretty font-normal leading-snug text-secondary">
                  {children}
                </p>
              )} */}
              {/* </div> */}
              {/* </div> */}
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

export const ListItemSheet = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, href, children, ...props }, ref) => {
    return (
      <li key={`list-item-sheet-${title}`}>
        {/* <NavigationMenuLink asChild> */}
        <Link ref={ref} href={href || '/'} passHref {...props}>
          <div
            className={cn(
              'block cursor-pointer select-none space-y-1 px-2 py-3 leading-none outline-none focus:bg-accent/50 focus:text-accent-foreground disabled:opacity-5',
              className
            )}
          >
            {/* <div className="flex items-center justify-between gap-6"> */}
            {/* <ListItemIcon icon={title} /> */}
            {/* <div className="block"> */}
            <div className="text-lg font-medium italic leading-none text-primary">{title}</div>
            {children}
            {/* {children && (
                <p className="text-md important:no-underline relative line-clamp-2 mt-3 text-pretty font-normal leading-snug text-secondary">
                  {children}
                </p>
              )} */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </Link>
        {/* </NavigationMenuLink> */}
      </li>
    )
  }
)
ListItemSheet.displayName = 'ListItemSheet'

// const ListItemIcon = ({ icon }: { icon?: string }) => {
//   switch (icon?.toLowerCase()) {
//     case 'events':
//       return <PartyPopper className="h-20 w-20 text-primary" />
//     case 'design':
//       return <Origami className="h-20 w-20 text-primary" />
//     default:
//       return <Image className="h-20 w-20 text-primary" />
//   }
// }

// const NavItems = ({ navigation }: { navigation: NavDocument<string> }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   return (
//     <>
//       <nav className="mx-auto flex w-full max-w-3xl items-center justify-between p-6 lg:px-8" aria-label="Global">
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary"
//             onClick={() => setMobileMenuOpen(true)}
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//           </button>
//         </div>
//         <NavLinks slices={navigation.data.slices} />
//       </nav>
//       <NavDialog
//         slices={navigation.data.slices}
//         mobileMenuOpen={mobileMenuOpen}
//         setMobileMenuOpen={() => setMobileMenuOpen(false)}
//       />
//     </>
//   )
// }

// function NavLinks({ slices, ...rest }: { slices: SliceZone<NavItemSlice> }) {
//   if (slices.length === 0) return null
//   return slices.map((slice) => {
//     if (slice.items.length > 0) {
//       // NavLinks group with flyout menu
//       return <NavLinksGroup key={slice.id} slice={slice} {...rest} />
//     } else {
//       // Regular NavLink
//       return <NavLink key={slice.id} slice={slice} {...rest} />
//     }
//   })
// }

// function NavLink({ slice, className }: { slice: NavItemSlice; className?: string }) {
//   const pathname = usePathname()
//   if (!isFilled.link(slice.primary.link) || !isFilled.richText(slice.primary.name) || !slice.primary.link?.url) {
//     return null
//   }
//   return (
//     <PrismicNextLink
//       key={slice.id}
//       field={slice.primary.link}
//       className={cn('relative text-lg font-medium text-primary hover:text-primary/80', className)} // underline-offset-8 hover:underline
//     >
//       <PrismicText field={slice.primary.name} />
//       {pathEquals(pathname, slice.primary.link.url) && (
//         <TpStar className="absolute left-[calc(50%-5px)] h-[10px] w-[10px]" />
//       )}
//     </PrismicNextLink>
//   )
// }

// function NavLinksGroup({ slice }: { slice: NavItemSlice }) {
//   const pathname = usePathname()
//   if (!isFilled.link(slice.primary.link) || !slice.primary.link?.url) return null

//   return (
//     <Popover.Group key={slice.id} className="hidden lg:flex lg:gap-x-12">
//       <Popover className="relative">
//         <Popover.Button className="relative flex items-center gap-x-1 text-lg font-medium leading-6 text-primary hover:text-primary/80">
//           <PrismicText field={slice.primary.name} />
//           <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
//           {pathEquals(pathname, slice.primary.link.url) && (
//             <TpStar className="absolute left-[calc(50%-5px)] top-6 h-[10px] w-[10px]" />
//           )}
//         </Popover.Button>
//         <Transition
//           as={Fragment}
//           enter="transition ease-out duration-200"
//           enterFrom="opacity-0 translate-y-1"
//           enterTo="opacity-100 translate-y-0"
//           leave="transition ease-in duration-150"
//           leaveFrom="opacity-100 translate-y-0"
//           leaveTo="opacity-0 translate-y-1"
//         >
//           <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden bg-beige shadow-lg ring-1 ring-red/90">
//             <div className="p-4">
//               {slice.items.map((item) => (
//                 <NavItemLink key={JSON.stringify(item)} item={item} />
//               ))}
//             </div>
//             <div className="grid grid-cols-2 divide-x divide-red/30 bg-almond">
//               {callsToAction.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="flex items-center justify-center gap-x-2.5 p-3 font-medium leading-6 text-primary hover:bg-pink"
//                 >
//                   <item.icon className="h-5 w-5 flex-none" aria-hidden="true" />
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </Popover.Panel>
//         </Transition>
//       </Popover>
//     </Popover.Group>
//   )
// }

// function NavItemLink({ item }: { item: Simplify<NavItemSliceDefaultItem> }) {
//   return (
//     <div key={JSON.stringify(item)} className="group relative flex gap-x-6 p-4 leading-6 hover:bg-almond">
//       {/* <div className="bg-gray-50 group-hover:bg-white mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
//         <item.icon className="text-gray-600 group-hover:text-indigo-600 h-6 w-6" aria-hidden="true" />
//       </div> */}
//       {isFilled.link(item.link) && (
//         <div className="flex-auto">
//           <PrismicNextLink field={item.link} className="block">
//             {isFilled.richText(item.name) && (
//               <div className="text-lg font-medium uppercase text-primary">
//                 <PrismicText field={item.name} />
//                 <span className="absolute inset-0" />
//               </div>
//             )}
//             {isFilled.richText(item.description) && (
//               <p className="mt-1 text-brown">
//                 <PrismicText field={item.description} />
//               </p>
//             )}
//           </PrismicNextLink>
//         </div>
//       )}
//     </div>
//   )
// }

// const NavDialog = ({
//   slices,
//   mobileMenuOpen,
//   setMobileMenuOpen
// }: {
//   slices: SliceZone<NavItemSlice>
//   mobileMenuOpen: boolean
//   setMobileMenuOpen: () => void
// }) => {
//   return (
//     <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
//       <div className="fixed inset-0 z-10" />
//       <Dialog.Panel className="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//         <div className="p-6">
//           <NavLogo />
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 {/* {products.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="text-gray-900 hover:bg-gray-50 group -mx-3 flex items-center gap-x-6 rounded-lg p-3 text-base font-semibold leading-7"
//                   >
//                     <div className="bg-gray-50 group-hover:bg-white flex h-11 w-11 flex-none items-center justify-center rounded-lg">
//                       <item.icon className="text-gray-600 group-hover:text-indigo-600 h-6 w-6" aria-hidden="true" />
//                     </div>
//                     {item.name}
//                   </a>
//                 ))} */}
//                 {slices.map((slice) => {
//                   if (slice.items.length > 0) {
//                     // NavLinks group with flyout menu
//                     return <NavLinksGroup key={slice.id} slice={slice} />
//                   } else {
//                     // Regular NavLink
//                     return <NavLink key={slice.id} slice={slice} />
//                   }
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="sticky bottom-0 grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 text-center">
//           {callsToAction.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="p-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       </Dialog.Panel>
//     </Dialog>
//   )
// }

// const products = [
//   { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//   { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
//   { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon }
// ]
// const company = [
//   { name: 'About us', href: '#', description: 'Learn more about our company values and mission to empower others' },
//   { name: 'Careers', href: '#', description: 'Looking for you next career opportunity? See all of our open positions' },
//   {
//     name: 'Support',
//     href: '#',
//     description: 'Get in touch with our dedicated support team or reach out on our community forums'
//   },
//   { name: 'Blog', href: '#', description: 'Read our latest announcements and get perspectives from our team' }
// ]

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
