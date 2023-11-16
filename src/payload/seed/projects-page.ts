import type { Page } from '../payload-types'

export const projectsPage: Partial<Page> = {
  title: 'Projects',
  slug: 'projects',
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
                text: 'All Projects',
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
                text: 'This page displays all or some of the projects of your blog. Each project is complete with a dynamic page layout builder for a completely custom user experience that is under your full control.',
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
