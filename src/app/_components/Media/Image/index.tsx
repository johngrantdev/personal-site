'use client'

import React, { Fragment } from 'react'
import NextImage, { StaticImageData } from 'next/image'

import { Media } from '../../../../payload/payload-types'
import cssVariables from '../../../cssVariables'
import { Props as MediaProps } from '../types'
import { SVG } from './SVG'

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
    targetSize,
  } = props

  const isSVG = typeof resource === 'object' && resource?.mimeType?.includes('svg')

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource } = resource as Media
    let updateFilename
    if (targetSize && resource.sizes[targetSize]) {
      const {
        width: targetWidth,
        height: targetHeight,
        filename: targetFilename,
      } = resource.sizes[targetSize] as Media
      width = targetWidth
      height = targetHeight
      updateFilename = targetFilename
    } else {
      const { width: fullWidth, height: fullHeight, filename: fullFilename } = resource as Media
      width = fullWidth
      height = fullHeight
      updateFilename = fullFilename
    }

    alt = altFromResource

    const filename = updateFilename

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = Object.entries(breakpoints)
    .map(([, value]) => `(max-width: ${value}px) ${value}px`)
    .join(', ')

  return (
    <Fragment>
      {isSVG ? (
        <SVG {...props} />
      ) : (
        <NextImage
          className={[
            isLoading && 'bg-zinc-600 dark:bg-zinc-300',
            imgClassName,
            'rounded-sm sm:rounded-md',
          ]
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
