import type { ArrayField } from 'payload'
import type { Field } from 'payload'

import deepMerge from '../utilities/deepMerge'
import type { LinkAppearances } from './link'
import link from './link'

type LinkGroupType = (options?: {
  overrides?: Partial<ArrayField>
  appearances?: LinkAppearances[] | false
}) => Field

const linkGroup: LinkGroupType = ({ overrides = {}, appearances } = {}) => {
  const generatedLinkGroup: Field = {
    // abbreviated: nests inside layout groups, see fields/layout.ts
    name: 'lnks',
    type: 'array',
    interfaceName: 'LinkGroupField',
    fields: [
      link({
        appearances,
      }),
    ],
  }

  return deepMerge(generatedLinkGroup, overrides)
}

export default linkGroup
