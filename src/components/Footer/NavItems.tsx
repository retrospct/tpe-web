'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { asText, isFilled } from '@prismicio/client'
import Link from 'next/link'
import { forwardRef } from 'react'
import { FooterDocument } from '../../../prismicio-types'
import SocialItems from './SocialItems'

const NavItems = ({ navigation }: { navigation: FooterDocument<string> }) => {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center justify-between">
      {/* <SliceZone slices={navigation.data.slices} components={components} /> */}
      <div className="mb-8 w-full px-6 md:px-8">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="w-full flex-none flex-col justify-between gap-1 md:flex-row md:gap-6">
            {navigation.data.slices.map((slice) => {
              if (slice.slice_type !== 'nav_item') return null
              const link = isFilled.link(slice.primary.link) && slice.primary.link?.url ? slice.primary.link.url : ''
              if (slice.items.length > 0) {
                return (
                  <NavigationMenuItem className="relative">
                    <NavigationMenuTrigger>
                      {isFilled.richText(slice.primary.name) && asText(slice.primary.name)}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="relative left-0">
                      <ul className="relative flex w-full flex-col items-center justify-between gap-1 p-3">
                        {slice.items.map((item) => (
                          <ListItem
                            key={asText(item.name)}
                            title={asText(item.name)}
                            href={isFilled.link(item.link) ? item.link.url : '/'}
                          >
                            {asText(item.description)}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              } else {
                return (
                  <NavigationMenuItem className="relative">
                    <Link href={link} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {isFilled.richText(slice.primary.name) && asText(slice.primary.name)}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              }
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <SocialItems slices={navigation.data.slices} />
    </div>
  )
}

export default NavItems

const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, href, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href || '/'}
            legacyBehavior
            passHref
            // className={cn('block select-none space-y-2 px-6 py-8', className)}
            {...props}
          >
            <div
              className={cn(
                'flex cursor-pointer items-center justify-center gap-1 px-6 py-4 text-lg font-medium leading-none text-primary outline-none transition-colors hover:bg-accent/50 hover:text-primary/80 disabled:pointer-events-none disabled:opacity-50',
                className
              )}
            >
              {title}
              {children && <p className="text-md line-clamp-2 leading-snug">{children}</p>}
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

// function NavLink({ slice, className }: { slice: NavItemSlice; className?: string }) {
//   if (!isFilled.link(slice.primary.link)) return null
//   return (
//     <PrismicNextLink
//       key={slice.id}
//       field={slice.primary.link}
//       className={cn('text-lg font-medium text-primary hover:text-primary/80', className)}
//     >
//       {isFilled.richText(slice.primary.name) && <PrismicText field={slice.primary.name} />}
//     </PrismicNextLink>
//   )
// }

// function SocialLink({ link, className, icon }: { link: string; className?: string; icon?: ReactNode }) {
//   return (
//     <Link href={link} className={cn('font-medium text-red', className)}>
//       {icon}
//     </Link>
//   )
// }

// function NavLinksGroup({ slice }: { slice: NavItemSlice }) {
//   return (
//     <Popover.Group key={slice.id} className="hidden lg:flex lg:gap-x-12">
//       <Popover className="relative">
//         <Popover.Button className="flex items-center gap-x-1 text-lg font-medium leading-6 text-primary hover:text-primary/80">
//           <PrismicText field={slice.primary.name} />
//           <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
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
