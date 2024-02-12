import type { CollectionConfig } from 'payload/types'

const Category: CollectionConfig = {
  slug: 'category',
  admin: {
    useAsTitle: 'title',
    // hidden: true,
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

export default Category
