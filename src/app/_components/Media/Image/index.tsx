'use client'

import React, { Fragment } from 'react'
import NextImage, { StaticImageData } from 'next/image'

import { Media } from '../../../../payload/payload-types'
import cssVariables from '../../../cssVariables'
import { Props as MediaProps } from '../types'

const { breakpoints } = cssVariables

export const Image: React.FC<MediaProps> = props => {
  const {
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    resource,
    priority,
    fill,
    src: srcFromProps,
    alt: altFromProps,
  } = props

  const isSVG =
    typeof resource === 'object' && resource?.mimeType && resource.mimeType === 'image/svg+xml'

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const {
      width: fullWidth,
      height: fullHeight,
      filename: fullFilename,
      alt: altFromResource,
    } = resource as Media

    width = fullWidth
    height = fullHeight
    alt = altFromResource

    const filename = fullFilename

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = Object.entries(breakpoints)
    .map(([, value]) => `(max-width: ${value}px) ${value}px`)
    .join(', ')

  return (
    <Fragment>
      {isSVG ? (
        <object type="image/svg+xml" data={typeof src === 'string' ? src : ''} />
      ) : (
        <NextImage
          className={[isLoading && 'bg-zinc-600 dark:bg-zinc-300', imgClassName]
            .filter(Boolean)
            .join(' ')}
          src={src}
          alt={alt || ''}
          onClick={onClick}
          onLoad={() => {
            setIsLoading(false)
            if (typeof onLoadFromProps === 'function') {
              onLoadFromProps()
            }
          }}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          sizes={sizes}
          priority={priority}
        />
      )}
    </Fragment>
  )
}
