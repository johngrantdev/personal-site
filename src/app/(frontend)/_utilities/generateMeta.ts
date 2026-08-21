import type { Metadata } from 'next'

import type { Page, Post } from '@/payload/payload-types'
import { documentPath } from '@/payload/utilities/generatePreviewPath'
import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async (args: {
  doc: Page | Post | null
  collection: 'pages' | 'posts'
}): Promise<Metadata> => {
  const { collection, doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`

  // Fall back to the document's own title, then the site name, rather than a
  // hardcoded string.
  const title = doc?.meta?.title || doc?.title || process.env.SITE_NAME

  return {
    title,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      title,
      description: doc?.meta?.description,
      url: documentPath({ collection, slug: doc?.slug }),
      images: ogImage ? [{ url: ogImage }] : undefined,
    }),
  }
}
