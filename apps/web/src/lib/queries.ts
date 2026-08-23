import type { Page, Post, Redirect } from '@/payload/payload-types'
import { documentPath } from '@/payload/utilities/documentPath'

import { cached } from './cache'
import { payload } from './payload'

export const getPage = (slug: string): Promise<Page | null> =>
  cached(`page:${slug}`, [`pages_${slug}`], async () => {
    const { docs } = await payload.find({
      collection: 'pages',
      depth: 3,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    })

    return docs[0] || null
  })

export const getPost = (slug: string): Promise<Post | null> =>
  cached(`post:${slug}`, [`posts_${slug}`], async () => {
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 3,
      limit: 1,
      overrideAccess: false,
      where: { slug: { equals: slug } },
    })

    return docs[0] || null
  })

export const getSlugs = (collection: 'pages' | 'posts'): Promise<string[]> =>
  cached(`slugs:${collection}`, [collection], async () => {
    const { docs } = await payload.find({
      collection,
      depth: 0,
      pagination: false,
      overrideAccess: false,
      select: { slug: true },
    })

    return docs.map(doc => doc.slug).filter((slug): slug is string => Boolean(slug))
  })

const normalize = (path: string): string => {
  let normalized = path
  if (process.env.SERVER_URL) {
    normalized = normalized.replace(process.env.SERVER_URL, '')
  }
  normalized = normalized.split('?')[0]
  normalized = normalized.toLowerCase()
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

const getDestination = (redirect: Redirect): string | null => {
  const { to } = redirect
  if (!to) return null

  if (to.type === 'custom' && to.url) {
    let destination = to.url
    if (process.env.SERVER_URL) {
      destination = destination.replace(process.env.SERVER_URL, '')
    }
    return destination
  }

  if (to.type === 'reference' && to.reference && typeof to.reference.value === 'object') {
    return documentPath({ collection: to.reference.relationTo, slug: to.reference.value.slug })
  }

  return null
}

const getRedirects = (): Promise<Redirect[]> =>
  cached('redirects', ['redirects'], async () => {
    const { docs } = await payload.find({
      collection: 'redirects',
      depth: 1,
      pagination: false,
      overrideAccess: false,
    })

    return docs
  })

// Keyed on one entry, not on the requested URL: any path can be asked for and
// unmatched ones must not each occupy a cache slot.
export const getRedirect = async (url: string): Promise<string | null> => {
  const normalizedUrl = normalize(url)
  const redirect = (await getRedirects()).find(doc => normalize(doc.from) === normalizedUrl)
  const destination = redirect && getDestination(redirect)

  return destination &&
    destination !== normalizedUrl &&
    destination.startsWith('/') &&
    !destination.startsWith('//') &&
    !destination.includes('\\')
    ? destination
    : null
}

export const getArchivePosts = async (categoryIds: number[], limit: number): Promise<Post[]> =>
  cached(`archive:${categoryIds.join(',')}:${limit}`, ['posts'], async () => {
    const { docs } = await payload.find({
      collection: 'posts',
      depth: 2,
      limit,
      overrideAccess: false,
      sort: '-publishedAt',
      select: {
        slug: true,
        title: true,
        description: true,
        publishedAt: true,
        keywords: true,
        card: true,
      },
      ...(categoryIds.length ? { where: { category: { in: categoryIds } } } : {}),
    })

    return docs as Post[]
  })
