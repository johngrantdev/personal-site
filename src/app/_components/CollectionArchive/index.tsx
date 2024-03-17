import React from 'react'

import { Post } from '../../../payload/payload-types'
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
  docs?: Post[]
  docsTotal?: number
}

export const CollectionArchive: React.FC<Props> = props => {
  const {
    className,
    showPageRange,
    onResultChange,
    sort = '-createdAt',
    limit = 12,
    docs,
    docsTotal,
  } = props

  return (
    <div className={className}>
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
