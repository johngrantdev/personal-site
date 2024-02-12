/* eslint-disable import/no-cycle */
'use client'
import React, { Fragment } from 'react'

import { HiddenLayout } from '../../../payload/payload-types'
import { ArchiveBlock } from '../../_blocks/ArchiveBlock'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import { MediaBlock } from '../../_blocks/MediaBlock'
import { RelatedPosts, type RelatedPostsProps } from '../../_blocks/RelatedPosts'
import { toKebabCase } from '../../_utilities/toKebabCase'

const blockComponents = {
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  archive: ArchiveBlock,
  relatedPosts: RelatedPosts,
}

export const Blocks: React.FC<{
  blocks: HiddenLayout['layout'][0][]
  topPadding?: boolean
  bottomPadding?: boolean
}> = props => {
  const { topPadding = false, bottomPadding = false, blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            let defaultTopPadding = true
            let defaultBottomPadding = true
            if (index === 0 && !topPadding) {
              defaultTopPadding = false
            }
            if (index === blocks.length - 1 && !bottomPadding) {
              defaultBottomPadding = false
            }

            if (Block) {
              return <Block key={index} id={toKebabCase(blockName)} {...block} />
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
