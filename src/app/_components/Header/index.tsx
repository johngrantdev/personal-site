{
  /* eslint-disable @next/next/no-img-element */
}

import React, { useEffect } from 'react'
import Link from 'next/link'

import { Site } from '../../../payload/payload-types'
import { Padding } from '../Padding'
import { HeaderNav } from './Nav'
import { Title } from './Title'

type HeaderProps = {
  siteSettings: Site
}

export async function Header({ siteSettings }: HeaderProps) {
  return (
    <header className="fixed z-30 w-full mix-blend-difference text-zinc-200">
      <Padding className="my-6 flex justify-between flex-wrap gap-x-3" top={false} bottom={false}>
        <Title siteTitle={siteSettings ? siteSettings.siteTitle : 'Title'} />
        <HeaderNav siteSettings={siteSettings} />
      </Padding>
    </header>
  )
}
