import config from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { Redirect } from '@/payload/payload-types'

const queryRedirects = async (): Promise<Redirect[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'redirects',
    depth: 1,
    pagination: false,
    overrideAccess: false,
  })
  return docs
}

export const getRedirects = unstable_cache(queryRedirects, ['redirects'], {
  tags: ['redirects'],
})
