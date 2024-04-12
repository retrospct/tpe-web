import { TpLogo } from '@/components/svg'
import Link from 'next/link'

export const NavLogo = ({ name }: { name?: string }) => {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8">
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">{name || 'Two Perfect Events'}</span>
        <TpLogo />
      </Link>
    </div>
  )
}

export default NavLogo
