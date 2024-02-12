import React, { Fragment } from 'react'

import { Hero as HeroType } from '../../../../payload/payload-types'
import { usePage } from '../../../_providers/Context/Page/pageContext'

type PostHeroProps = HeroType & {
  className?: string
}

export const PostHero: React.FC<PostHeroProps> = props => {
  const { className = '' } = props
  const pageContext = usePage()

  return (
    <div className={className}>
      <div className="flex gap-3 ">
        <h2 className="text-xl">
          {pageContext.category && typeof pageContext.category === 'object' && (
            <Fragment>{pageContext.category.title}</Fragment>
          )}
        </h2>
      </div>
      <h3 className="my-3 text-md">
        {pageContext.description ? pageContext.description : 'nulls'}
      </h3>
    </div>
  )
}
