import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { Post } from '@/payload/payload-types'
import { getAuthenticatedUser } from './getAuthenticatedUser'

const queryPost = async (slug: string, draft: boolean): Promise<Post | null> => {
  const payload = await getPayload({ config })
  const user = draft ? await getAuthenticatedUser() : undefined

  const { docs } = await payload.find({
    collection: 'posts',
    depth: 3,
    draft,
    limit: 1,
    overrideAccess: false,
    user,
    where: { slug: { equals: slug } },
  })

  return (docs[0] as Post) ?? null
}

export const getPost = async (slug: string, draft = false): Promise<Post | null> => {
  if (draft) return queryPost(slug, true)

  return unstable_cache(() => queryPost(slug, false), ['post', slug], {
    tags: [`posts_${slug}`],
  })()
}
