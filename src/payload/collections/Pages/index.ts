import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { layout } from '../../fields/layout'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage, revalidatePageDelete } from './hooks/revalidatePage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => generatePreviewPath({ collection: 'pages', slug: doc?.slug as string }),
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
  },
  // Pages are only ever populated as a redirect reference.
  defaultPopulate: {
    slug: true,
    title: true,
  },
  versions: {
    drafts: true,
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedAt',
      label: 'Published At',
      type: 'date',
    },
    slugField({ useAsSlug: 'title' }),
    layout,
  ],
}
