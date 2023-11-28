import React from 'react'

import { Post } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import RichText from '../../_components/RichText'

export type RelatedPostsProps = {
  introContent?: string
  docs?: Post[]
}

export const RelatedPosts: React.FC<RelatedPostsProps> = props => {
  const { introContent, docs } = props

  return (
    <div className="flex flex-col gap-4">
      {introContent && <h3 className={`text-3xl pt-3`}>{introContent}</h3>}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 w-full gap-3">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <div key={index} className="">
              <Card doc={doc} showCategories />
            </div>
          )
        })}
      </div>
    </div>
  )
}
