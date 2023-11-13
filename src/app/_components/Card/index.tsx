import React, { Fragment } from 'react'
import Link from 'next/link'

import { Artifact, Project } from '../../../payload/payload-types'
import { Media } from '../Media'

// import classes from './index.module.scss'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  relationTo?: 'projects' | 'artifacts'
  doc?: Project | Artifact
  orientation?: 'horizontal' | 'vertical'
}> = props => {
  const {
    relationTo,
    showCategories,
    title: titleFromProps,
    doc,
    className,
    orientation = 'vertical',
  } = props

  const { slug, title, categories, meta } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  let appearanceStyle
  const orientationStyle = (orientation: string) => {
    switch (orientation) {
      case 'vertical':
        appearanceStyle = 'flex-col'
        break
      case 'horizontal':
        appearanceStyle = 'flex-row'
        break
      default:
        appearanceStyle = 'flex-col'
    }
  }
  orientationStyle(orientation)

  return (
    <div
      className={[
        'border-2 rounded-sm h-full flex flex-col',
        className,
        orientation && appearanceStyle,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Link href={href} className="no-underline	block relative aspect-video">
        {!metaImage && (
          <div className="w-full h-full flex items-center justify-center">No image</div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName="object-cover" resource={metaImage} fill />
        )}
      </Link>
      <div className="p-6 flex-grow flex flex-col gap-3">
        {showCategories && hasCategories && (
          <div className="flex gap-6">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  const { title: titleFromCategory } = category

                  const categoryTitle = titleFromCategory || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <h4 className="m-0">
            <Link className="no-underline" href={href}>
              {titleToUse}
            </Link>
          </h4>
        )}
        {description && (
          <div className="flex-grow">
            {description && <p className="m-0">{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
