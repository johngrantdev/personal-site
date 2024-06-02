import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'
import { revalidateAllPages } from './hooks/revalidateAllPages'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteTitle',
              label: 'Site Title',
              type: 'text',
              defaultValue: 'Site Title',
            },
            {
              name: 'siteDescription',
              label: 'Site Description',
              type: 'text',
              defaultValue: 'Site description placeholder',
            },
            {
              name: 'siteSourceLink',
              label: 'Source Link',
              type: 'text',
              defaultValue: 'https://github.com/johngrantdev/personal-site',
            },
            {
              name: 'faviconSVG',
              label: 'Favicon SVG',
              type: 'upload',
              relationTo: 'uploads',
            },
            {
              name: 'faviconICO',
              label: 'Favicon ICO',
              type: 'upload',
              relationTo: 'uploads',
            },
            {
              type: 'group',
              name: 'plausible',
              label: 'Plausible',
              fields: [
                {
                  type: 'checkbox',
                  name: 'enabled',
                  label: 'Enable?',
                },
                {
                  type: 'text',
                  name: 'url',
                  label: 'plausible URL',
                },
              ],
            },
          ],
        },
        {
          label: 'Main Navigation',
          fields: [
            {
              name: 'navItems',
              label: 'Items',
              type: 'array',
              maxRows: 6,
              fields: [
                link({
                  appearances: false,
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAllPages],
  },
}
