
import { type LexicalBlock, lexicalEditor } from '@payloadcms/richtext-lexical'

import { invertBackground } from '../../fields/invertBackground'
import linkGroup from '../../fields/linkGroup'

export const CallToAction: LexicalBlock = {
  slug: 'cta',
  fields: [
    invertBackground,
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({}),
      label: 'Caption',
    },
    linkGroup({
      appearances: ['primary', 'secondary'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  interfaceName: 'CallToActionBlock',
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
