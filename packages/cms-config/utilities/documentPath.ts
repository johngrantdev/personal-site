type Args = {
  collection: 'pages' | 'posts'
  slug?: string | null
}

// The public path a document is served at.
export const documentPath = ({ collection, slug }: Args): string =>
  collection === 'posts' ? `/posts/${slug}` : slug === 'home' ? '/' : `/${slug}`
