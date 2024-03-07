import type { Field } from 'payload/types'

import linkGroup from './linkGroup'

// import { LayoutFillerComponent } from '../components/Layout'

export const layout: Field = {
  name: 'layout',
  label: 'Main Layout',
  type: 'array',
  interfaceName: 'Layout',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'sideContentPosition',
          label: false,
          type: 'select',
          required: true,
          defaultValue: 'scrollSideContent',
          options: [
            {
              label: 'Scroll Side Content',
              value: 'scrollSideContent',
            },
            {
              label: 'Fixed side content when visible',
              value: 'fixedSideContentWhenVisible',
            },
            {
              label: 'Fixed side content always',
              value: 'fixedSideContentAlways',
            },
          ],
        },
        {
          name: 'scrollSnap',
          label: 'Scroll Snap',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'fullPageHeight',
          label: 'Full Page Height',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sideColumn',
          type: 'group',
          interfaceName: 'SideColumn',
          admin: {
            width: '30%',
          },
          fields: [
            {
              name: 'style',
              label: 'Side Column',
              type: 'select',
              required: true,
              defaultValue: 'none',
              options: [
                {
                  label: 'None',
                  value: 'none',
                },
                {
                  label: 'Hero',
                  value: 'hero',
                },
                {
                  label: 'Post Hero',
                  value: 'postHero',
                },
                {
                  label: 'Project Hero',
                  value: 'projectHero',
                },
                {
                  label: 'One Row',
                  value: 'singleLayout',
                },
                {
                  label: 'Two Rows',
                  value: 'twoRows',
                },
              ],
            },
            {
              name: 'hero',
              type: 'group',
              label: false,
              interfaceName: 'Hero',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.style === 'hero'
                },
              },
              fields: [
                {
                  name: 'media',
                  type: 'relationship',
                  relationTo: 'media',
                  required: false,
                },
                {
                  name: 'description',
                  type: 'richText',
                },
                linkGroup(),
              ],
            },
            {
              name: 'projectHero',
              type: 'group',
              label: false,
              interfaceName: 'ProjectHero',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.style === 'projectHero'
                },
              },
              fields: [
                {
                  name: 'year',
                  label: 'Year Completed',
                  type: 'number',
                  min: 2000,
                  max: 2050,
                },
                {
                  name: 'client',
                  label: 'Client',
                  type: 'relationship',
                  relationTo: 'clients',
                },
                {
                  name: 'usePostDescription',
                  label: 'Use Post Description?',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'customDescription',
                  label: 'Description',
                  type: 'richText',
                  admin: {
                    condition: (_, siblingData) => {
                      return !siblingData.usePostDescription
                    },
                  },
                },
                linkGroup(),
              ],
            },
            {
              name: 'sideContent1',
              label: false,
              type: 'richText',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.style === 'singleLayout' || siblingData.style === 'twoRows'
                },
              },
            },
            {
              name: 'sideContent2',
              label: false,
              type: 'richText',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.style === 'twoRows'
                },
              },
            },
          ],
        },
        {
          name: 'mainColumn',
          type: 'group',
          interfaceName: 'MainColumn',
          admin: {
            width: '70%',
          },
          fields: [
            {
              name: 'style',
              label: 'Main Column',
              type: 'select',
              required: true,
              defaultValue: 'singleLayout',
              options: [
                {
                  label: 'Single Layout',
                  value: 'singleLayout',
                },
                {
                  label: 'Two Columns',
                  value: 'twoColumns',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'column1',
                  label: false,
                  type: 'richText',
                },
                {
                  name: 'column2',
                  label: false,
                  type: 'richText',
                  admin: {
                    condition: (_, siblingData) => {
                      return siblingData.style === 'twoColumns'
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
