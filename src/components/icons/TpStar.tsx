import { cn } from '@/lib/utils'

interface TpIconProps {
  className?: string
}

export const TpStar = ({ className }: TpIconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-5', className)}
    >
      <path
        d="M9 0.5C9.87097 5.45714 12.6639 7.90093 18 9C12.6668 10.0962 9.90871 12.5429 9 17.5C8.12903 12.5429 5.33613 10.0991 -1.50257e-10 9C5.33323 7.90376 7.69355 5.45714 9 0.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
