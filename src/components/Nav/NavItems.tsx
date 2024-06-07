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
import { cn, pathEquals } from '@/lib/utils'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { SliceZone, asText, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicText } from '@prismicio/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, forwardRef } from 'react'
import { NavDocument, NavItemSlice, NavItemSliceDefaultItem, Simplify } from '../../../prismicio-types'
import { TpStar } from '../icons'
import NavLogo from './NavLogo'

const callsToAction = [
  { name: 'Our portfolio', href: '/portfolio', icon: PlayCircleIcon },
  { name: 'Contact us', href: '/contact', icon: PhoneIcon }
]

const NavItems = ({ navigation }: { navigation: NavDocument<string> }) => {
  const pathname = usePathname()
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-center p-6 lg:px-8">
      <NavigationMenu>
        <NavigationMenuList className="w-full flex-none flex-col justify-between gap-4 md:flex-row md:gap-0">
          {navigation.data.slices.map((slice) => {
            const link = isFilled.link(slice.primary.link) && slice.primary.link?.url ? slice.primary.link.url : ''
            if (slice.items.length > 0) {
              return (
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger className="px-5">
                    {isFilled.richText(slice.primary.name) && asText(slice.primary.name)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="relative">
                    <ul className="relative flex flex-col gap-1 p-3">
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
                  {pathname === link && (
                    <TpStar className="absolute left-[calc(50%-6px)] h-[12px] w-[12px] text-primary" />
                  )}
                </NavigationMenuItem>
              )
            } else {
              return (
                <NavigationMenuItem className="relative">
                  <Link href={link} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'px-5')}>
                      {isFilled.richText(slice.primary.name) && asText(slice.primary.name)}
                    </NavigationMenuLink>
                  </Link>
                  {pathname === link && (
                    <TpStar className="absolute -bottom-1 left-[calc(50%-6px)] h-[12px] w-[12px] text-primary" />
                  )}
                </NavigationMenuItem>
              )
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

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

export default NavItems

function NavLinks({ slices, ...rest }: { slices: SliceZone<NavItemSlice> }) {
  if (slices.length === 0) return null
  return slices.map((slice) => {
    if (slice.items.length > 0) {
      // NavLinks group with flyout menu
      return <NavLinksGroup key={slice.id} slice={slice} {...rest} />
    } else {
      // Regular NavLink
      return <NavLink key={slice.id} slice={slice} {...rest} />
    }
  })
}

function NavLink({ slice, className }: { slice: NavItemSlice; className?: string }) {
  const pathname = usePathname()
  if (!isFilled.link(slice.primary.link) || !isFilled.richText(slice.primary.name) || !slice.primary.link?.url) {
    return null
  }
  return (
    <PrismicNextLink
      key={slice.id}
      field={slice.primary.link}
      className={cn('relative text-lg font-medium text-primary hover:text-primary/80', className)} // underline-offset-8 hover:underline
    >
      <PrismicText field={slice.primary.name} />
      {pathEquals(pathname, slice.primary.link.url) && (
        <TpStar className="absolute left-[calc(50%-5px)] h-[10px] w-[10px]" />
      )}
    </PrismicNextLink>
  )
}

function NavLinksGroup({ slice }: { slice: NavItemSlice }) {
  const pathname = usePathname()
  if (!isFilled.link(slice.primary.link) || !slice.primary.link?.url) return null

  return (
    <Popover.Group key={slice.id} className="hidden lg:flex lg:gap-x-12">
      <Popover className="relative">
        <Popover.Button className="relative flex items-center gap-x-1 text-lg font-medium leading-6 text-primary hover:text-primary/80">
          <PrismicText field={slice.primary.name} />
          <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
          {pathEquals(pathname, slice.primary.link.url) && (
            <TpStar className="absolute left-[calc(50%-5px)] top-6 h-[10px] w-[10px]" />
          )}
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden bg-beige shadow-lg ring-1 ring-red/90">
            <div className="p-4">
              {slice.items.map((item) => (
                <NavItemLink key={JSON.stringify(item)} item={item} />
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-red/30 bg-almond">
              {callsToAction.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-medium leading-6 text-primary hover:bg-pink"
                >
                  <item.icon className="h-5 w-5 flex-none" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  )
}

function NavItemLink({ item }: { item: Simplify<NavItemSliceDefaultItem> }) {
  return (
    <div key={JSON.stringify(item)} className="group relative flex gap-x-6 p-4 leading-6 hover:bg-almond">
      {/* <div className="bg-gray-50 group-hover:bg-white mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg">
        <item.icon className="text-gray-600 group-hover:text-indigo-600 h-6 w-6" aria-hidden="true" />
      </div> */}
      {isFilled.link(item.link) && (
        <div className="flex-auto">
          <PrismicNextLink field={item.link} className="block">
            {isFilled.richText(item.name) && (
              <div className="text-lg font-medium uppercase text-primary">
                <PrismicText field={item.name} />
                <span className="absolute inset-0" />
              </div>
            )}
            {isFilled.richText(item.description) && (
              <p className="mt-1 text-brown">
                <PrismicText field={item.description} />
              </p>
            )}
          </PrismicNextLink>
        </div>
      )}
    </div>
  )
}

const NavDialog = ({
  slices,
  mobileMenuOpen,
  setMobileMenuOpen
}: {
  slices: SliceZone<NavItemSlice>
  mobileMenuOpen: boolean
  setMobileMenuOpen: () => void
}) => {
  return (
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="p-6">
          <NavLogo />
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* {products.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-900 hover:bg-gray-50 group -mx-3 flex items-center gap-x-6 rounded-lg p-3 text-base font-semibold leading-7"
                  >
                    <div className="bg-gray-50 group-hover:bg-white flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                      <item.icon className="text-gray-600 group-hover:text-indigo-600 h-6 w-6" aria-hidden="true" />
                    </div>
                    {item.name}
                  </a>
                ))} */}
                {slices.map((slice) => {
                  if (slice.items.length > 0) {
                    // NavLinks group with flyout menu
                    return <NavLinksGroup key={slice.id} slice={slice} />
                  } else {
                    // Regular NavLink
                    return <NavLink key={slice.id} slice={slice} />
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 text-center">
          {callsToAction.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="p-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

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
