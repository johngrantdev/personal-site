import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['media', 'alt', 'caption'],
    description:
      'The main image will be optimized for different resolutions. The dark mode and mobile images can be optionally used when the image does not present well in dark mode or mobile screen sizes.',
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
              Cell: '@/components/ThumbnailCell#default',
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
