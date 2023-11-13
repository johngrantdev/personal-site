import React from 'react'

import { Artifact, Project } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Gutter } from '../../_components/Gutter'
import RichText from '../../_components/RichText'

// import classes from './index.module.scss'

export type RelatedArtifactsProps = {
  blockType: 'relatedArtifacts'
  blockName: string
  introContent?: any
  docs?: (string | Artifact | Project)[]
  relationTo: 'artifacts' | 'projects'
}

export const RelatedArtifacts: React.FC<RelatedArtifactsProps> = props => {
  const { introContent, docs, relationTo } = props

  return (
    // add relatedArtifacts styling
    <div>
      {introContent && (
        <Gutter className="relative mb-12">
          <RichText content={introContent} />
        </Gutter>
      )}
      <Gutter>
        {/* add grid styling */}
        <div className="grid grid-cols-12 w-full gap-10">
          {docs?.map((doc, index) => {
            if (typeof doc === 'string') return null

            return (
              // add column and docs.length === 2 -> cols half, >=3 -> cols-thirds styling
              <div key={index} className="col-end-12">
                <Card relationTo={relationTo} doc={doc} showCategories />
              </div>
            )
          })}
        </div>
      </Gutter>
    </div>
  )
}
