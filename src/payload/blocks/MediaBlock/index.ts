import type { LexicalBlock } from '@payloadcms/richtext-lexical'

export const MediaBlock: LexicalBlock = {
  slug: 'mediaBlock',
  fields: [
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: 'default',
      label: 'Aspect Ratio',
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
      defaultValue: false,
      label: 'Caption in side column?',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'default',
      label: 'Media Layout',
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
          type: 'relationship',
          admin: {
            width: '70%',
          },
          label: 'Media 1',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'media1ShowCaption',
          type: 'checkbox',
          admin: {
            width: '30%',
          },
          defaultValue: false,
          label: 'Show Caption?',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'media2',
          type: 'relationship',
          admin: {
            condition: (_, siblingData) => {
              return siblingData.layout === 'twoColumn' || siblingData.layout === 'heroGrid'
            },
            width: '70%',
          },
          label: 'Media 2',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'media2ShowCaption',
          type: 'checkbox',
          admin: {
            condition: (_, siblingData) => {
              return siblingData.layout === 'twoColumn' || siblingData.layout === 'heroGrid'
            },
            width: '30%',
          },
          defaultValue: false,
          label: 'Show Caption?',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'media3',
          type: 'relationship',
          admin: {
            condition: (_, siblingData) => {
              return siblingData.layout === 'heroGrid'
            },
            width: '70%',
          },
          label: 'Media 3',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'media3ShowCaption',
          type: 'checkbox',
          admin: {
            condition: (_, siblingData) => {
              return siblingData.layout === 'heroGrid'
            },
            width: '30%',
          },
          defaultValue: false,
          label: 'Show Caption?',
        },
      ],
    },
  ],
  interfaceName: 'MediaBlock',
}
