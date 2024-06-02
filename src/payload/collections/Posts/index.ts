import { colorPickerField } from '@innovixx/payload-color-picker-field'
import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { layout } from '../../fields/layout'
import { slugField } from '../../fields/slug'
import { populateArchiveField } from '../../hooks/populateArchiveField'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidatePost } from './hooks/revalidatePost'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/next/preview?url=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${doc?.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePost],
    afterRead: [populateArchiveField, populateAuthors],
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
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          admin: {
            width: '30%',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'relationship',
          relationTo: 'category',
          hasMany: false,
          required: true,
        },
        {
          name: 'keywords',
          label: 'Keywords',
          type: 'relationship',
          relationTo: 'keywords',
          hasMany: true,
        },
        slugField(),
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'publishedAt',
          label: 'Published At',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
          hooks: {
            beforeChange: [
              ({ siblingData, value }) => {
                if (siblingData._status === 'published' && !value) {
                  return new Date()
                }
                return value
              },
            ],
          },
        },
        {
          name: 'authors',
          label: 'Authors',
          type: 'relationship',
          relationTo: 'users',
          hasMany: true,
        },
      ],
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      label: 'Populated Authors',
      type: 'array',
      admin: {
        readOnly: true,
        disabled: true,
      },
      access: {
        update: () => false,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'card',
      type: 'group',
      label: 'Card',
      fields: [
        {
          name: 'media',
          type: 'relationship',
          label: 'Image/Video',
          relationTo: 'media',
          required: false,
        },
        // colorPickerField({
        //   name: 'backgroundColour',
        //   label: '',
        //   required: false,
        //   defaultValue: '#000000',
        //   admin: {
        //     description: 'Choose a colour for this page',
        //     width: '20%',
        //   },
        // }),

        // colour picker not working in 3.0 yet, swapped in as a text field for now
        {
          name: 'backgroundColour',
          type: 'text',
          label: '',
          required: false,
          defaultValue: '#000000',
          admin: {
                description: 'Choose a colour for this page',
                width: '20%',
              },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'overlayImage',
              label: 'Overlay colour on background?',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'showDate',
              label: 'Show published Date?',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'hideTitle',
              label: 'Hide Title?',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    layout,
    {
      name: 'relatedPosts',
      label: 'Related Posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
  ],
}
