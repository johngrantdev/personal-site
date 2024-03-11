/* eslint-disable import/no-cycle */
import React from 'react'

import { CallToActionBlock as CallToActionBlockType } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText/static'

// import classes from './index.module.scss'

type Props = CallToActionBlockType & {
  id?: number | string
}

export const CallToActionBlock: React.FC<Props> = ({ id, links, richText, invertBackground }) => {
  return (
    <div
      id={id}
      className="px-6 pt-6 flex gap-14 items-center dark:bg-zinc-800 bg-zinc-600 text-zinc-100 rounded-lg drop-shadow-xl"
    >
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
