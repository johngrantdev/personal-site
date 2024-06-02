import type { ArrayField } from 'payload/dist/fields/config/types'
import type { FieldWithRichTextRequiredEditor } from 'payload/types'

import type { LinkAppearances } from './link'

import deepMerge from '../utilities/deepMerge'
import link from './link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => FieldWithRichTextRequiredEditor

const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: FieldWithRichTextRequiredEditor = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
      }),
    ],
    interfaceName: 'LinkGroupField',
  }

  return deepMerge(generatedLinkGroup, overrides)
}

export default linkGroup
