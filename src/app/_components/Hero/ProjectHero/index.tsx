import React, { Fragment } from 'react'

import { ProjectHero as ProjectHeroType } from '../../../../payload/payload-types'
import { usePage } from '../../../_providers/Context/Page/pageContext'
import { CMSLink } from '../../Link'

type ProjectHeroProps = ProjectHeroType & {
  className?: string
}

export const ProjectHero: React.FC<ProjectHeroProps> = props => {
  const { className = '', year, client, links } = props
  const pageContext = usePage()

  return (
    <div className={className}>
      <h2 className="text-2xl">{year && typeof year === 'number' && year.toString()}</h2>
      <h3 className="my-3 text-md">{pageContext.description && pageContext.description}</h3>
      <div className="w-full justify-center mt-5 flex lg:flex-col items-center lg:items-start">
        <h3 className="invisible w-0 lg:visible lg:w-auto">Links:</h3>
        {Array.isArray(links) &&
          links.length > 0 &&
          links.map((link, i) => {
            const { label, newTab, reference, type, url } = link.link // Assuming 'link.link' is the correct path to your link object
            return (
              <CMSLink
                className="mx-2 lg:mx-0 my-1 lg:my-2 hover:underline-offset-4 hover:underline"
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
    </div>
  )
}
