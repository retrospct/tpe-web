'use client'

import { useEffect } from 'react'
import { log } from '@/lib/utils/functions/log'

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
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-6 bg-background p-4 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Oops! Something went wrong...</h2>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 rounded-md bg-red-50 p-4 text-sm text-red-500">
            <p className="font-medium">Error: {error.message}</p>
            {error.digest && <p className="mt-1 font-mono text-xs">Digest: {error.digest}</p>}
          </div>
        )}
        <p className="text-muted-foreground">
          Don&apos;t worry, we&apos;ve been notified and are working to fix this.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        Try again
      </button>
    </div>
  )
}
