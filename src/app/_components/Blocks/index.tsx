/* eslint-disable import/no-cycle */
'use client'
import React, { Fragment } from 'react'

import {
  ArchiveBlock as ArchiveBlockType,
  CallToActionBlock as CallToActionBlockType,
  CodeBlock as CodeBlockType,
  MediaBlock as MediaBlockType,
} from '../../../payload/payload-types'
import { ArchiveBlock } from '../../_blocks/ArchiveBlock'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import { CodeBlock } from '../../_blocks/CodeBlock'
import { MediaBlock } from '../../_blocks/MediaBlock'
import { toKebabCase } from '../../_utilities/toKebabCase'

interface BlocksProps {
  blocks: (ArchiveBlockType | CallToActionBlockType | CodeBlockType | MediaBlockType)[]
  topPadding?: boolean
  bottomPadding?: boolean
}

export const Blocks: React.FC<BlocksProps> = props => {
  const { topPadding = false, bottomPadding = false, blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, i) => {
          const { blockName, blockType } = block
          switch (blockType) {
            case 'cta':
              return <CallToActionBlock key={i} id={toKebabCase(blockName)} {...block} />
            case 'mediaBlock':
              return <MediaBlock key={i} id={toKebabCase(blockName)} {...block} />
            case 'archive':
              return <ArchiveBlock key={i} id={toKebabCase(blockName)} {...block} />
            case 'code':
              return <CodeBlock key={i} id={toKebabCase(blockName)} {...block} />
            default:
              return null
          }
        })}
      </Fragment>
    )
  }

  return null
}
