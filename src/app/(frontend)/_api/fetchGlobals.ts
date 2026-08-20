import config from '@payload-config'
import { getPayload } from 'payload'

import type { Site } from '@/payload/payload-types'

export async function fetchSiteSettings(): Promise<Site> {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'site',
    depth: 3,
    overrideAccess: false,
  })
}
