import type { CollectionConfig } from 'payload/types'

import { CollectionInstructions } from '../../components/CollectionIntro'
import ThumbnailCell from '../../components/ThumbnailCell'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['media', 'alt', 'caption'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'richText',
    },
    {
      name: 'instructions',
      type: 'ui',
      admin: {
        components: {
          Field: CollectionInstructions,
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'uploads',
          label: 'Image/Video',
          required: true,
          admin: {
            components: {
              Cell: ThumbnailCell,
            },
          },
        },
        {
          name: 'mediaDark',
          type: 'upload',
          relationTo: 'uploads',
          label: '(Optional) Image for Dark Mode',
          required: false,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mediaMobile',
          type: 'upload',
          relationTo: 'uploads',
          label: '(Optional) Image for Mobile',
          required: false,
        },
        {
          name: 'mediaMobileDark',
          type: 'upload',
          relationTo: 'uploads',
          label: '(Optional) Image for Mobile Dark Mode',
          required: false,
        },
      ],
    },
  ],
}
