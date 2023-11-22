import type { CollectionConfig } from 'payload/types'

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
      type: 'text',
    },
  ],
}

export default Keywords
