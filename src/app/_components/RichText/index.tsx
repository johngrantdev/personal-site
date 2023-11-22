'use client'

import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

import serialize from './serialize'

const RichText: React.FC<{ className?: string; content: any }> = ({ className, content }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [displayContent, setDisplayContent] = useState(true)

  const fade = useSpring({
    opacity: displayContent ? 1 : 0,
    onRest: () => {
      if (!displayContent) setIsMounted(false)
    },
    from: { opacity: 0 },
    config: { tension: 280, friction: 60 },
  })

  useEffect(() => {
    setIsMounted(true)
    setDisplayContent(true)

    return () => {
      setDisplayContent(false)
    }
  }, [content])

  if (!isMounted) {
    return null
  }

  return (
    <animated.div
      style={fade}
      className={['first:mt-0 last:mb-0', className].filter(Boolean).join(' ')}
    >
      {content.root ? serialize(content.root.children) : null}
    </animated.div>
  )
}

export default RichText
