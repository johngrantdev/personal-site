import React, { Fragment } from 'react'
import Link from 'next/link'

import { Post } from '../../../payload/payload-types'
import { Media } from '../../_components/Media'
import { Padding } from '../../_components/Padding'
import RichText from '../../_components/RichText'
import { formatDateTime } from '../../_utilities/formatDateTime'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const {
    id,
    title,
    categories,
    meta: { image: metaImage, description } = {},
    publishedAt,
    populatedAuthors,
  } = post

  return (
    <Fragment>
      <Padding className="flex gap-12 ">
        <div className=" w-1/2 flex flex-col content-center items-start gap-6">
          <div className="flex gap-3">
            <div>
              {categories.title}
              {/* {categories?.map((category, index) => {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {titleToUse}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              })} */}
            </div>
          </div>
          <h1 className="m-0">{title}</h1>
          <p className="m-0">
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
            <p className="m-0">
              {`${description ? `${description} ` : ''}To edit this post, `}
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/posts/${id}`}>
                navigate to the admin dashboard
              </Link>
              {'.'}
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <div className=" no-underline hover:underline	block relative aspect-square mb-3">
            {!metaImage && (
              <div className="w-full h-full flex items-center content-center">No image</div>
            )}
            {metaImage && typeof metaImage !== 'string' && (
              <Media imgClassName="object-cover" resource={metaImage} fill />
            )}
          </div>
          {metaImage && typeof metaImage !== 'string' && metaImage?.caption && (
            <RichText content={metaImage.caption} />
          )}
        </div>
      </Padding>
    </Fragment>
  )
}
