import React, { Fragment } from 'react'

import { Upload } from '../../../payload/payload-types'
import { fetchUpload } from '../../_api/fetchUpload'
import { Image } from './Image'
import { Props } from './types'
import { Video } from './Video'

export const Media: React.FC<Props> = props => {
  const { className, resource, htmlElement = 'div' } = props

  if (typeof resource === 'object' && !resource.media) {
    return null
  }

  const isVideo =
    typeof resource === 'object' &&
    typeof resource.media !== 'number' &&
    resource.media?.mimeType?.includes('video')
  const Tag = (htmlElement as any) || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className: `${className} relative`,
          }
        : {})}
    >
      {isVideo ? <Video {...props} /> : <Image {...props} />}
    </Tag>
  )
}
