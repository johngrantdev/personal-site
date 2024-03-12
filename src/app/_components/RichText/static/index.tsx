import React from 'react'

import { TOCItem } from '../../../_providers/Context/pageContext'
import { RichTextClient } from '../client'
// eslint-disable-next-line import/no-cycle
import serialize from '../serialize'

interface RichTextProps {
  content: any
  className?: string
  hasTOC?: boolean
}

const RichText: React.FC<RichTextProps> = ({ className = '', content, hasTOC = false }) => {
  let tocItems: TOCItem[] = []
  const collectTOCItem = (item: TOCItem) => {
    tocItems.push(item)
  }

  if (content && content.root) {
    const serializedResult = serialize(content.root.children, collectTOCItem)
  }

  const serializedRichText = content && content.root ? serialize(content.root.children) : null

  return (
    <RichTextClient
      className={`first:mt-0 last:mb-0 ${className}`}
      tableOfContents={hasTOC && tocItems}
      content={serializedRichText}
    />
  )
}

export default RichText
