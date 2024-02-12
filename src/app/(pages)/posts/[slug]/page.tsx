import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Keyword, Post } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { RelatedPosts } from '../../../_blocks/RelatedPosts'
import { Layout } from '../../../_components/Layout'
import { Padding } from '../../../_components/Padding'
import { PageState } from '../../../_providers/Context/Page/pageContext'
import { generateMeta } from '../../../_utilities/generateMeta'

export default async function Post({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let post: Post | null = null

  try {
    post = await fetchDoc<Post>({
      collection: 'posts',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!post) {
    notFound()
  }

  const { layout, title, description, category } = post
  // Todo: implement a populate function and type guard instead for the below type assertions
  const filteredKeywords = (post.keywords || []).filter(
    keyword => typeof keyword !== 'number',
  ) as Keyword[]
  const relatedPosts = (post.relatedPosts || []).filter(
    relatedPost => typeof relatedPost !== 'number',
  ) as Post[]

  return (
    <main className="snap-y snap-mandatory grow flex flex-col">
      <PageState
        title={title}
        description={description}
        category={typeof category !== 'number' && category}
        keywords={filteredKeywords}
      />
      <Layout layouts={layout} />
      {relatedPosts && relatedPosts.length > 0 && (
        <RelatedPosts introContent="More:" docs={relatedPosts} />
      )}
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const posts = await fetchDocs<Post>('posts')
    return posts?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let post: Post | null = null

  try {
    post = await fetchDoc<Post>({
      collection: 'posts',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: post })
}
