import type { Site } from '@/payload/payload-types'

import { cached } from './cache'
import { payload } from './payload'

export const getSiteSettings = (): Promise<Site> =>
  cached('site-settings', ['site-settings'], () =>
    payload.findGlobal({ slug: 'site', depth: 3, overrideAccess: false }),
  )
