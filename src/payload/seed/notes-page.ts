import type { Page } from '../payload-types'

export const notesPage: Partial<Page> = {
  title: 'Notes',
  slug: 'notes',
  _status: 'published',
  meta: {
    title: 'Payload Website Template',
    description: 'An open-source website built with Payload and Next.js.',
    image: '{{IMAGE}}',
  },
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'heading',
            tag: 'h3',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                mode: 'normal',
                type: 'text',
                style: '',
                detail: 0,
                version: 1,
                format: 1,
                text: 'Notes',
              },
            ],
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                mode: 'normal',
                type: 'text',
                style: '',
                detail: 0,
                version: 1,
                format: 1,
                text: 'Documenting interesting things.',
              },
            ],
          },
        ],
      },
    },
    media: undefined,
  },
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'heading',
              tag: 'h4',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  mode: 'normal',
                  type: 'text',
                  style: '',
                  detail: 0,
                  version: 1,
                  format: 1,
                  text: '',
                },
              ],
            },
          ],
        },
      },
      populateBy: 'collection',
      relationTo: 'artifacts',
      limit: 12,
      showPageRange: false,
      categories: [],
    },
  ],
}
