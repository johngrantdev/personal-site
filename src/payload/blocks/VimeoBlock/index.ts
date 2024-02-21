import type { Block } from 'payload/types'

export const VimeoBlock: Block = {
  slug: 'vimeoBlock',
  interfaceName: 'VimeoBlock',
  fields: [
    {
      name: 'videoId',
      type: 'text',
    },
    {
      name: 'previewImage',
      label: 'Preview Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
