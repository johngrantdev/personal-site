'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

import { Page } from '../../../payload/payload-types'
import { POST_RESTRICTED_CONTENT } from '../../_graphql/posts'
import { useAuth } from '../../_providers/Auth'
import { Blocks } from '../Blocks'
import { LoadingShimmer } from '../LoadingShimmer'
import { Message } from '../Message'
import { Padding } from '../Padding'

export const RestrictedContent: React.FC<{
  postSlug: string
  disableTopPadding?: boolean
}> = props => {
  const { postSlug, disableTopPadding } = props
  const { user } = useAuth()

  const [isLoading, setIsLoading] = React.useState(false)
  const [blocks, setBlocks] = React.useState<Page['layout']>()
  const hasInitialized = React.useRef(false)
  const isRequesting = React.useRef(false)

  useEffect(() => {
    if (!user || hasInitialized.current || isRequesting.current) return
    hasInitialized.current = true
    isRequesting.current = true

    const start = Date.now()

    const getPaywallContent = async () => {
      setIsLoading(true)

      try {
        const restrictedContent = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: POST_RESTRICTED_CONTENT,
            variables: {
              slug: postSlug,
            },
          }),
        })
          ?.then(res => res.json())
          ?.then(res => res?.data?.posts.docs[0]?.restrictedContent)

        if (restrictedContent) {
          setBlocks(restrictedContent)
        }

        // wait before setting `isLoading` to `false` to give the illusion of loading
        // this is to prevent a flash of the loading shimmer on fast networks
        const end = Date.now()
        if (end - start < 1000) {
          await new Promise(resolve => setTimeout(resolve, 500 - (end - start)))
        }

        setIsLoading(false)
      } catch (error) {
        console.error(error) // eslint-disable-line no-console
        setIsLoading(false)
      }
    }

    getPaywallContent()

    isRequesting.current = false
  }, [user, postSlug])

  if (user === undefined || user === null || !blocks || blocks.length === 0) {
    return null
  }

  // if (user === null) {
  //   return (
  //     <Padding top={false}>
  //       <Message
  //         message={
  //           <>
  //             {`This content is gated behind authentication. You must be `}
  //             <Link href={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}>
  //               logged in
  //             </Link>
  //             {` to view this content.`}
  //           </>
  //         }
  //       />
  //     </Padding>
  //   )
  // }

  if (isLoading) {
    return (
      <Padding top={false}>
        <LoadingShimmer />
      </Padding>
    )
  }

  // if (!blocks || blocks.length === 0) {
  //   return (
  //     <Padding top={false}>
  //       <Message message="Log in to unlock this restricted content." />
  //     </Padding>
  //   )
  // }

  return <Blocks blocks={blocks} topPadding={disableTopPadding} />
}
