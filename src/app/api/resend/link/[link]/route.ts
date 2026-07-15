import { NextResponse } from 'next/server'

/**
 * Click-through redirector used by links in our outbound email templates.
 *
 * Only hosts we actually link to are allowed. An open redirect on the sending
 * domain gets abused by phishers and lands the domain on URI blocklists.
 */
const ALLOWED_HOSTS = new Set([
  'twoperfectevents.com',
  'www.twoperfectevents.com',
  'www.yelp.com',
  'www.instagram.com',
  'www.facebook.com',
  'www.tiktok.com',
  'www.pinterest.com'
])

function isAllowedRedirect(link: string): boolean {
  try {
    const url = new URL(link)
    return url.protocol === 'https:' && ALLOWED_HOSTS.has(url.hostname)
  } catch {
    return false
  }
}

export async function GET(req: Request, props: { params: Promise<{ link: string }> }) {
  const params = await props.params
  try {
    const { link } = params
    if (isAllowedRedirect(link)) return NextResponse.redirect(link)
    return NextResponse.json({ error: 'Invalid email link' }, { status: 400 })
  } catch (error) {
    console.error('[link redirect] error', error)
    return NextResponse.json({ error: 'Invalid email link' }, { status: 500 })
  }
}
