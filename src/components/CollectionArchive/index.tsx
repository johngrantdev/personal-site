import React from 'react'
import { cn } from '@/utilities/ui'
import type { Post } from '@/payload-types'
import { Card } from '@/components/Card'

export type Result = {
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
  onResultChange?: (result: Result) => void
  sort?: string
  limit?: number
  docs?: Post[]
  docsTotal?: number
}

export const CollectionArchive: React.FC<Props> = ({
  className,
  docs
}) => {
  return (
    <div className={cn(className)}>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
        {docs?.map((doc, index) => (
          <div key={index}>
            <Card relationTo="posts" doc={doc} showCategories />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionArchive
