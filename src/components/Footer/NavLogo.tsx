import { TpLogoCircle } from '@/components/icons'
import Link from 'next/link'

export const NavLogo = ({ name }: { name?: string }) => {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8">
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">{name || 'Two Perfect Events'}</span>
        <TpLogoCircle className="h-auto w-[100px] text-red" />
      </Link>
    </div>
  )
}

export default NavLogo
