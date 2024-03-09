import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Layouts } from '../../_components/Layouts'
import { PageMargin } from '../../_components/PageMargin'
import { PageState } from '../../_providers/Context/pageContext'
import { generateMeta } from '../../_utilities/generateMeta'

export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  if (!page) {
    return notFound()
  }

  const { layout, title } = page

  return (
    <PageMargin className="grow">
      <main className="flex flex-col">
        <PageState title={title} />
        <Layouts layouts={layout} />
      </main>
    </PageMargin>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages')
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: page })
}
