{
  /* eslint-disable @next/next/no-img-element */
}

import React, { useEffect } from 'react'
import Link from 'next/link'

import { Site } from '../../../payload/payload-types'
import { PageMargin } from '../PageMargin'
import { HeaderNav } from './Nav'
import { Title } from './Title'

type HeaderProps = {
  siteSettings: Site
}

export async function Header({ siteSettings }: HeaderProps) {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-30 text-zinc-200 mix-blend-difference">
      <PageMargin className="my-6 flex justify-between flex-wrap gap-x-3">
        <Title siteTitle={siteSettings ? siteSettings.siteTitle : 'Title'} />
        <HeaderNav siteSettings={siteSettings} />
      </PageMargin>
    </header>
  )
}
