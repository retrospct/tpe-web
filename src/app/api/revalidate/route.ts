import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const res = await req.json()
    console.log('res.body', res.body)
    const { secret } = res.body
    if (secret !== process.env.REVALIDATE_SECRET) return res.status(401).json({ message: 'Invalid token' })
    revalidateTag('prismic')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 400, message: `Webhook error: ${error.message}` })
    }
    return NextResponse.json({ status: 500, message: 'Unknown webhook error...' })
  }
}
