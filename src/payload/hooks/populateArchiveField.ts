import type { AfterReadHook } from 'payload/dist/collections/config/types'

import type { Post, PostArchive } from '../payload-types'

export const populateArchiveField: AfterReadHook = async ({ doc, req: { payload } }) => {
  // pre-populate the archive block if `populateBy` is `collection`
  // then hydrate it on your front-end
  const layoutWithArchive = await Promise.all(
    doc.layout.map(async layoutItem => {
      if (layoutItem.mainColumn.style === 'postArchive') {
        const postArchive = layoutItem.mainColumn.postArchive as PostArchive & {
          populatedDocs: Array<{
            relationTo: 'posts'
            value: string
          }>
        }

        const res: { totalDocs: number; docs: Post[] } = await payload.find({
          collection: 'posts',
          limit: postArchive.limit || 10,
          where: {
            ...(postArchive?.category?.length > 0
              ? {
                  category: {
                    in: postArchive.category
                      .map(cat => {
                        if (typeof cat === 'string' || typeof cat === 'number') return cat
                        return cat.id
                      })
                      .join(','),
                  },
                }
              : {}),
          },
          sort: '-publishedAt',
        })

        return {
          ...layoutItem,
          mainColumn: {
            ...layoutItem.mainColumn,
            postArchive: {
              ...postArchive,
              populatedDocsTotal: res.totalDocs,
              populatedDocs: res.docs.map((thisDoc: Post) => ({
                relationTo: 'posts',
                value: thisDoc.id,
              })),
            },
          },
        }
      }
      return layoutItem
    }),
  )

  return {
    ...doc,
    layout: layoutWithArchive,
  }
}