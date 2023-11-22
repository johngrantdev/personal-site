import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Padding } from '../../_components/Padding'
import RichText from '../../_components/RichText'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    <Padding>
      <RichText content={richText} />
    </Padding>
  )
}
