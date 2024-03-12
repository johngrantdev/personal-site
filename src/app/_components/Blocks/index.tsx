/* eslint-disable import/no-cycle */
import React, { Fragment } from 'react'

import {
  CallToActionBlock as CallToActionBlockType,
  CodeBlock as CodeBlockType,
  MediaBlock as MediaBlockType,
  VimeoBlock as VimeoBlockType,
} from '../../../payload/payload-types'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import { CodeBlock } from '../../_blocks/CodeBlock'
import { MediaBlock } from '../../_blocks/MediaBlock'
import { VimeoBlock } from '../../_blocks/VimeoBlock'
import { toKebabCase } from '../../_utilities/toKebabCase'

interface BlocksProps {
  blocks: (CallToActionBlockType | CodeBlockType | MediaBlockType | VimeoBlockType)[]
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
            case 'code':
              return <CodeBlock key={i} id={toKebabCase(blockName)} {...block} />
            case 'vimeoBlock':
              return <VimeoBlock key={i} id={toKebabCase(blockName)} {...block} />
            default:
              return null
          }
        })}
      </Fragment>
    )
  }

  return null
}
