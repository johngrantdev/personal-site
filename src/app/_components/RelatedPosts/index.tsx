import React from 'react'

import { Post } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Padding } from '../../_components/Padding'

export type RelatedPostsProps = {
  introContent?: string
  docs?: Post[]
}

export const RelatedPosts: React.FC<RelatedPostsProps> = props => {
  const { introContent, docs } = props

  return (
    <Padding className="w-full snap-start flex flex-col lg:flex-row grow">
      {introContent && (
        <h3
          className={`text-2xl flex-none w-full text-center item lg:text-left lg:w-80 overflow-hidden`}
        >
          {introContent}
        </h3>
      )}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-3">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="posts" showCategory />
        })}
      </div>
    </Padding>
  )
}
