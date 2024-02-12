'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'

import { Post } from '../../../payload/payload-types'
import MouseContext from '../../_providers/Context/Page/mouseContext'
import { formatDateTime } from '../../_utilities/formatDateTime'
import { generateColourGradient } from '../../_utilities/generateColourGradient'
import { Media } from '../Media'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategory?: boolean
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

  const { slug, title, description, publishedAt, keywords = [], card } = doc || {}

  const hasKeywords = keywords && Array.isArray(keywords) && keywords.length > 0
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`
  const publishedDate = formatDateTime(publishedAt)

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

  const mousePosition = useContext(MouseContext)
  const cardRef = useRef<HTMLDivElement>(null)
  const [localMousePosition, setLocalMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      // Calculate mouse position relative to the card
      const x = ((mousePosition.x - rect.left) / rect.width) * 100
      const y = ((mousePosition.y - rect.top) / rect.height) * 100
      setLocalMousePosition({ x, y })
    }
  }, [mousePosition])

  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  const animationDuration = 400
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, (animationDuration * (index + 1)) / 8)
  }, [index])

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

  const gradientStops = generateColourGradient(card.backgroundColour, 5, 10)

  const backgroundStyle = {
    backgroundImage: `radial-gradient(circle 1000px at ${localMousePosition.x}% ${
      localMousePosition.y
    }%, ${Object.values(gradientStops).join(', ')})`,
  }

  return (
    <animated.div
      ref={cardRef}
      style={{
        ...fadeIn,
        ...backgroundStyle,
      }}
      className={[
        `relative rounded-xl overflow-hidden drop-shadow-md h-full aspect-video md:aspect-square transition-transform ${
          hover ? 'scale-[1.02]' : 'scale-100'
        }`,
        className,
        orientation && appearanceStyle,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {card.media && typeof card.media !== 'string' && typeof card.media !== 'number' && (
        <>
          <Media
            imgClassName={`absolute inset-0 z-[-2] object-cover transition-all duration-300 ${
              hover ? 'blur-sm scale-110' : 'scale-105'
            }`}
            resource={card.media}
            fill
          />
          <div
            style={{
              ...backgroundStyle,
              backgroundBlendMode: 'difference',
            }}
            className={`absolute inset-0 z-[-1] transition-all duration-300 opacity-0
            ${card.overlayImage && 'opacity-80'} ${hover && 'opacity-60'}`}
          />
        </>
      )}
      <Link href={href}>
        <div
          className={`px-2 py-6 h-full flex flex-col text-center text-zinc-300`}
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`flex-1 flex w-full py-3 items-center justify-center transition-opacity duration-500 ${
              hoverDelayed ? 'opacity-100' : 'opacity-0'
            } ${hover ? 'h-full' : 'h-12'}`}
          >
            {card.showDate && publishedDate}
          </div>
          {titleToUse && (
            <div className="flex-none w-full h-fit items-center justify-center">
              <h1 className=" text-2xl">{titleToUse}</h1>
            </div>
          )}
          <div
            className={`flex-1 flex py-3 flex-col items-center justify-center transition-all duration-700 ${
              hoverDelayed ? 'opacity-100' : 'opacity-0'
            } ${hover ? 'h-full' : 'h-12'}`}
          >
            <div className="flex h-full w-full items-center justify-center content-center">
              {description}
            </div>
            {hasKeywords && (
              <div className="flex items-center justify-center h-min w-full content-center text-xs pt-3">
                {keywords
                  // eslint-disable-next-line prettier/prettier
                    .map(
                    keyword =>
                      // eslint-disable-next-line prettier/prettier
                        typeof keyword === 'object' && 'title' in keyword ? keyword.title : keyword,
                    // eslint-disable-next-line function-paren-newline
                  )
                  .join(', ')}
              </div>
            )}
          </div>
        </div>
      </Link>
    </animated.div>
  )
}
