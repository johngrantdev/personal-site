import type { Artifact } from '../payload-types'
export const note3: Partial<Artifact> = {
  title: 'Note 3',
  slug: 'note-3',
  _status: 'published',
  meta: {
    title: 'Note 3',
    description: 'This is the third note.',
    image: '{{IMAGE}}',
  },
  authors: ['{{AUTHOR}}'],
  hero: {
    type: 'lowImpact',
    links: null,
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
                text: 'Note 3',
              },
            ],
          },
        ],
      },
    },
    media: null,
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
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
                      text: "This content is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you'd like from rich text and images, to highly designed, complex components.",
                    },
                  ],
                },
              ],
            },
          },
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
      ],
    },
  ],
  enablePremiumContent: true,
  premiumContent: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
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
                      text: 'This is premium content.',
                    },
                    {
                      mode: 'normal',
                      type: 'text',
                      style: '',
                      detail: 0,
                      version: 1,
                      format: 1,
                      text: ' It is only available to authenticated users. This content can be anything from additional video, text, and content, to download links and more. These are simply layout building blocks configured in the CMS.',
                    },
                  ],
                },
              ],
            },
          },
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
      ],
    },
  ],
  relatedArtifacts: [], // this is populated by the seed script
}
