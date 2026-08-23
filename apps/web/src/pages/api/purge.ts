import type { APIRoute } from 'astro'

import { purgeCacheTags } from '../../lib/cache'

const MAX_TAGS = 100
const MAX_TAG_LENGTH = 128

export const POST: APIRoute = async ({ request }) => {
  const secret = process.env.FRONTEND_PURGE_SECRET
  if (!secret) return Response.json({ error: 'Purge unavailable' }, { status: 503 })
  if (request.headers.get('Authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid tags' }, { status: 400 })
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('tags' in body) ||
    !Array.isArray(body.tags) ||
    body.tags.length === 0 ||
    body.tags.length > MAX_TAGS ||
    body.tags.some(tag => typeof tag !== 'string' || !tag.trim() || tag.length > MAX_TAG_LENGTH)
  ) {
    return Response.json({ error: 'Invalid tags' }, { status: 400 })
  }

  return Response.json({ purged: purgeCacheTags(body.tags) })
}
