'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Media, Upload } from '../../../../../payload/payload-types'
import {
  adjustImageHrefs,
  applyThemeAdjustments,
  createForeignObject,
  parseTransform,
} from './utilities'

interface SVGProps {
  imgClassName: string
  upload: Upload
  src?: string
  alt: string
}

export const SVG: React.FC<SVGProps> = props => {
  const { imgClassName, upload, src: srcFromProps, alt: altFromProps } = props

  const media = typeof upload === 'object' && (upload as Upload)

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: string = srcFromProps || ''

  if (!src && media && typeof media === 'object') {
    const { width: fullWidth, height: fullHeight, filename: fullFilename } = media as Upload

    width = fullWidth
    height = fullHeight

    const filename = fullFilename

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`
  }

  const { theme } = useTheme()
  const [svgContent, setSvgContent] = useState('')
  const [uniqueId] = useState(`svg-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    const fetchAndProcessSVG = async () => {
      const response = await fetch(src.toString())
      const svgText = await response.text()
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
      const svgElement = svgDoc.documentElement

      svgElement.setAttribute('id', uniqueId)

      // Adjust <image> elements' hrefs, apply theme adjustments, and set main SVG styles
      adjustImageHrefs(svgDoc.querySelectorAll('image'))
      applyThemeAdjustments(svgDoc.querySelectorAll('style'), theme)
      svgElement.setAttribute('style', 'width: 100%; height: auto; max-width: 100%;')

      // Serialize and set SVG content
      const serializer = new XMLSerializer()
      const serializedSvg = serializer.serializeToString(svgElement)

      setSvgContent(serializedSvg)
    }

    fetchAndProcessSVG()
  }, [src, theme, uniqueId])

  // useEffect(() => {
  //   // Ensure SVG content is loaded in the DOM
  //   if (!svgContent) return

  //   let scaledFontSize = 18
  //   // Perform a DOM query to find the SVG element by a unique identifier, e.g., an id or class
  //   const svgElement = document.getElementById(uniqueId)
  //   if (!svgElement) {
  //     return
  //   } else {
  //     {
  //       const clientRects = svgElement.getClientRects()
  //       if (clientRects.length > 0) {
  //         const svgRenderedWidth = clientRects.item(0).width
  //         const svgInitial
  //   }

  //   const textElements = svgElement.querySelectorAll('text')
  //   textElements.forEach(text => {
  //     // Assuming the createForeignObject function is adapted to take an object of props
  //     const bbox = text.getBBox()

  //     // If you kept the transform parsing and application logic
  //     let transformX = 0,
  //       transformY = 0
  //     const transform = text.getAttribute('transform')
  //     if (transform && transform.includes('translate')) {
  //       const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/)
  //       if (match) {
  //         transformX = parseFloat(match[1])
  //         transformY = parseFloat(match[2])
  //       }
  //     }

  //     // Calculate final positions including transformations
  //     let x = bbox.x + transformX
  //     let y = bbox.y + transformY
  //     let width = bbox.width
  //     let height = 500
  //     const fontSize = scaledFontSize

  //     // Create and insert foreignObject
  //     createForeignObject({
  //       text,
  //       x: x,
  //       y: y,
  //       width: width,
  //       height: height,
  //       fontSize: fontSize,
  //     })
  //   })
  // }, [svgContent, uniqueId])

  return (
    <div
      className={`svg-container block w-full h-auto ${imgClassName}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}
