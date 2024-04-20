import { cn } from '@/lib/utils'

interface TpIconProps {
  className?: string
  rating?: number
}

export const TpRating = ({ className, rating = 5 }: TpIconProps) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const renderStars = () => {
    const stars = []
    for (let i = 0; i < fullStars; i++) {
      stars.push(<TpRatingStar className={className} />)
    }
    if (hasHalfStar) {
      stars.push(<TpRatingHalfStar className={className} />)
    }
    return stars
  }
  return <div className={cn('inline-flex', className)}>{renderStars()}</div>
}

const TpRatingStar = ({ className }: TpIconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // className={cn('h-[18px] w-[18px]', className)}
    >
      <path
        d="M9 1L11.0066 7.11146H17.5L12.2467 10.8885L14.2533 17L9 13.2229L3.74671 17L5.75329 10.8885L0.5 7.11146H6.99342L9 1Z"
        fill="currentColor"
      />
    </svg>
  )
}

const TpRatingHalfStar = ({ className }: TpIconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // className={cn('h-[18px] w-[18px]', className)}
    >
      <path d="M3.74671 17L9 13.2229L9 1L6.99342 7.11146L0.5 7.11146L5.75329 10.8885L3.74671 17Z" fill="currentColor" />
      <path d="M11.0066 7.11146L9 1L9 13.2229L14.2533 17L12.2467 10.8885L17.5 7.11146L11.0066 7.11146Z" fill="none" />
    </svg>
  )
}
{
  /* <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.74671 16L9 12.2229L9 -1.24556e-09L6.99342 6.11146L0.5 6.11146L5.75329 9.88854L3.74671 16Z" fill="#9E3811"/>
<path d="M11.0066 6.11146L9 0L9 12.2229L14.2533 16L12.2467 9.88854L17.5 6.11146L11.0066 6.11146Z" fill="#9E3811"/>
</svg> */
}
