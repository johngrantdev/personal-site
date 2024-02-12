import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json()
    const { secret, collection, slugs } = body

    if (
      !secret ||
      secret !== process.env.NEXT_PRIVATE_REVALIDATION_KEY ||
      typeof collection !== 'string' ||
      !Array.isArray(slugs)
    ) {
      // Do not indicate that the revalidation key is incorrect in the response
      // This will protect this API route from being exploited
      return new Response('Invalid request', { status: 400 })
    }

    for (const slug of slugs) {
      if (typeof slug === 'string') {
        revalidateTag(`${collection}_${slug}`)
      }
    }
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error: unknown) {
    return new Response('Invalid request', { status: 400 })
  }
}
