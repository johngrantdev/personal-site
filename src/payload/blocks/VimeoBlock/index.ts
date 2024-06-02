import type { LexicalBlock } from '@payloadcms/richtext-lexical'

export const VimeoBlock: LexicalBlock = {
  slug: 'vimeoBlock',
  fields: [
    {
      name: 'videoId',
      type: 'text',
    },
    {
      name: 'previewImage',
      type: 'upload',
      label: 'Preview Image',
      relationTo: 'media',
      required: false,
    },
  ],
  interfaceName: 'VimeoBlock',
}
