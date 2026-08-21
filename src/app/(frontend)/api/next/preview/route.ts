import config from '@payload-config'
import { draftMode } from 'next/headers'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import { payloadToken } from '../../../_api/token'

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const secret = searchParams.get('secret')

  if (!process.env.NEXT_PRIVATE_DRAFT_SECRET || secret !== process.env.NEXT_PRIVATE_DRAFT_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  // only same-origin relative paths, so preview cannot be used as an open redirect
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return new Response('No path provided', { status: 400 })
  }

  const token = (await cookies()).get(payloadToken)?.value

  if (!token) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: new Headers({ Authorization: `JWT ${token}` }) })

  if (!user) {
    ;(await draftMode()).disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  ;(await draftMode()).enable()

  redirect(path)
}
