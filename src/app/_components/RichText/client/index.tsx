'use client'
import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

import { TOCItem, usePage } from '../../../_providers/Context/pageContext'

interface RichTextProps {
  children: React.ReactNode
  className?: string
  tableOfContents: TOCItem[]
}

export const RichTextClient: React.FC<RichTextProps> = ({
  children,
  className = '',
  tableOfContents,
}) => {
  const { setTableOfContents } = usePage()
  useEffect(() => {
    setTableOfContents(tableOfContents)
  }, [tableOfContents, setTableOfContents])

  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [])

  const fade = useSpring({
    opacity: load ? 1 : 0,
    from: { opacity: 0 },
    config: { tension: 280, friction: 60 },
  })

  return (
    <animated.div style={fade} className={className}>
      {children}
    </animated.div>
  )
}
