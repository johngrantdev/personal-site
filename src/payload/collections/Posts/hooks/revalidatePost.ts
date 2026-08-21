import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { purgeTags } from '../../../utilities/purgeTags'

// The `posts` tag also backs the archive query and the static slug list, so any
// post change invalidates the pages that render an archive.
export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  purgeTags(`posts_${doc.slug}`, 'posts')

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    purgeTags(`posts_${previousDoc.slug}`)
  }

  return doc
}

export const revalidatePostDelete: CollectionAfterDeleteHook = ({ doc }) => {
  purgeTags(`posts_${doc?.slug}`, 'posts')

  return doc
}
