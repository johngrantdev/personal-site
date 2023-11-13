import type { Page } from '../payload-types'

export const artifactsPage: Partial<Page> = {
  title: 'Artifacts',
  slug: 'artifacts',
  _status: 'published',
  meta: {
    title: 'Payload Website Template',
    description: 'An open-source website built with Payload and Next.js.',
    image: '{{IMAGE}}',
  },
  hero: {
    type: 'lowImpact',
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'All artifacts',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'This page displays all or some of the artifacts of your blog. Each artifact is complete with a dynamic page layout builder for a completely custom user experience that is under your full control.',
          },
        ],
      },
    ],
    media: undefined,
  },
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'All artifacts',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'The artifacts below are displayed in an "Archive" layout building block which is an extremely powerful way to display documents on a page. It can be auto-populated by collection or by category, or artifacts can be individually selected. Pagination controls will automatically appear if the number of results exceeds the number of items per page.',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'artifacts',
      limit: 10,
      categories: [],
    },
  ],
}
