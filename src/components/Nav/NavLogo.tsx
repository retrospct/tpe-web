import { TpLogo } from '@/components/icons'
import Link from 'next/link'

export const NavLogo = ({ name }: { name?: string }) => {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between p-6 lg:justify-center lg:px-8">
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">{name || 'Two Perfect Events'}</span>
        <TpLogo className="h-20 w-auto lg:h-auto" />
      </Link>
    </div>
  )
}

export default NavLogo
