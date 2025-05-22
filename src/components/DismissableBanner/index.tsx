'use client'

import { X } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

interface DismissableBannerProps {
  children: ReactNode
}

const DismissableBanner: React.FC<DismissableBannerProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className="relative flex w-full items-center justify-center bg-accent px-1 py-2 md:p-2">
      <p className="text-balance text-center text-xs font-medium italic leading-normal text-primary md:text-sm">
        {children}
      </p>
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss banner"
        className="relative cursor-pointer border-none bg-transparent p-1 text-primary md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:p-2"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default DismissableBanner
