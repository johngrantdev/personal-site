type Args = {
  collection: 'pages' | 'posts'
  slug?: string | null
}

/**
 * The public path a document is served at. Shared by preview URLs and the
 * canonical/Open Graph URL in generateMeta, so the two cannot drift apart.
 */
export const documentPath = ({ collection, slug }: Args): string =>
  collection === 'posts' ? `/posts/${slug}` : slug === 'home' ? '/' : `/${slug}`

export const generatePreviewPath = ({ collection, slug }: Args): string => {
  const path = documentPath({ collection, slug })

  return `/api/next/preview?path=${encodeURIComponent(path)}&secret=${
    process.env.NEXT_PRIVATE_DRAFT_SECRET || ''
  }`
}
