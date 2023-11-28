import React from 'react'

import { ArchiveBlock as ArchiveBlockType } from '../../../payload/payload-types'
import { CollectionArchive } from '../../_components/CollectionArchive'
import RichText from '../../_components/RichText'

export type ArchiveBlockProps = ArchiveBlockType & {
  id?: string
}

export const ArchiveBlock: React.FC<ArchiveBlockProps> = props => {
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
