import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PageMargin } from '@/components/PageMargin'
import { Layouts } from '@/components/Layouts'
import { Header } from '@/Header/Component'
import PageContextSetter from './PageContextSetter'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: {
    slug?: string
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export default async function Page({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await params
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { lyout, title } = page

  return (
    <>
    <PageContextSetter
      title={title}
      description={page.meta?.description ?? ''}
      publishedAt={page.publishedAt ? new Date(page.publishedAt) : null}
    />
      <article className="pt-16 pb-24">
        <PageClient />
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}
        <PageMargin className="grow">
          <main className="flex flex-col">
            <Layouts layouts={lyout ?? []} />
          </main>
        </PageMargin>
      </article>
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const awaitedParams = await params;
  const { slug = 'home' } = awaitedParams;
  const page = await queryPageBySlug({
    slug,
  });

  return generateMeta({ doc: page });
}
