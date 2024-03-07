import React, { Fragment } from 'react'

import { Hero as HeroType } from '../../../../payload/payload-types'
import { usePage } from '../../../_providers/Context/Page/pageContext'
import TableOfContents from '../../TableOfContents'

type PostHeroProps = HeroType & {
  className?: string
}

function formatDateIntl(date) {
  return new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export const PostHero: React.FC<PostHeroProps> = props => {
  const { className = '' } = props
  const pageContext = usePage()

  return (
    <div className={className}>
      {pageContext.category && typeof pageContext.category === 'object' && (
        <h2 className="text-2xl">{formatDateIntl(pageContext.publishedAt)}</h2>
      )}
      <h3 className="my-3 text-md">
        {pageContext.description ? pageContext.description : 'nulls'}
      </h3>
      <p className="text-xs">
        {(pageContext.keywords || []).map(keyword => keyword.title).join(', ')}
      </p>
      <TableOfContents />
    </div>
  )
}
