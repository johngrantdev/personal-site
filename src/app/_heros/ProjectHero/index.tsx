import React, { Fragment } from 'react'
import Link from 'next/link'

import { Project } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import { formatDateTime } from '../../_utilities/formatDateTime'

export const ProjectHero: React.FC<{
  project: Project
}> = ({ project }) => {
  const { id, title, categories, meta: { image: metaImage, description } = {}, createdAt } = project

  return (
    <Fragment>
      {/* add projectHero styles */}
      <Gutter>
        {/* add content styles */}
        <div>
          {/* add leader styles */}
          <div>
            {/* add categories styles */}
            <div>
              {createdAt && formatDateTime(createdAt)}
              &nbsp; &mdash; &nbsp;
              {categories?.map((category, index) => {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {titleToUse}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              })}
            </div>
          </div>
          {/* add title styles */}
          <h1>{title}</h1>
          <div>
            {/* add description styles */}
            <p>
              {`${description ? `${description} ` : ''}To edit this project, `}
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/projects/${id}`}>
                navigate to the admin dashboard
              </Link>
              {'.'}
            </p>
          </div>
        </div>
        {/* add media styles */}
        <div>
          {/* add mediaWrapper styles */}
          <div>
            {/* add placeholder stlyes */}
            {!metaImage && <div>No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              // add image styles to imgClassName done?
              <Media imgClassName="object-cover" resource={metaImage} fill />
            )}
          </div>
          {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
            // add caption styles
            <RichText content={metaImage.caption} />
          )}
        </div>
      </Gutter>
    </Fragment>
  )
}
