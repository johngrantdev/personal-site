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
              defaultValue: 'https://github.com/jayelg/personal-site',
            },
            {
              name: 'faviconSVG',
              label: 'Favicon SVG',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'faviconICO',
              label: 'Favicon ICO',
              type: 'upload',
              relationTo: 'media',
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
