import React from 'react'

import { Post } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Padding } from '../../_components/Padding'
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
    <div className="flex flex-col gap-4">
      {introContent && <RichText content={introContent} />}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 w-full gap-3">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <div key={index} className="">
              <Card relationTo={relationTo} doc={doc} showCategories />
            </div>
          )
        })}
      </div>
    </div>
  )
}
