import type { CollectionConfig } from 'payload/types'

export const Uploads: CollectionConfig = {
  slug: 'uploads',
  upload: {
    staticURL: '/media',
    imageSizes: [
      {
        name: 'card',
        width: 600,
        height: 600,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1900,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'desktopHalf',
        width: 950,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 750,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'tabletHalf',
        width: 425,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'mobile',
        width: 425,
        height: undefined,
        position: 'centre',
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [],
  admin: {
    group: 'Media',
  },
}
