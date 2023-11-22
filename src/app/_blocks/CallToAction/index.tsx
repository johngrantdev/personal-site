import React from 'react'

import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'

// import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ links, richText, invertBackground }) => {
  return (
    <div className="px-6 py-12 flex gap-14 items-center dark:bg-zinc-900 bg-zinc-600 text-zinc-100 rounded-lg drop-shadow-xl">
      <div className="flex-grow">
        <RichText content={richText} />
      </div>
      <div className="flex flex-col justify-center h-full flex-shrink-0 ">
        {(links || []).map(({ link }, i) => {
          return <CMSLink key={i} {...link} invert={invertBackground} />
        })}
      </div>
    </div>
  )
}
