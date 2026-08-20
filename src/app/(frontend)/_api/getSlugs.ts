import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

const getPageSlugsQuery = async (): Promise<string[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    pagination: false,
    overrideAccess: false,
    select: { slug: true },
  })

  return docs
    .map(doc => (doc as { slug?: string }).slug)
    .filter((slug): slug is string => slug != null)
}

const getPostSlugsQuery = async (): Promise<string[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 0,
    pagination: false,
    overrideAccess: false,
    select: { slug: true },
  })

  return docs
    .map(doc => (doc as { slug?: string }).slug)
    .filter((slug): slug is string => slug != null)
}

export const getPageSlugs = unstable_cache(
  getPageSlugsQuery,
  ['page-slugs'],
  { tags: ['pages'] },
)

export const getPostSlugs = unstable_cache(
  getPostSlugsQuery,
  ['post-slugs'],
  { tags: ['posts'] },
)
