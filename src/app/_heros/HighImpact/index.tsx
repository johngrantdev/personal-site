import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import { Padding } from '../../_components/Padding'
import RichText from '../../_components/RichText'

// todo: update styles with mid-break behavior from old sass styles

export const HighImpactHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  return (
    <Padding className="pt-12 relative overflow-hidden">
      <div className="relative">
        <RichText content={richText} />
        {Array.isArray(links) && links.length > 0 && (
          // link styles sass has more margin nuance
          <ul className="list-none m-0 p-0 pt-6 flex flex-wrap">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="w-full mt-6 relative">
        {typeof media === 'object' && (
          <Fragment>
            {/* add image styles 
            imgClassName={classes.image}
            not defined in sass ?
            */}
            <Media
              resource={media}
              // fill
              // imgClassName={''}
              priority
            />
            {media?.caption && (
              <RichText
                content={media.caption}
                className="mt-6 text-zinc-700 left-24 w-full relative"
              />
            )}
          </Fragment>
        )}
      </div>
    </Padding>
  )
}
