import type { GlobalConfig } from 'payload/types'

import { CallToAction } from '../blocks/CallToAction'
import { Code } from '../blocks/Code'
import { MediaBlock } from '../blocks/MediaBlock'
import { VimeoBlock } from '../blocks/VimeoBlock'

/**
 * Temporary Fix to ensure blocks are picked up on type generation
 * https://github.com/payloadcms/payload/pull/4529
 *
 * Remove when ^^ is merged
 */

export const HiddenLayout: GlobalConfig = {
  slug: 'hidden-layout',
  access: {
    read: () => false,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [CallToAction, MediaBlock, Code, VimeoBlock],
    },
  ],
}
