import type { CollectionConfig } from 'payload'

import { admins } from '../../access/admins'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: admins,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
  timestamps: true,
}

export default Users
