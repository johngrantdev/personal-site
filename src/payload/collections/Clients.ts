import type { CollectionConfig } from 'payload/types'

const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'title',
    hidden: true,
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

export default Clients
