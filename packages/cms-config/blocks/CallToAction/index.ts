import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { invertBackground } from '../../fields/invertBackground'
import linkGroup from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
  },
  fields: [
    invertBackground,
    {
      name: 'richText',
      label: 'Caption',
      type: 'richText',
      editor: lexicalEditor(),
    },
    linkGroup({
      appearances: ['primary', 'secondary'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
