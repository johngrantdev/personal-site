import config from '@payload-config'
import React from 'react'
import { getPayload } from 'payload'

import { Post, PostArchive as PostArchiveType } from '@/payload/payload-types'
import { CollectionArchive } from '../CollectionArchive'

export type Props = {
  className?: string
  limit?: PostArchiveType['limit']
  category?: PostArchiveType['category']
}

export const PostArchive = async ({ className, limit, category }: Props) => {

  const categoryIds = (category || []).map(cat => (typeof cat === 'object' ? cat.id : cat))

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: limit || 10,
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

  return <CollectionArchive className={className} docs={docs as Post[]} />
}
