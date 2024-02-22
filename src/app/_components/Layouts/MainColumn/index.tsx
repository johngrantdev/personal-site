import React from 'react'

import { MainColumn as MainColumnType } from '../../../../payload/payload-types'
import RichText from '../../RichText'

export type MainColumnProps = MainColumnType

export const MainColumn: React.FC<MainColumnProps> = props => {
  const { style, column1, column2 } = props

  switch (style) {
    case 'singleLayout':
      return <RichText className="w-full" content={column1} />
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
