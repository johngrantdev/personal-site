import type { Page } from '../payload-types'

export const home: Partial<Page> = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  meta: {
    title: 'Payload Website Template',
    description: 'An open-source website built with Payload and Next.js.',
    image: '{{IMAGE_1}}',
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
            tag: 'h1',
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
                text: 'Digital and Physical Product Development.',
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
                text: 'Subheading description.',
              },
            ],
          },
        ],
      },
    },
    media: '{{IMAGE_1}}',
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
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
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
                  text: 'This is a call to action',
                },
              ],
            },
          ],
        },
      },
      links: [
        {
          link: {
            type: 'reference',
            url: '',
            label: 'All artifacts',
            appearance: 'primary',
            reference: {
              value: '{{ARTIFACTS_PAGE_ID}}',
              relationTo: 'pages',
            },
          },
        },
      ],
    },
  ],
}
