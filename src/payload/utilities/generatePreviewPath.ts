type Args = {
  collection: 'pages' | 'posts'
  slug?: string | null
}

export const generatePreviewPath = ({ collection, slug }: Args): string => {
  const path = collection === 'posts' ? `/posts/${slug}` : slug === 'home' ? '/' : `/${slug}`

  return `/api/next/preview?path=${encodeURIComponent(path)}&secret=${
    process.env.NEXT_PRIVATE_DRAFT_SECRET || ''
  }`
}
