import React from 'react'

import { CollectionArchive } from '../../_components/CollectionArchive'
import RichText from '../../_components/RichText'
import { ArchiveBlockProps } from './types'

// import classes from './index.module.scss'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = props => {
  const {
    introContent,
    id,
    relationTo,
    populateBy,
    limit,
    showPageRange,
    populatedDocs,
    populatedDocsTotal,
    categories,
  } = props

  return (
    <div id={`block-${id}`} className="relative">
      {introContent && introContent.root.children[0].children[0].text !== '' && (
        <RichText content={introContent} />
      )}
      <CollectionArchive
        populateBy={populateBy}
        relationTo={relationTo}
        populatedDocs={populatedDocs}
        populatedDocsTotal={populatedDocsTotal}
        categories={categories}
        limit={limit}
        showPageRange={showPageRange}
        sort="-publishedAt"
      />
    </div>
  )
}
