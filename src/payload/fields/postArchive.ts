import type { Field } from 'payload/types'

export const postArchive: Field = {
  name: 'postArchive',
  label: false,
  interfaceName: 'PostArchive',
  type: 'group',
  fields: [
    {
      type: 'relationship',
      name: 'category',
      label: 'Category To Filter By:',
      relationTo: 'category',
      hasMany: true,
    },
    {
      type: 'number',
      name: 'limit',
      label: 'Limit',
      defaultValue: 10,
    },
    {
      type: 'checkbox',
      name: 'showPageRange',
      label: 'Show Page Range',
      defaultValue: false,
    },
    {
      type: 'relationship',
      name: 'populatedDocs',
      label: 'Populated Docs',
      relationTo: ['posts'],
      hasMany: true,
      admin: {
        disabled: true,
        description: 'This field is auto-populated after-read',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      type: 'number',
      name: 'populatedDocsTotal',
      label: 'Populated Docs Total',
      admin: {
        step: 1,
        disabled: true,
        description: 'This field is auto-populated after-read',
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
  ],
}
