'use client'

import React, { Fragment, useEffect, useState } from 'react'
import NextImage, { StaticImageData } from 'next/image'
import { useTheme } from 'next-themes'

import { Media } from '../../../../../payload/payload-types'
import { Props as MediaProps } from '../../types'

export const SVG: React.FC<MediaProps> = props => {
  const {
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    resource,
    priority,
    fill,
    src: srcFromProps,
    alt: altFromProps,
    targetSize = 'desktop',
  } = props

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

  const { theme } = useTheme()
  const [svgContent, setSvgContent] = useState('')

  useEffect(() => {
    fetch(src.toString())
      .then(response => response.text())
      .then(svg => {
        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(svg, 'image/svg+xml')

        // Modify <image> elements
        const images = svgDoc.querySelectorAll('image')
        images.forEach(img => {
          const href = img.getAttribute('xlink:href')
          if (href) {
            const modifiedHref = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${href}`
            img.setAttribute('xlink:href', modifiedHref)
          }
        })

        // Check if the page is in dark mode
        if (theme === 'dark') {
          // Find and modify <style> elements only if in dark mode
          const styles = svgDoc.querySelectorAll('style')
          styles.forEach(style => {
            let cssText = style.textContent
            // Replace all instances of black with white in dark mode
            cssText = cssText
              .replace(/#000000/g, '#ffffff')
              .replace(/#000/g, '#ffffff')
              .replace(/black/g, 'white')
              .replace(/rgb\(0,\s*0,\s*0\)/g, 'rgb(255, 255, 255)')
            style.textContent = cssText
          })
        }

        // Get the SVG element and apply styles for responsiveness
        const svgElement = svgDoc.documentElement
        svgElement.setAttribute('style', 'width: 100%; height: auto; max-width: 100%;')

        // Serialize SVG back to string
        const serializer = new XMLSerializer()
        const serializedSvg = serializer.serializeToString(svgElement)
        setSvgContent(serializedSvg)
      })
  }, [src, theme])

  return <div className={`block w-full h-auto`} dangerouslySetInnerHTML={{ __html: svgContent }} />
}
