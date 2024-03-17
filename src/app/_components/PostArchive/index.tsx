import { Post, PostArchive as PostArchiveType } from "../../../payload/payload-types"
import { CollectionArchive } from "../CollectionArchive"

import React from 'react'

type Result = {
  totalDocs: number
  docs: Post[]
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  nextPage: number
  prevPage: number
}

export type Props = {
    className?: string
    relationTo?: 'posts'
    populateBy?: 'collection' | 'selection'
    showPageRange?: boolean
    onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
    sort?: string
    limit?: number
    populatedDocs?: PostArchiveType['populatedDocs']
    populatedDocsTotal?: PostArchiveType['populatedDocsTotal']
    category?: PostArchiveType['category']
  }

export const PostArchive: React.FC<Props> = props => {
    const {
      className,
      relationTo,
      showPageRange,
      onResultChange,
      sort = '-createdAt',
      limit = 12,
      populatedDocs,
      populatedDocsTotal,
      category: catFromProps,
      populateBy,
    } = props
  
    const docs = (populatedDocs?.map(doc => doc.value) as Post[]) || []

    return <CollectionArchive className={className} showPageRange={showPageRange} onResultChange={onResultChange} sort={sort} limit={limit} docs={docs} docsTotal={populatedDocsTotal} />
  }