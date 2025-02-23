import { PostHog } from 'posthog-node'

export default function PostHogClient() {
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0
  })
  return posthogClient
}

// Use posthog client in a page
// import Link from 'next/link'
// import PostHogClient from '../posthog'

// export default async function About() {

//   const posthog = PostHogClient()
//   const flags = await posthog.getAllFlags(
//     'user_distinct_id' // replace with a user's distinct ID
//   );
//   await posthog.shutdown()

//   return (
//     <main>
//       <h1>About</h1>
//       <Link href="/">Go home</Link>
//       { flags['main-cta'] &&
//         <Link href="http://posthog.com/">Go to PostHog</Link>
//       }
//     </main>
//   )
// }
