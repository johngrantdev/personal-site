{
  /* eslint-disable @next/next/no-img-element */
}

import React, { useEffect } from 'react'
import Link from 'next/link'

import { Header } from '../../../payload/payload-types'
import { fetchHeader } from '../../_api/fetchGlobals'
import { Padding } from '../Padding'
import { HeaderNav } from './Nav'
import { Title } from './Title'

export async function Header() {
  let header: Header | null = null

  try {
    header = await fetchHeader()
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the header without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <header>
      {/* add wrap styles */}
      <Padding className="flex justify-between flex-wrap gap-x-3" bottom={false}>
        <Title />
        <HeaderNav header={header} />
      </Padding>
    </header>
  )
}
