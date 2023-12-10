import React from 'react'

import { ContentBlock as ContentBlockType } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'

// import classes from './index.module.scss'

export type ContentProps = ContentBlockType & {
  id?: number
}

export const ContentBlock: React.FC<ContentProps> = props => {
  const { columns } = props

  const getColSpan = size => {
    switch (size) {
      case 'oneThird':
        return 'col-span-4'
      case 'half':
        return 'col-span-6'
      case 'twoThirds':
        return 'col-span-8'
      case 'full':
        return 'col-span-12'
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {columns &&
        columns.length > 0 &&
        columns.map((col, index) => {
          const { enableLink, richText, link, size } = col
          const colSpan = getColSpan(size)
          return (
            <div className={colSpan} key={index}>
              <RichText content={richText} />
              {enableLink && <CMSLink className="mt-6" {...link} />}
            </div>
          )
        })}
    </div>
  )
}
