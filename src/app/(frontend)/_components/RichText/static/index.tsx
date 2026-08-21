import React from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

import { TOCItem } from '../../../_providers/Context/pageContext'
import { RichTextClient } from '../client'
import { extractTOC } from '../extractTOC'
import { jsxConverters } from '../converters'

interface RichTextProps {
  id?: string
  content: any
  className?: string
  hasTOC?: boolean
}

const RichText: React.FC<RichTextProps> = ({ className = '', id, content, hasTOC = false }) => {
  const tocItems = extractTOC(content)

  const serializedRichText = content?.root ? (
    <PayloadRichText data={content} converters={jsxConverters} disableContainer />
  ) : null

  return (
    <RichTextClient
      id={id}
      className={`first:mt-0 last:mb-0 ${className}`}
      tableOfContents={hasTOC && tocItems}
      content={serializedRichText}
    />
  )
}

export default RichText
