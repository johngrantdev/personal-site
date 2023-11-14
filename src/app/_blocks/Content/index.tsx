import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'

// import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'content' }>

export const ContentBlock: React.FC<
  Props & {
    id?: string
  }
> = props => {
  const { columns } = props

  return (
    // add content styling
    <Gutter>
      {/* add grid styling */}
      <div className="grid grid-cols-3 gap-6">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, richText, link, size } = col

            return (
              // add column and column--${size} styling
              <div className="" key={index}>
                <RichText content={richText} />
                {/* add link styling */}
                {enableLink && <CMSLink className="mt-6" {...link} />}
              </div>
            )
          })}
      </div>
    </Gutter>
  )
}
