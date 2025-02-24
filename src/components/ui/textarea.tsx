import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[92px] w-full border-2 border-primary bg-background px-3 py-2 text-lg text-secondary ring-offset-background placeholder:font-light placeholder:text-secondary/85 focus:border-primary focus:outline-hidden focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
