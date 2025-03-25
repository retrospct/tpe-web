'use client'

import { log } from '@/lib/utils/functions/log'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to our logging service
    log({
      message: `Error: ${error.message}\nStack: ${error.stack}\nDigest: ${error.digest || 'N/A'}`,
      type: 'errors',
      mention: true
    }).catch(console.error) // Catch any logging errors
  }, [error])

  return (
    <div className="bg-background flex h-[100dvh] w-full flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Oops! Something went wrong...</h2>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 rounded-md bg-red-50 p-4 text-sm text-red-500">
            <p className="font-medium">Error: {error.message}</p>
            {error.digest && <p className="mt-1 font-mono text-xs">Digest: {error.digest}</p>}
          </div>
        )}
        <p className="text-muted-foreground">Don&apos;t worry, we&apos;ve been notified and are working to fix this.</p>
      </div>
      <button
        onClick={() => reset()}
        className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        Try again
      </button>
    </div>
  )
}
