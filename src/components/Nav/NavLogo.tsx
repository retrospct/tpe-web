import { TpLogo } from '@/components/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const NavLogo = ({ name, className, ...props }: { name?: string; onClick?: () => void; className?: string }) => {
  return (
    <div className={cn('mx-auto flex w-full max-w-7xl items-center justify-between py-6 lg:justify-center', className)}>
      <Link href="/" className="-m-1.5 p-1.5" {...props}>
        <span className="sr-only">{name || 'Two Perfect Events'}</span>
        <TpLogo className="h-20 w-auto lg:h-auto" />
      </Link>
    </div>
  )
}

export default NavLogo
