import React from 'react'

import { Post } from '../../../../payload/payload-types'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { generateColourGradient } from '../../../_utilities/generateColourGradient'
import { CardClient } from '../client'

export const CardStatic: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategory?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  relationTo?: 'posts'
  doc?: Post
  orientation?: 'horizontal' | 'vertical'
  index?: number
}> = props => {
  const {
    relationTo,
    title: titleFromProps,
    doc,
    className,
    orientation = 'vertical',
    index = 0,
  } = props

  const {
    slug,
    title,
    description,
    publishedAt,
    keywords: keywordsProps = [],
    card: cardProps,
  } = doc || {}

  const publishedDate = cardProps.showDate && formatDateTime(publishedAt)
  const clientClassName = [
    `relative rounded-xl overflow-hidden drop-shadow-md h-full aspect-video md:aspect-square transition-transform`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const titleToUse = titleFromProps || title
  const keywords =
    keywordsProps &&
    Array.isArray(keywordsProps) &&
    keywordsProps.length > 0 &&
    keywordsProps
      .map(keyword => (typeof keyword === 'object' && 'title' in keyword ? keyword.title : keyword))
      .join(', ')

  const href = `/${relationTo}/${slug}`
  const animationDuration = 400
  const loadDelay = (animationDuration * (index + 1)) / 8

  const gradientStops = generateColourGradient(cardProps.backgroundColour, 5, 10)

  // todo: try to populate media
  const card = {
    ...cardProps,
    media:
      cardProps.media &&
      typeof cardProps.media !== 'string' &&
      typeof cardProps.media !== 'number' &&
      cardProps.media,
  }

  return (
    <CardClient
      className={clientClassName}
      title={titleToUse}
      description={description}
      publishedDate={publishedDate}
      keywords={keywords}
      index={index}
      loadDelay={loadDelay}
      card={card}
      href={href}
      gradientStops={gradientStops}
    />
  )
}
