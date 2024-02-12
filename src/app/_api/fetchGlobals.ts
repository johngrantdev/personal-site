import type { Site } from '../../payload/payload-types'
import { SITE_SETTINGS_QUERY } from '../_graphql/globals'

export async function fetchSiteSettings(): Promise<Site> {
  if (!process.env.NEXT_PUBLIC_SERVER_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const siteSettings = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/payload/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: SITE_SETTINGS_QUERY,
    }),
  })
    ?.then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching site settings')
      return res.data?.Site
    })

  return siteSettings
}
