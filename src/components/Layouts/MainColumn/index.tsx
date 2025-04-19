import React from 'react'

import { MainColumn as MainColumnType } from '@/payload-types'
import { PostArchive } from '@/components/PostArchive'
import RichTextWithTOCAndAnimation from '@/components/RichText/WithTOCAndAnimation'
import RichTextWithAnimation from '@/components/RichText/WithAnimation'

export type MainColumnProps = MainColumnType & {
  hasTOC?: boolean
}

export const MainColumn: React.FC<MainColumnProps> = props => {
  const { style, postArchive, column1, column2, hasTOC = false } = props

  const RichTextComponent = hasTOC ? RichTextWithTOCAndAnimation : RichTextWithAnimation

  switch (style) {
    case 'postArchive':
      return <PostArchive className="w-full" {...postArchive} />
    case 'singleLayout':
      return <RichTextComponent className="w-full" data={column1} />
    case 'twoColumns':
      return (
        <>
          <RichTextComponent className="w-1/2" data={column1} />
          <RichTextComponent className="w-1/2" data={column2} />
        </>
      )
    default:
      return null
  }
}
