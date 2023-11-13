import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'
import { VerticalPadding } from '../../_components/VerticalPadding'

// import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links, richText, invertBackground }) => {
  return (
    <Gutter>
      {/* need to add dark theme */}
      <VerticalPadding className="px-14 relative bg-zinc-300 text-zinc-800">
        <div className="flex gap-14 items-center">
          <div className="flex-grow">
            {/* add richText Styling */}
            <RichText content={richText} />
          </div>
          {/* todo implement the sass logic for margin-bottom */}
          <div className="flex flex-col justify-center h-full flex-shrink-0 ">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} {...link} invert={invertBackground} />
            })}
          </div>
        </div>
      </VerticalPadding>
    </Gutter>
  )
}
