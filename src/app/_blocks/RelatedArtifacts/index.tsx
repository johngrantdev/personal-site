import React from 'react'

import { Post } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Gutter } from '../../_components/Gutter'
import RichText from '../../_components/RichText'

// import classes from './index.module.scss'

export type RelatedPostsProps = {
  blockType: 'relatedPosts'
  blockName: string
  introContent?: any
  docs?: (string | Post)[]
  relationTo: 'posts'
}

export const RelatedPosts: React.FC<RelatedPostsProps> = props => {
  const { introContent, docs, relationTo } = props

  return (
    // add relatedPosts styling
    <div>
      {introContent && (
        <Gutter className="relative mb-12">
          <RichText content={introContent} />
        </Gutter>
      )}
      <Gutter>
        {/* add grid styling */}
        <div className="grid grid-cols-3 w-full gap-10">
          {docs?.map((doc, index) => {
            if (typeof doc === 'string') return null

            return (
              // add column and docs.length === 2 -> cols half, >=3 -> cols-thirds styling
              <div key={index} className="">
                <Card relationTo={relationTo} doc={doc} showCategories />
              </div>
            )
          })}
        </div>
      </Gutter>
    </div>
  )
}
