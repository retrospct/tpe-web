import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'relative bg-primary font-semibold tracking-widest text-accent hover:text-primary before:absolute before:inset-1.5 before:block before:border-2 before:border-accent before:hover:border-primary hover:bg-accent', //hover:bg-accent-hover
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-2 border-primary bg-background hover:bg-accent hover:border-accent hover:text-primary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'text-primary hover:bg-accent hover:text-primary',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80'
      },
      size: {
        default: 'px-12 py-6 text-lg',
        sm: 'px-3 py-1 text-[.875rem] before:inset-1',
        md: 'px-4 py-2 text-[.875rem] before:inset-1',
        lg: 'px-8 py-3 text-lg',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
