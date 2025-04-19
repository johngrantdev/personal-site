import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Site } from '@/payload-types'

export async function Header() {
  const headerData: Site = await getCachedGlobal('site', 1)()

  return <HeaderClient siteSettings={headerData} />
}
