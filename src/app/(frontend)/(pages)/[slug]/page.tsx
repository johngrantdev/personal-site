import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { Page as PageType } from '@/payload/payload-types'
import { getPage } from '../../_api/getPage'
import { getPageSlugs } from '../../_api/getSlugs'
import { Layouts } from '../../_components/Layouts'
import { PayloadRedirects } from '../../_components/PayloadRedirects'
import { RefreshRouteOnSave } from '../../_components/RefreshRouteOnSave'
import { PageMargin } from '../../_components/PageMargin'
import { PageState } from '../../_providers/Context/pageContext'
import { generateMeta } from '../../_utilities/generateMeta'

type PageProps = { params: Promise<{ slug?: string }> }

export default async function Page({ params }: PageProps) {
  const { slug = 'home' } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = await getPage(slug, isDraftMode)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  // A missing page may still be a configured redirect; this notFounds otherwise.
  if (!page) {
    return <PayloadRedirects url={slug === 'home' ? '/' : `/${slug}`} />
  }

  const { lyout, title } = page

  return (
    <PageMargin className="grow">
      <main className="flex flex-col">
        {isDraftMode && <RefreshRouteOnSave />}
        <PageState title={title} />
        <Layouts layouts={lyout} />
      </main>
    </PageMargin>
  )
}

export async function generateStaticParams() {
  try {
    const slugs = await getPageSlugs()
    return slugs.map(slug => ({ slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = 'home' } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = await getPage(slug, isDraftMode)
  } catch (error) {}

  return generateMeta({ doc: page })
}
