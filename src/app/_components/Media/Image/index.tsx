'use client'

import React, { Fragment, useEffect, useState } from 'react'
import NextImage, { StaticImageData } from 'next/image'
import { useTheme } from 'next-themes' // Import useTheme from next-theme

import { Media, Upload } from '../../../../payload/payload-types'
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

  const media = typeof resource === 'object' && (resource as Media)

  const { theme } = useTheme() // Use the useTheme hook
  const isDarkTheme = theme === 'dark'

  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= breakpoints.s)
    }

    updateScreenSize()

    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const [upload, setUpload] = useState<Upload | undefined>(media.media as Upload)

  useEffect(() => {
    let selectedUpload: Upload | undefined = media.media as Upload
    if (isMobile && isDarkTheme && media.mediaMobileDark) {
      selectedUpload = media.mediaMobileDark as Upload
    } else if (isMobile && media.mediaMobile) {
      selectedUpload = media.mediaMobile as Upload
    } else if (isDarkTheme && media.mediaDark) {
      selectedUpload = media.mediaDark as Upload
    }
    setUpload(selectedUpload)
  }, [isMobile, isDarkTheme, media])

  const isSVG = upload?.mimeType?.includes('svg')
  const [isLoading, setIsLoading] = useState(true)
  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && upload && typeof upload === 'object') {
    const { alt: altFromResource } = media as Media
    let updateFilename

    if (targetSize && upload.sizes[targetSize]) {
      const {
        width: targetWidth,
        height: targetHeight,
        filename: targetFilename,
      } = upload.sizes[targetSize] as Upload
      width = targetWidth
      height = targetHeight
      updateFilename = targetFilename
    } else {
      const {
        width: desktopWidth,
        height: desktopHeight,
        filename: desktopFileName,
      } = upload.sizes['desktop']
      width = desktopWidth
      height = desktopHeight
      updateFilename = desktopFileName
    }
    if (isSVG) {
      updateFilename = upload.filename
    }

    alt = altFromResource
    src = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${updateFilename}`
  }

  const sizes = Object.entries(breakpoints)
    .map(([, value]) => `(max-width: ${value}px) ${value}px`)
    .join(', ')

  return (
    <Fragment>
      {isSVG ? (
        <SVG imgClassName={imgClassName} upload={upload} src={src as string} alt={alt} />
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
