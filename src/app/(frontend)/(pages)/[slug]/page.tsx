import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Page as PageType } from '@/payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Layouts } from '../../_components/Layouts'
import { PageMargin } from '../../_components/PageMargin'
import { PageState } from '../../_providers/Context/pageContext'
import { generateMeta } from '../../_utilities/generateMeta'

type PageProps = { params: Promise<{ slug?: string }> }

export default async function Page({ params }: PageProps) {
  const { slug = 'home' } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = await fetchDoc<PageType>({
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
    const pages = await fetchDocs<PageType>('pages')
    return pages?.map(({ slug }) => ({ slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = 'home' } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  let page: PageType | null = null

  try {
    page = await fetchDoc<PageType>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: page })
}
