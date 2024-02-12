import type { GlobalAfterChangeHook } from 'payload/types'

import { revalidate } from '../../utilities/revalidate'

// Revalidate all pages in the background (not async), when the global settings are updated.
export const revalidateAllPages: GlobalAfterChangeHook = async ({ doc, req: { payload } }) => {
  payload.logger.info(`revalidating all pages.`)
  const pages = await payload.find({
    collection: 'pages',
    pagination: false,
  })
  const pageSlugs = pages.docs.map(d => d.slug)
  revalidate({ payload, collection: 'pages', slugs: pageSlugs })

  payload.logger.info(`revalidating all posts.`)
  const posts = await payload.find({
    collection: 'posts',
    pagination: false,
  })
  const postSlugs = posts.docs.map(d => d.slug)
  revalidate({ payload, collection: 'posts', slugs: postSlugs })

  return doc
}
