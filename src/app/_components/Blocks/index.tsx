'use client'
import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types.js'
import { ArchiveBlock } from '../../_blocks/ArchiveBlock'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import { ContentBlock } from '../../_blocks/Content'
import { MediaBlock } from '../../_blocks/MediaBlock'
import { RelatedPosts, type RelatedPostsProps } from '../../_blocks/RelatedPosts'
import { toKebabCase } from '../../_utilities/toKebabCase'
import { Padding } from '../Padding'

const blockComponents = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  archive: ArchiveBlock,
  relatedPosts: RelatedPosts,
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0] | RelatedPostsProps)[]
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
              return (
                <Padding key={index} top={topPadding} bottom={bottomPadding}>
                  {/* @ts-expect-error */}
                  <Block id={toKebabCase(blockName)} {...block} />
                </Padding>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
