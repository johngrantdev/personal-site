import React from 'react'

import { Post, PostArchive } from '../../../payload/payload-types'
import { CardStatic } from '../Card/static'
import { PageRange } from '../PageRange'
import { Pagination } from '../Pagination'

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
  populatedDocs?: PostArchive['populatedDocs']
  populatedDocsTotal?: PostArchive['populatedDocsTotal']
  category?: PostArchive['category']
}

export const CollectionArchive: React.FC<Props> = props => {
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

  return (
    <div className={[className].filter(Boolean).join(' ')}>
      <div className="absolute left-0 top-[-24]" />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
        {docs &&
          docs?.map((doc, index) => {
            return (
              <div key={index}>
                <CardStatic index={index} relationTo="posts" doc={doc} showCategory />
              </div>
            )
          })}
      </div>
    </div>
  )
}
