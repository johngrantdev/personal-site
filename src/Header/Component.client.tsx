'use client'

import React from 'react'

import { Site } from '@/payload-types'
import { PageMargin } from '@/components/PageMargin'
import { HeaderNav } from './Nav'
import { Title } from './Title'

type HeaderProps = {
  siteSettings: Site
}

export const HeaderClient: React.FC<HeaderProps> = ({ siteSettings }) => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-30 text-zinc-200 mix-blend-difference">
      <PageMargin className="my-6 flex justify-between flex-wrap gap-x-3">
        <Title siteTitle={siteSettings?.siteTitle ?? 'Title'} />
        <HeaderNav siteSettings={siteSettings} />
      </PageMargin>
    </header>
  )
}
