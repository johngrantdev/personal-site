import React from 'react'
import { StaticImageData } from 'next/image'

import { MediaBlock as MediaBlockType } from '../../../payload/payload-types'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

type Props = MediaBlockType & {
  staticImage?: StaticImageData
  id?: number
}

export const MediaBlock: React.FC<Props> = props => {
  const { media, staticImage } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className="relative">
      <Media resource={media} src={staticImage} />
      {caption && (
        // add caption styling
        <RichText content={caption} />
      )}
    </div>
  )
}
