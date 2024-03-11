import React, { Fragment } from 'react'

import { ProjectHero as ProjectHeroType } from '../../../../payload/payload-types'
import { usePage } from '../../../_providers/Context/pageContext'
import { CMSLink } from '../../Link'
import RichText from '../../RichText/static'

type ProjectHeroProps = ProjectHeroType & {
  className?: string
}

export const ProjectHero: React.FC<ProjectHeroProps> = props => {
  const { className = '', year, client, usePostDescription, customDescription, links } = props
  const pageContext = usePage()

  return (
    <div className={className}>
      <h2 className="text-2xl">{year && typeof year === 'number' && year.toString()}</h2>
      {usePostDescription ? (
        <h3 className="my-3 text-md">{pageContext.description && pageContext.description}</h3>
      ) : (
        <RichText className="my-3 text-md" content={customDescription} />
      )}
      {Array.isArray(links) && links.length > 0 && (
        <div className="w-full justify-center mt-5 flex xl:flex-col items-center xl:items-start">
          <h3 className="invisible w-0 xl:visible xl:w-auto">Links:</h3>
          {links.map((link, i) => {
            const { label, newTab, reference, type, url } = link.link // Assuming 'link.link' is the correct path to your link object
            return (
              <CMSLink
                className="mx-2 xl:mx-0 my-1 xl:my-2 hover:underline-offset-4 hover:underline"
                key={i} // Consider using a more unique key if possible, e.g., an id from your link data
                label={label}
                newTab={newTab}
                reference={reference}
                type={type}
                url={url}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
