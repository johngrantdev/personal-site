import type { Block } from 'payload/types'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  labels: {
    singular: 'Code',
    plural: 'Code',
  },
  fields: [
    {
      name: 'language',
      required: true,
      type: 'select',
      options: [
        {
          label: 'Go',
          value: 'go',
        },
        {
          label: 'Javascript',
          value: 'javascript',
        },
        {
          label: 'Typescript',
          value: 'typescript',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'javascript',
      },
    },
  ],
}
