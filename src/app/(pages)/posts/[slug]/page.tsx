import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { fetchComments } from '../../../../../_trash/fetchComments'
import { Artifact } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { PremiumContent } from '../../../_components/PremiumContent'
import { ArtifactHero } from '../../../_heros/ArtifactHero'
import { generateMeta } from '../../../_utilities/generateMeta'

// Force this page to be dynamic so that Next.js does not cache it
// See the artifact in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Artifact({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let artifact: Artifact | null = null

  try {
    artifact = await fetchDoc<Artifact>({
      collection: 'artifacts',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!artifact) {
    notFound()
  }

  const comments = await fetchComments({
    doc: artifact?.id,
  })

  const { layout, relatedArtifacts, enablePremiumContent, premiumContent } = artifact

  return (
    <React.Fragment>
      <ArtifactHero artifact={artifact} />
      <Blocks blocks={layout} />
      {enablePremiumContent && <PremiumContent artifactSlug={slug as string} disableTopPadding />}
      <Blocks
        disableTopPadding
        blocks={[
          {
            blockType: 'relatedArtifacts',
            blockName: 'Related Artifacts',
            relationTo: 'artifacts',
            introContent: [
              {
                type: 'h4',
                children: [
                  {
                    text: 'Related artifacts',
                  },
                ],
              },
              {
                type: 'p',
                children: [
                  {
                    text: 'The artifacts displayed here are individually selected for this page. Admins can select any number of related artifacts to display here and the layout will adjust accordingly. Alternatively, you could swap this out for the "Archive" block to automatically populate artifacts by category complete with pagination. To manage related artifacts, ',
                  },
                  {
                    type: 'link',
                    url: `/admin/collections/artifacts/${artifact.id}`,
                    children: [
                      {
                        text: 'navigate to the admin dashboard',
                      },
                    ],
                  },
                  {
                    text: '.',
                  },
                ],
              },
            ],
            docs: relatedArtifacts,
          },
        ]}
      />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const artifacts = await fetchDocs<Artifact>('artifacts')
    return artifacts?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let artifact: Artifact | null = null

  try {
    artifact = await fetchDoc<Artifact>({
      collection: 'artifacts',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: artifact })
}
