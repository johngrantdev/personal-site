import type { Metadata } from 'next'

// SITE_OG_IMAGE is optional: an absolute URL, or a path resolved against
// metadataBase. When unset no default image is advertised, which is better than
// advertising one that is not ours.
const defaultImage = process.env.SITE_OG_IMAGE

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: process.env.SITE_NAME,
  title: process.env.SITE_NAME,
  description: process.env.SITE_DESCRIPTION,
  ...(defaultImage ? { images: [{ url: defaultImage }] } : {}),
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  const images = og?.images ?? defaultOpenGraph.images

  return {
    ...defaultOpenGraph,
    ...og,
    ...(images ? { images } : {}),
  }
}
