import React, { Fragment } from 'react'
import Link from 'next/link'

import { Artifact } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import { formatDateTime } from '../../_utilities/formatDateTime'

export const ArtifactHero: React.FC<{
  artifact: Artifact
}> = ({ artifact }) => {
  const {
    id,
    title,
    categories,
    meta: { image: metaImage, description } = {},
    publishedAt,
    populatedAuthors,
  } = artifact

  return (
    <Fragment>
      {/* add artifactHero styles */}
      <Gutter>
        {/* add content styles */}
        <div>
          {/* add leader styles */}
          <div>
            {/* add categories styles */}
            <div>
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
          {/* add meta styles */}
          <p>
            {populatedAuthors && (
              <Fragment>
                {'By '}
                {populatedAuthors.map((author, index) => {
                  const { name } = author

                  const isLast = index === populatedAuthors.length - 1
                  const secondToLast = index === populatedAuthors.length - 2

                  return (
                    <Fragment key={index}>
                      {name}
                      {secondToLast && populatedAuthors.length > 2 && <Fragment>, </Fragment>}
                      {secondToLast && populatedAuthors.length === 2 && <Fragment> </Fragment>}
                      {!isLast && populatedAuthors.length > 1 && <Fragment>and </Fragment>}
                    </Fragment>
                  )
                })}
              </Fragment>
            )}
            {publishedAt && (
              <Fragment>
                {' on '}
                {formatDateTime(publishedAt)}
              </Fragment>
            )}
          </p>
          <div>
            {/* add description styles */}
            <p>
              {`${description ? `${description} ` : ''}To edit this artifact, `}
              <Link
                href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/artifacts/${id}`}
              >
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
            {/* add placeholder styles */}
            {!metaImage && <div>No image</div>}
            {metaImage && typeof metaImage !== 'string' && (
              // add image styles to imgClassName
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
