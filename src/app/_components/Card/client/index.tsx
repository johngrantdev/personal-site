'use client'

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Link from 'next/link'

import { Post } from '../../../../payload/payload-types'
import MouseContext from '../../../_providers/Context/mouseContext'
import { useScreen } from '../../../_providers/Context/screensContext'
import { Media } from '../../Media'

export const CardClient: React.FC<{
  className?: string
  title?: string
  description?: string
  publishedDate?: string
  keywords?: string
  index?: number
  loadDelay?: number
  card?: Post['card']
  href?: string
  gradientStops?: Record<number, string>
}> = props => {
  const {
    className,
    title,
    description,
    publishedDate,
    keywords,
    index = 0,
    loadDelay,
    card,
    href,
    gradientStops,
  } = props

  const { screen } = useScreen()

  const [hover, setHover] = useState(false)
  const [hoverDelayed, setHoverDelayed] = useState(false)

  const mousePosition = useContext(MouseContext)
  const cardRef = useRef<HTMLDivElement>(null)
  const [localMousePosition, setLocalMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    if (cardRef.current && screen.size > screen.breakpoints.md) {
      const rect = cardRef.current.getBoundingClientRect()
      // Calculate mouse position relative to the card
      const x = ((mousePosition.x - rect.left) / rect.width) * 100
      const y = ((mousePosition.y - rect.top) / rect.height) * 100
      setLocalMousePosition({ x, y })
    }
  }, [mousePosition])

  const handleMouseEnter = useCallback(() => setHover(true), [])
  const handleMouseLeave = useCallback(() => setHover(false), [])

  const animationDuration = 400
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), loadDelay)
    return () => clearTimeout(timer)
  }, [loadDelay])

  useEffect(() => {
    if (screen.size > screen.breakpoints.md) {
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
    }
  }, [hover])

  const fadeIn = useSpring({
    opacity: loaded ? 1 : 0,
    config: { duration: animationDuration },
  })

  const backgroundStyle = {
    backgroundImage: `radial-gradient(circle 1000px at ${localMousePosition.x}% ${
      localMousePosition.y
    }%, ${Object.values(gradientStops).join(', ')})`,
  }

  const imageTargetSize = useMemo(
    () => (screen.size < screen.breakpoints.md ? 'tablet' : 'card'),
    [screen.size, screen.breakpoints.md],
  )

  return (
    <animated.div
      ref={cardRef}
      style={{
        ...fadeIn,
        ...backgroundStyle,
      }}
      className={[
        `relative rounded-xl overflow-hidden drop-shadow-md h-full aspect-video md:aspect-square transition-transform safari-fix`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {card.media && (
        <>
          <Media
            imgClassName={`absolute inset-0 -z-20 object-cover transition-all duration-300 ${
              hover ? 'blur-sm scale-[1.15]' : 'scale-105'
            }`}
            resource={card.media}
            targetSize={imageTargetSize}
            priority
          />
          <div
            style={{
              ...backgroundStyle,
              backgroundBlendMode: 'difference',
            }}
            className={`absolute inset-0 -z-10 transition-all duration-300 opacity-0
            ${card.overlayImage && 'opacity-80'} ${hover && 'opacity-60'}`}
          />
        </>
      )}
      <Link href={href}>
        <div
          className={`px-2 py-6 h-full flex flex-col text-center text-sm text-zinc-300`}
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`flex-1 flex w-full py-2 items-center justify-center transition-opacity duration-500 ${
              hoverDelayed ? 'opacity-100' : 'opacity-0'
            } ${hover ? 'h-full' : 'h-12'}`}
          >
            {card.showDate && publishedDate}
          </div>
          {title && (
            <div
              className={`flex-none w-full h-fit items-center justify-center ${
                hover || card.overlayImage || !card.media
                  ? 'mix-blend-normal'
                  : ' mix-blend-exclusion'
              }`}
            >
              <h1
                className={`${
                  card.hideTitle && !hover ? 'opacity-0' : 'opacity-100'
                } transition-opacity duration-500 text-xl`}
              >
                {title}
              </h1>
            </div>
          )}
          <div
            className={`flex-1 flex py-2 flex-col items-center justify-center transition-all duration-700 ${
              hoverDelayed ? 'opacity-100' : 'opacity-0'
            } ${hover ? 'h-full' : 'h-12'}`}
          >
            <div className="flex h-full w-full items-center justify-center content-center">
              {description}
            </div>
            {keywords && (
              <div className="flex items-center justify-center h-min w-full content-center text-xs pt-3">
                {keywords}
              </div>
            )}
          </div>
        </div>
      </Link>
    </animated.div>
  )
}
