'use client'

import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'

import { Post } from '../../../payload/payload-types'
import { Media } from '../Media'

// import classes from './index.module.scss'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  relationTo?: 'posts'
  doc?: Post
  orientation?: 'horizontal' | 'vertical'
  index?: number
}> = props => {
  const {
    relationTo,
    title: titleFromProps,
    doc,
    className,
    orientation = 'vertical',
    index = 0,
  } = props

  const { slug, title, keywords = [], meta } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasKeywords = keywords && Array.isArray(keywords) && keywords.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  let appearanceStyle
  const orientationStyle = (orientation: string) => {
    switch (orientation) {
      case 'vertical':
        appearanceStyle = 'flex-col'
        break
      case 'horizontal':
        appearanceStyle = 'flex-row'
        break
      default:
        appearanceStyle = 'flex-col'
    }
  }
  orientationStyle(orientation)

  const [hover, setHover] = useState(false)
  const [hoverDelayed, setHoverDelayed] = useState(false)

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  const animationDuration = 400
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => {
      setLoaded(true)
    }, (animationDuration * (index + 1)) / 8)
  }, [])
  useEffect(() => {
    let timeoutId

    if (hover) {
      timeoutId = setTimeout(() => {
        setHoverDelayed(true)
      }, 300)
    } else {
      setHoverDelayed(false)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [hover])

  const fadeIn = useSpring({
    opacity: loaded ? 1 : 0,
    config: { duration: animationDuration },
  })

  return (
    <animated.div
      style={fadeIn}
      className={[
        'relative rounded-xl overflow-hidden drop-shadow-md bg-zinc-900 h-full aspect-square',
        className,
        orientation && appearanceStyle,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {metaImage && typeof metaImage !== 'string' && (
        <Media
          className=""
          imgClassName={`absolute inset-0 z-[-1] object-cover transition-all duration-300 ${
            hover ? 'opacity-50 blur-sm' : 'opacity-100'
          }`}
          resource={metaImage}
          fill
        />
      )}
      <Link href={href}>
        <div
          className="p-4 h-full flex-grow flex flex-col text-zinc-300 "
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`flex w-full h-full items-center justify-center transition-opacity duration-500 ${
              hoverDelayed ? 'opacity-50' : 'opacity-0'
            }`}
          />
          {titleToUse && (
            <div className="flex w-full h-fit p-6 items-center justify-center">
              <h1 className=" text-2xl">{titleToUse}</h1>
            </div>
          )}
          <div
            className={`flex flex-col items-center h-full justify-center transition-opacity duration-500 ${
              hoverDelayed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex h-full w-full items-center justify-center content-center">
              {description && sanitizedDescription}
            </div>
            <div className="flex items-center justify-center h-full w-full content-center">
              {hasKeywords ? keywords.map(keyword => keyword.title).join(', ') : null}
            </div>
          </div>
        </div>
      </Link>
    </animated.div>
  )
}
