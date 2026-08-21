import type { GroupField } from 'payload'

export const postArchive: GroupField = {
  name: 'postArchive',
  label: false,
  interfaceName: 'PostArchive',
  type: 'group',
  fields: [
    {
      type: 'relationship',
      // abbreviated: nests inside layout groups, see fields/layout.ts
      name: 'cat',
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
  ],
}
