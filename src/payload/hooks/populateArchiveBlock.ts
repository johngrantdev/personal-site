import type { AfterReadHook } from 'payload/dist/collections/config/types'

import type { ArchiveBlock, Post } from '../payload-types'

export const populateArchiveBlock: AfterReadHook = async ({ doc, req: { payload } }) => {
  // pre-populate the archive block if `populateBy` is `collection`
  // then hydrate it on your front-end

  const layoutWithArchive = await Promise.all(
    doc.layout.map(async block => {
      if (block.blockType === 'archive') {
        const archiveBlock = block as ArchiveBlock & {
          populatedDocs: Array<{
            relationTo: 'pages' | 'posts'
            value: string
          }>
        }

        if (archiveBlock.populateBy === 'collection') {
          const res: { totalDocs: number; docs: Post[] } = await payload.find({
            collection: archiveBlock.relationTo,
            limit: archiveBlock.limit || 10,
            where: {
              ...(archiveBlock?.category?.length > 0
                ? {
                    category: {
                      in: archiveBlock.category
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
            ...block,
            populatedDocsTotal: res.totalDocs,
            populatedDocs: res.docs.map((thisDoc: Post) => ({
              relationTo: archiveBlock.relationTo,
              value: thisDoc.id,
            })),
          }
        }
      }

      return block
    }),
  )

  return {
    ...doc,
    layout: layoutWithArchive,
  }
}
