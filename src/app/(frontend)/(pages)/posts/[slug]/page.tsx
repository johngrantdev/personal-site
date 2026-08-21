import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { Keyword, Post as PostType } from '@/payload/payload-types'
import { getPost } from '../../../_api/getPost'
import { getPostSlugs } from '../../../_api/getSlugs'
import { Layouts } from '../../../_components/Layouts'
import { PayloadRedirects } from '../../../_components/PayloadRedirects'
import { RefreshRouteOnSave } from '../../../_components/RefreshRouteOnSave'
import { PageMargin } from '../../../_components/PageMargin'
import { RelatedPosts } from '../../../_components/RelatedPosts'
import { PageState } from '../../../_providers/Context/pageContext'
import { generateMeta } from '../../../_utilities/generateMeta'

type PostProps = { params: Promise<{ slug: string }> }

export default async function Post({ params }: PostProps) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  let post: PostType | null = null

  try {
    post = await getPost(slug, isDraftMode)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  // A missing post may still be a configured redirect; this notFounds otherwise.
  if (!post) {
    return <PayloadRedirects url={`/posts/${slug}`} />
  }

  const { lyout, title, publishedAt, description, category } = post
  // Todo: implement a populate function and type guard instead for the below type assertions
  const filteredKeywords = (post.keywords || []).filter(
    keyword => typeof keyword !== 'number',
  ) as Keyword[]
  const relatedPosts = (post.relatedPosts || []).filter(
    relatedPost => typeof relatedPost !== 'number',
  ) as PostType[]

  return (
    <PageMargin className="grow">
      <main className="flex flex-col">
        {isDraftMode && <RefreshRouteOnSave />}
        <PageState
          title={title}
          description={description}
          category={typeof category !== 'number' && category}
          keywords={filteredKeywords}
          publishedAt={publishedAt}
        />
        <Layouts layouts={lyout} relatedPosts={relatedPosts} />
      </main>
    </PageMargin>
  )
}

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs()
    return slugs.map(slug => ({ slug }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  let post: PostType | null = null

  try {
    post = await getPost(slug, isDraftMode)
  } catch (error) {}

  return generateMeta({ collection: 'posts', doc: post })
}
