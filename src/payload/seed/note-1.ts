import type { Note } from '../payload-types'
export const note1: Partial<Note> = {
  title: 'Note 1',
  slug: 'note-1',
  _status: 'published',
  meta: {
    title: 'Note 1',
    description: 'This is the first note.',
    image: '{{IMAGE}}',
  },
  authors: ['{{AUTHOR}}'],
  hero: {
    type: 'lowImpact',
    links: null,
    richText: [
      {
        children: [
          {
            text: 'Note 1',
          },
        ],
        type: 'h1',
      },
    ],
    media: null,
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          richText: [
            {
              children: [
                {
                  text: "This content is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you'd like from rich text and images, to highly designed, complex components.",
                },
              ],
            },
          ],
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
          richText: [
            {
              children: [
                {
                  text: 'This is premium content.',
                  bold: true,
                },
                {
                  text: ' It is only available to authenticated users. This content can be anything from additional video, text, and content, to download links and more. These are simply layout building blocks configured in the CMS.',
                },
              ],
            },
          ],
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
      ],
    },
  ],
  relatedNotes: [], // this is populated by the seed script
}
