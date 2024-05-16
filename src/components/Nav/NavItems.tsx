'use client'
import { cn } from '@/lib/utils'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { SliceZone, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicText } from '@prismicio/react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { NavDocument, NavItemSlice, NavItemSliceDefaultItem, Simplify } from '../../../prismicio-types'
import NavLogo from './NavLogo'

const callsToAction = [
  { name: 'Our portfolio', href: '/portfolio', icon: PlayCircleIcon },
  { name: 'Contact us', href: '/contact', icon: PhoneIcon }
]

const NavItems = ({ navigation }: { navigation: NavDocument<string> }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <NavLinks slices={navigation.data.slices} />
      </nav>
      <NavDialog
        slices={navigation.data.slices}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={() => setMobileMenuOpen(false)}
      />
    </>
  )
}

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
  if (!isFilled.link(slice.primary.link)) return null
  return (
    <PrismicNextLink
      key={slice.id}
      field={slice.primary.link}
      className={cn('font-medium text-primary underline-offset-8 hover:underline', className)}
    >
      {isFilled.richText(slice.primary.name) && <PrismicText field={slice.primary.name} />}
    </PrismicNextLink>
  )
}

function NavLinksGroup({ slice }: { slice: NavItemSlice }) {
  return (
    <Popover.Group key={slice.id} className="hidden lg:flex lg:gap-x-12">
      <Popover className="relative">
        <Popover.Button className="flex items-center gap-x-1 font-medium leading-6 text-primary underline-offset-8 hover:underline">
          <PrismicText field={slice.primary.name} />
          <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
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
              <div className="font-medium uppercase text-primary">
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
