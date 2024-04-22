import { cn } from '@/lib/utils'

interface TpIconProps {
  className?: string
}

export const TpBrandFacebook = ({ className }: TpIconProps) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('h-7 w-7', className)}>
      <path d="M15.7892 25.5015V15.0077H19.3269L19.8569 10.9192H15.7892V8.30858C15.7892 7.12521 16.1199 6.31919 17.8246 6.31919H19.9994V2.6613C18.9465 2.55048 17.8885 2.49665 16.8298 2.50016C13.6931 2.50016 11.5461 4.40486 11.5461 7.90428V10.9205H8V15.0084H11.5461V25.5002L15.7892 25.5015Z" fill="currentColor"/>
    </svg>
  )
}
