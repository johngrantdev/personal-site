import React, { useEffect, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

import { TOCItem, usePage } from '../../_providers/Context/Page/pageContext'
// eslint-disable-next-line import/no-cycle
import serialize from './serialize'

interface RichTextProps {
  content: any
  className?: string
  hasTOC?: boolean
}

const RichText: React.FC<RichTextProps> = ({ className, content, hasTOC = false }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [displayContent, setDisplayContent] = useState(true)
  const [serializedContent, setSerializedContent] = useState<React.ReactNode>(null)
  const { setTableOfContents } = usePage()

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

    let tocItems: TOCItem[] = []
    const collectTOCItem = (item: TOCItem) => {
      tocItems.push(item)
    }

    if (content && content.root) {
      const serializedResult = serialize(content.root.children, collectTOCItem)
      setSerializedContent(serializedResult)
      if (hasTOC) {
        setTableOfContents(tocItems)
      }
    }

    return () => {
      setDisplayContent(false)
    }
  }, [content, hasTOC, setTableOfContents])

  if (!isMounted) {
    return null
  }

  return (
    <animated.div
      style={fade}
      className={['first:mt-0 last:mb-0', className].filter(Boolean).join(' ')}
    >
      {serializedContent}
    </animated.div>
  )
}

export default RichText
