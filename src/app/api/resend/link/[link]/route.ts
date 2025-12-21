import { isValidUrl } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function GET(req: Request, props: { params: Promise<{ link: string }> }) {
  const params = await props.params;
  try {
    const { link } = params
    // Can add a isValid URL or string check here
    if (isValidUrl(link)) return NextResponse.redirect(link)
    return NextResponse.json({ error: 'Invalid email link' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
