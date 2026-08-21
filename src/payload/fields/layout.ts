// Field names here are deliberately abbreviated. PostgreSQL truncates identifiers
// at 63 bytes (NAMEDATALEN) and silently collides beyond that; table and constraint
// names are built from the full nested field path, so `layout.sideColumn.projectHero
// .links` overflows while `lyout.sideCol.prjHero.lnks` does not. Do not expand these
// without re-checking:
//   SELECT length(conname), conname FROM pg_constraint c JOIN pg_namespace n
//     ON n.oid = c.connamespace WHERE n.nspname = 'public' ORDER BY 1 DESC LIMIT 5;
// Nothing may reach 63. `interfaceName` values stay readable — they are TypeScript
// only and never reach the database.
import type { Field } from 'payload'

import linkGroup from './linkGroup'
import { postArchive } from './postArchive'

// import { LayoutFillerComponent } from '../components/Layout'

export const layout: Field = {
  name: 'lyout',
  label: 'Main Layout',
  type: 'array',
  interfaceName: 'Layout',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'sidePos',
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
          name: 'scrSnap',
          label: 'Scroll Snap',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'fullH',
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
          name: 'sideCol',
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
                  name: 'desc',
                  type: 'richText',
                },
                linkGroup(),
              ],
            },
            {
              name: 'prjHero',
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
                  name: 'yr',
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
                  name: 'useDesc',
                  label: 'Use Post Description?',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'cDesc',
                  label: 'Description',
                  type: 'richText',
                  admin: {
                    condition: (_, siblingData) => {
                      return !siblingData.useDesc
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
          name: 'mainCol',
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
                  label: 'Post Archive',
                  value: 'postArchive',
                },
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
                  ...postArchive,
                  admin: {
                    condition: (_, siblingData) => {
                      return siblingData.style === 'postArchive'
                    },
                  },
                },
                {
                  name: 'column1',
                  label: false,
                  type: 'richText',
                  admin: {
                    condition: (_, siblingData) => {
                      return (
                        siblingData.style === 'singleLayout' || siblingData.style === 'twoColumns'
                      )
                    },
                  },
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
