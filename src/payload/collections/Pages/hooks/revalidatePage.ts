import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { purgeTags } from '../../../utilities/purgeTags'

// Purge on every change rather than only on publish: unpublishing and renaming
// both have to invalidate the entry that is already cached.
export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  purgeTags(`pages_${doc.slug}`, 'pages')

  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    purgeTags(`pages_${previousDoc.slug}`)
  }

  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook = ({ doc }) => {
  purgeTags(`pages_${doc?.slug}`, 'pages')

  return doc
}
