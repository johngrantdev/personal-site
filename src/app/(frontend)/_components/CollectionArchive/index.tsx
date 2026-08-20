import React from 'react'

import { Post } from '@/payload/payload-types'
import { CardStatic } from '../Card/static'

export type Props = {
  className?: string
  docs?: Post[]
}

export const CollectionArchive: React.FC<Props> = ({ className, docs }) => (
  <div className={className}>
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3">
      {docs?.map((doc, index) => (
        <div key={index}>
          <CardStatic index={index} relationTo="posts" doc={doc} showCategory />
        </div>
      ))}
    </div>
  </div>
)
