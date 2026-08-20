import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import type { Site } from '@/payload/payload-types'

export const getSiteSettings = unstable_cache(
  async (): Promise<Site> => {
    const payload = await getPayload({ config })
    return payload.findGlobal({
      slug: 'site',
      depth: 3,
      overrideAccess: false,
    })
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)
