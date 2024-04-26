'use client'
import { cn } from '@/lib/utils'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicText } from '@prismicio/react'
import { Fragment } from 'react'
import { FooterDocument, NavItemSlice, NavItemSliceDefaultItem, Simplify } from '../../../prismicio-types'
import { TpBrandFacebook, TpBrandInstagram, TpBrandPinterest, TpBrandTikTok, TpBrandYelp } from '../icons'

const platforms = new Map([
  ['Facebook', { platform: 'Facebook', icon: <TpBrandFacebook /> }],
  ['Instagram', { platform: 'Instagram', icon: <TpBrandInstagram /> }],
  ['Yelp', { platform: 'Yelp', icon: <TpBrandYelp /> }],
  ['TikTok', { platform: 'TikTok', icon: <TpBrandTikTok /> }],
  ['Pinterest', { platform: 'Pinterest', icon: <TpBrandPinterest /> }],
  ['Unknown', { platform: 'Unknown', icon: <TpBrandFacebook /> }]
])

const NavItems = ({ navigation }: { navigation: FooterDocument<string> }) => {
  return (
    <div className="mx-auto mt-6 flex max-w-5xl flex-col items-center justify-between">
      {/* <SliceZone slices={navigation.data.slices} components={components} /> */}
      <div className="mx-auto mb-8 flex w-full flex-col items-center justify-between px-6 md:flex-row md:px-8">
        {navigation.data.slices.map((slice) => {
          if (slice.slice_type === 'nav_item') {
            return slice.items.length > 0 ? (
              <NavLinksGroup key={slice.id} slice={slice} />
            ) : (
              <NavLink key={slice.id} slice={slice} className="py-2 md:py-0" />
            )
          }
          return null
        })}
      </div>

      {navigation.data.slices.map((slice) => {
        if (slice.slice_type === 'social_item') {
          return (
            <div key={slice.id} className="flex items-center justify-center gap-6">
              {slice.items.map(
                (item) =>
                  isFilled.link(item.link) && (
                    <PrismicNextLink
                      key={JSON.stringify(item)}
                      field={item.link}
                      className="font-medium text-primary underline-offset-8 transition-all hover:scale-105 hover:text-primary/90"
                    >
                      {platforms.get(item?.platform || 'Unknown')?.icon}
                    </PrismicNextLink>
                  )
              )}
            </div>
          )
        }
      })}
    </div>
  )
}

export default NavItems

// {/* <div className="flex items-center justify-center gap-6">
//   <SocialLink href="https://yelp.com" icon={<TpBrandYelp />} />
//   <SocialLink href="https://instagram.com" icon={<TpBrandInstagram />} />
//   <SocialLink href="https://facebook.com" icon={<TpBrandFacebook />} />
//   <SocialLink href="https://tiktok.com" icon={<TpBrandTikTok />} />
//   <SocialLink href="https://pinterest.com" icon={<TpBrandPinterest />} />
// </div> */}

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

// function SocialLink({ link, className, icon }: { link: string; className?: string; icon?: ReactNode }) {
//   return (
//     <Link href={link} className={cn('font-medium text-red', className)}>
//       {icon}
//     </Link>
//   )
// }

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
