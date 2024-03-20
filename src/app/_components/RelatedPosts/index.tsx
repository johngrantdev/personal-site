import React from 'react'

import { Post } from '../../../payload/payload-types'
import { CollectionArchive } from '../CollectionArchive'
import { Column, Layout } from '../Layout'

export type RelatedPostsProps = {
  index: number
  docs?: Post[]
}

export const RelatedPosts: React.FC<RelatedPostsProps> = props => {
  const { index, docs } = props

  if (docs && docs.length > 0) {
    return (
      <div key={index}>
          <Layout
            sideColumn={true}
            bottom={true}
          >
            <Column position="side">
              <h3
                className={`text-2xl flex-none w-full text-center item lg:text-left lg:w-80 overflow-hidden`}
              >
                More
              </h3>
            </Column>
            <Column position="main">
              <CollectionArchive className='w-full' docs={docs} />
            </Column>
          </Layout>
      </div> 
    )
  } else {
    return null
  }
}
