import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { Page } from '@/payload/payload-types'
import { getAuthenticatedUser } from './getAuthenticatedUser'

const queryPage = async (slug: string, draft: boolean): Promise<Page | null> => {
  const payload = await getPayload({ config })
  const user = draft ? await getAuthenticatedUser() : undefined

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 3,
    draft,
    limit: 1,
    overrideAccess: false,
    user,
    where: { slug: { equals: slug } },
  })

  return (docs[0] as Page) ?? null
}

export const getPage = async (slug: string, draft = false): Promise<Page | null> => {
  if (draft) return queryPage(slug, true)

  return unstable_cache(() => queryPage(slug, false), ['page', slug], {
    tags: [`pages_${slug}`],
  })()
}
