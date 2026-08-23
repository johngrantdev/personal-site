import type { CollectionConfig } from 'payload'

const Keywords: CollectionConfig = {
  slug: 'keywords',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
  ],
}

export default Keywords
