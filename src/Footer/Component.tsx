import { FooterClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Site } from '@/payload-types'

export async function Footer() {
  const footerData: Site = await getCachedGlobal('site', 1)()

  return <FooterClient siteSettings={footerData} />
}
