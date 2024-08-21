import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()
    if (payload?.secret !== process.env.REVALIDATE_SECRET) return NextResponse.json({status: 401, message: 'Webhook not authorized'})
    revalidateTag('prismic')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: 400, message: `Webhook error: ${error.message}` })
    return NextResponse.json({ status: 500, message: 'Unknown webhook error' })
  }
}
