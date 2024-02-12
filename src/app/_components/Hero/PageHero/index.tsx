import React, { Fragment } from 'react'

import { Hero as HeroType } from '../../../../payload/payload-types'
import { CMSLink } from '../../Link'
import { Media } from '../../Media'
import RichText from '../../RichText'

type PageHeroProps = HeroType & {
  className?: string
}

export const PageHero: React.FC<PageHeroProps> = props => {
  const { className = '', media, description, links } = props

  return (
    <div className={className}>
      {media && <Media className="pb-4" />}
      <RichText className="py-0 mt-0" content={description} />
      <div className="w-full justify-center mt-5 flex lg:flex-col items-center lg:items-start">
        {Array.isArray(links) &&
          links.length > 0 &&
          links.map((link, i) => (
            <CMSLink className=" mx-2 lg:mx-0 my-1 lg:my-2" key={i} {...link.link} />
          ))}
      </div>
    </div>
  )
}