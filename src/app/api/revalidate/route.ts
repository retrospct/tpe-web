import { createClient } from '@/prismicio'
import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { AllDocumentTypes } from '../../../../prismicio-types'

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json()

    if (payload?.secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ status: 401, message: 'Webhook not authorized' })
    }

    if (payload?.documents?.length > 0) {
      const client = createClient()
      const pages: AllDocumentTypes[] = []
      for (const doc of payload.documents) {
        pages.push(await client.getByID(doc))
      }
      pages.forEach((page) => {
        console.log('page revalidated:', page.uid, '|', page?.url)
        page?.url && revalidatePath(page.url)
      })
    } else {
      revalidateTag('prismic')
    }

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ status: 400, message: `Webhook error: ${error.message}` })
    return NextResponse.json({ status: 500, message: 'Unknown webhook error' })
  }
}
