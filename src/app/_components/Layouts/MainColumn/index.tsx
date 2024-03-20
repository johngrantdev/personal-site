import React from 'react'

import { MainColumn as MainColumnType } from '../../../../payload/payload-types'
import RichText from '../../RichText/static'
import { PostArchive } from '../../PostArchive'

export type MainColumnProps = MainColumnType & {
  hasTOC?: boolean
}

export const MainColumn: React.FC<MainColumnProps> = props => {
  const { style, postArchive, column1, column2, hasTOC = false } = props

  switch (style) {
    case 'postArchive':
      return <PostArchive className="w-full" {...postArchive} />
    case 'singleLayout':
      return <RichText className="w-full" content={column1} hasTOC />
    case 'twoColumns':
      return (
        <>
          <RichText className="w-1/2" content={column1} />
          <RichText className="w-1/2" content={column2} />
        </>
      )
    default:
      return null
  }
}
