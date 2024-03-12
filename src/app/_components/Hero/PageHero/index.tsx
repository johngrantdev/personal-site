import React, { Fragment } from 'react'

import { Hero as HeroType } from '../../../../payload/payload-types'
import { CMSLink } from '../../Link'
import { Media } from '../../Media'
import RichText from '../../RichText/static'

type PageHeroProps = HeroType & {
  className?: string
}

export const PageHero: React.FC<PageHeroProps> = props => {
  const { className = '', media, description, links } = props

  return (
    <div className={className}>
      {media && typeof media === 'object' && <Media className="pb-4" resource={media} />}
      <RichText className="py-0 mt-0" content={description} />
      <div className="w-full justify-center mt-5 flex xl:flex-col items-center xl:items-start">
        {Array.isArray(links) &&
          links.length > 0 &&
          links.map((link, i) => (
            <CMSLink className=" mx-2 xl:mx-0 my-1 xl:my-2" key={i} {...link.link} />
          ))}
      </div>
    </div>
  )
}
