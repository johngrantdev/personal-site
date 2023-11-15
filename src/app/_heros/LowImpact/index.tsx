import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import RichText from '../../_components/RichText'
import { VerticalPadding } from '../../_components/VerticalPadding'

export const LowImpactHero: React.FC<Page['hero']> = ({ richText }) => {
  return (
    // add lowImpactHero styles
    <Gutter>
      {/* add content styles */}
      <div>
        <VerticalPadding>
          {/* add richText styles */}
          <RichText content={richText} />
        </VerticalPadding>
      </div>
    </Gutter>
  )
}
