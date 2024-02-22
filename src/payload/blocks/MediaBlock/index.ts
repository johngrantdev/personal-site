import type { Block } from 'payload/types'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Aspect Ratio',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Square',
          value: 'square',
        },
        {
          label: '16:9',
          value: 'video',
        },
      ],
    },
    {
      name: 'sideCaption',
      type: 'checkbox',
      label: 'Caption in side column?',
      defaultValue: false,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Media Layout',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Two Column',
          value: 'twoColumn',
        },
        {
          label: 'Hero Grid',
          value: 'heroGrid',
        },
      ],
    },
    {
      name: 'media1',
      label: 'Media 1',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'media2',
      label: 'Media 2',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => {
          return siblingData.layout === 'twoColumn' || siblingData.layout === 'heroGrid'
        },
      },
    },
    {
      name: 'media3',
      label: 'Media 3',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, siblingData) => {
          return siblingData.layout === 'heroGrid'
        },
      },
    },
  ],
}
