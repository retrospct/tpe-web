import { TpLogoCircle } from '@/components/icons'
import Link from 'next/link'

export const NavLogo = ({ name }: { name?: string }) => {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center">
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">{name || 'Two Perfect Events'}</span>
        <TpLogoCircle className="text-red h-auto w-[100px]" />
      </Link>
    </div>
  )
}

export default NavLogo
