import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = props => {
  const { richText, media, links } = props

  return (
    // add hero styles
    <Gutter>
      {/* add background styles */}
      <div>
        {/* add richText styles */}
        <RichText content={richText} />
        {Array.isArray(links) && (
          // add links styles
          <ul>
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  {/* add link styles */}
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {/* add media styles */}
      <div>
        {typeof media === 'object' && (
          // add media styles
          <Media resource={media} />
        )}
      </div>
    </Gutter>
  )
}
