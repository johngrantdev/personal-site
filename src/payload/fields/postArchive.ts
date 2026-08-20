import type { GroupField } from 'payload'

export const postArchive: GroupField = {
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
  ],
}
