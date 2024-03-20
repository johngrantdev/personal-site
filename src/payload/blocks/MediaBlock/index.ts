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
      type: 'row',
      fields: [
        {
          name: 'media1',
          label: 'Media 1',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          admin: {
            width: '70%',
          },
        },
        {
          name: 'media1ShowCaption',
          label: 'Show Caption?',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '30%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'media2',
          label: 'Media 2',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          admin: {
            width: '70%',
            condition: (_, siblingData) => {
              return siblingData.layout === 'twoColumn' || siblingData.layout === 'heroGrid'
            },
          },
        },
        {
          name: 'media2ShowCaption',
          label: 'Show Caption?',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '30%',
            condition: (_, siblingData) => {
              return siblingData.layout === 'twoColumn' || siblingData.layout === 'heroGrid'
            },
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'media3',
          label: 'Media 3',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          admin: {
            width: '70%',
            condition: (_, siblingData) => {
              return siblingData.layout === 'heroGrid'
            },
          },
        },
        {
          name: 'media3ShowCaption',
          label: 'Show Caption?',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '30%',
            condition: (_, siblingData) => {
              return siblingData.layout === 'heroGrid'
            },
          },
        },
      ],
    },
  ],
}
