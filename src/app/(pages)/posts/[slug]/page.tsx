import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Post } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { RelatedPosts } from '../../../_blocks/RelatedPosts'
import { Blocks } from '../../../_components/Blocks'
import { Padding } from '../../../_components/Padding'
import { RestrictedContent } from '../../../_components/RestrictedContent'
import { PostHero } from '../../../_heros/PostHero'
import { useAuth } from '../../../_providers/Auth'
import { TitleState } from '../../../_providers/Context/Title/titleContext'
import { generateMeta } from '../../../_utilities/generateMeta'
import { toKebabCase } from '../../../_utilities/toKebabCase'

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

  const { layout, enableRestrictedContent, restrictedContent, title } = post

  // relatedPosts at this depth is expected to be populated on Posts and therefore can be asserted as Post[]
  const relatedPosts = post.relatedPosts as Post[]

  return (
    <React.Fragment>
      <TitleState title={title} />
      <PostHero post={post} />
      <Blocks blocks={layout} />
      {enableRestrictedContent && <RestrictedContent postSlug={slug as string} disableTopPadding />}
      <Padding key={1000}>
        <RelatedPosts introContent="More:" docs={relatedPosts} />
      </Padding>
    </React.Fragment>
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
