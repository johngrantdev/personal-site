import React, { Fragment } from 'react'

import { Hero as HeroType } from '../../../../payload/payload-types'
import { usePage } from '../../../_providers/Context/Page/pageContext'

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
      <div className="flex gap-3 ">
        <h2 className="text-xl text-center xl:text-left">
          {pageContext.category && typeof pageContext.category === 'object' && (
            <Fragment>{formatDateIntl(pageContext.publishedAt)}</Fragment>
          )}
        </h2>
      </div>
      <h3 className="my-3 text-md">
        {pageContext.description ? pageContext.description : 'nulls'}
      </h3>
      <p>{pageContext.keywords.map(keyword => keyword.title).join(', ')}</p>
    </div>
  )
}
