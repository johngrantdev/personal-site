import config from '@payload-config'
import React from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import { Post, PostArchive as PostArchiveType } from '@/payload/payload-types'
import { CollectionArchive } from '../CollectionArchive'

export type Props = {
  className?: string
  limit?: PostArchiveType['limit']
  cat?: PostArchiveType['cat']
}

// Tagged `posts` so publishing, unpublishing, or deleting a post invalidates
// every page that renders an archive.
const queryPosts = (categoryIds: (number | string)[], limit: number) =>
  unstable_cache(
    async (): Promise<Post[]> => {
      const payload = await getPayload({ config })

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
        ...(categoryIds.length > 0 ? { where: { category: { in: categoryIds } } } : {}),
      })

      return docs as Post[]
    },
    ['post-archive', categoryIds.join(','), String(limit)],
    { tags: ['posts'] },
  )()

export const PostArchive = async ({ className, limit, cat }: Props) => {
  const categoryIds = (cat || []).map(c => (typeof c === 'object' ? c.id : c))
  const docs = await queryPosts(categoryIds, limit || 10)

  return <CollectionArchive className={className} docs={docs} />
}
