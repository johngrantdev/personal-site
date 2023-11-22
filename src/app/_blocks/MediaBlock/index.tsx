import React from 'react'
import { StaticImageData } from 'next/image'

import { Page } from '../../../payload/payload-types'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

// import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  staticImage?: StaticImageData
  id?: string
}

export const MediaBlock: React.FC<Props> = props => {
  const { media, position = 'default', staticImage } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className="relative">
      {position === 'fullscreen' && (
        // add fullscreen styling
        <div className="">
          <Media resource={media} src={staticImage} />
        </div>
      )}
      {position === 'default' && <Media resource={media} src={staticImage} />}
      {caption && (
        // add caption styling
        <RichText content={caption} />
      )}
    </div>
  )
}
