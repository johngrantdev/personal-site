import React from 'react'
import { notFound, redirect } from 'next/navigation'

import { Redirect } from '@/payload/payload-types'
import { getRedirects } from '../../_api/getRedirects'

export type Props = {
  url: string
  disableNotFound?: boolean
}

const normalize = (path: string): string => {
  let normalized = path
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    normalized = normalized.replace(process.env.NEXT_PUBLIC_SERVER_URL, '')
  }
  normalized = normalized.split('?')[0]
  normalized = normalized.toLowerCase()
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

const getDestination = (redirectDoc: Redirect): string | null => {
  const { to } = redirectDoc
  if (!to) return null

  if (to.type === 'custom' && to.url) {
    let destination = to.url
    if (process.env.NEXT_PUBLIC_SERVER_URL) {
      destination = destination.replace(process.env.NEXT_PUBLIC_SERVER_URL, '')
    }
    return destination
  }

  if (to.type === 'reference' && to.reference && typeof to.reference.value === 'object') {
    const { relationTo, value } = to.reference
    if (relationTo === 'pages') {
      return value.slug === 'home' ? '/' : `/${value.slug}`
    }
    return `/${relationTo}/${value.slug}`
  }

  return null
}

export const PayloadRedirects = async ({ url, disableNotFound }: Props) => {
  const redirects = await getRedirects()

  const normalizedUrl = normalize(url)
  const redirectDoc = redirects.find(doc => normalize(doc.from) === normalizedUrl)

  if (redirectDoc) {
    const destination = getDestination(redirectDoc)
    if (destination && destination !== normalizedUrl) {
      redirect(destination)
    }
  }

  if (disableNotFound) return null
  return notFound()
}
