import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { artifact1 } from './artifact-1'
import { artifact2 } from './artifact-2'
import { artifact3 } from './artifact-3'
import { artifactsPage } from './artifact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { project1 } from './project-1'
import { project2 } from './project-2'
import { project3 } from './project-3'
import { projectsPage } from './projects-page'

const collections = ['categories', 'media', 'pages', 'artifacts', 'projects', 'comments']
const globals = ['header', 'settings', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not

  payload.logger.info(`— Clearing media...`)

  const mediaDir = path.resolve(__dirname, '../../media')
  if (fs.existsSync(mediaDir)) {
    fs.rmdirSync(mediaDir, { recursive: true })
  }

  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all([
    ...collections.map(async collection =>
      payload.delete({
        collection: collection as 'media',
        where: {},
      }),
    ), // eslint-disable-line function-paren-newline
    ...globals.map(async global =>
      payload.updateGlobal({
        slug: global as 'header',
        data: {},
      }),
    ), // eslint-disable-line function-paren-newline
  ])

  payload.logger.info(`— Seeding demo author and user...`)

  await Promise.all(
    ['demo-author@payloadcms.com', 'demo-user@payloadcms.com'].map(async email => {
      await payload.delete({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })
    }),
  )

  let [{ id: demoAuthorID }, { id: demoUserID }] = await Promise.all([
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo-author@payloadcms.com',
        name: 'Demo Author',
        password: 'password',
        roles: ['admin'],
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo-user@payloadcms.com',
        name: 'Demo User',
        password: 'password',
        roles: ['user'],
      },
    }),
  ])

  payload.logger.info(`— Seeding media...`)

  const [image1Doc, image2Doc] = await Promise.all([
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'image-1.jpg'),
      data: image1,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'image-2.jpg'),
      data: image2,
    }),
  ])

  payload.logger.info(`— Seeding categories...`)

  const [
    technologyCategory,
    newsCategory,
    financeCategory,
    designCat,
    softwareCat,
    engineeringCat,
  ] = await Promise.all([
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'News',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Finance',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Design',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Software',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Engineering',
      },
    }),
  ])

  let image1ID = image1Doc.id
  let image2ID = image2Doc.id

  if (payload.db.defaultIDType === 'text') {
    image1ID = `"${image1Doc.id}"`
    image2ID = `"${image2Doc.id}"`
    demoAuthorID = `"${demoAuthorID}"`
  }

  payload.logger.info(`— Seeding artifacts...`)

  // Do not create artifacts with `Promise.all` because we want the artifacts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const artifact1Doc = await payload.create({
    collection: 'artifacts',
    data: JSON.parse(
      JSON.stringify({ ...artifact1, categories: [technologyCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const artifact2Doc = await payload.create({
    collection: 'artifacts',
    data: JSON.parse(
      JSON.stringify({ ...artifact2, categories: [newsCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const artifact3Doc = await payload.create({
    collection: 'artifacts',
    data: JSON.parse(
      JSON.stringify({ ...artifact3, categories: [financeCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const artifacts = [artifact1Doc, artifact2Doc, artifact3Doc]

  // update each artifact with related artifacts

  await Promise.all([
    await payload.update({
      collection: 'artifacts',
      id: artifact1Doc.id,
      data: {
        relatedArtifacts: [artifact2Doc.id, artifact3Doc.id],
      },
    }),
    await payload.update({
      collection: 'artifacts',
      id: artifact2Doc.id,
      data: {
        relatedArtifacts: [artifact1Doc.id, artifact3Doc.id],
      },
    }),
    await payload.update({
      collection: 'artifacts',
      id: artifact3Doc.id,
      data: {
        relatedArtifacts: [artifact1Doc.id, artifact2Doc.id],
      },
    }),
  ])

  payload.logger.info(`— Seeding comments...`)

  await Promise.all(
    artifacts.map(
      async (artifact, index) =>
        await payload.create({
          collection: 'comments',
          data: {
            _status: 'published',
            comment: `This is a comment on artifact ${
              index + 1
            }. It has been approved by an admin and is now visible to the public. You can leave your own comment on this artifact using the form below.`,
            user: demoUserID,
            doc: artifact.id,
          },
        }),
    ),
  )

  payload.logger.info(`— Seeding projects...`)

  // Do not create artifacts with `Promise.all` because we want the artifacts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const project1Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project1, categories: [designCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  const project2Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project2, categories: [softwareCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  const project3Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project3, categories: [engineeringCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  // update each project with related projects

  await Promise.all([
    await payload.update({
      collection: 'projects',
      id: project1Doc.id,
      data: {
        relatedProjects: [project2Doc.id, project3Doc.id],
      },
    }),
    await payload.update({
      collection: 'projects',
      id: project2Doc.id,
      data: {
        relatedProjects: [project1Doc.id, project3Doc.id],
      },
    }),
    await payload.update({
      collection: 'projects',
      id: project3Doc.id,
      data: {
        relatedProjects: [project1Doc.id, project2Doc.id],
      },
    }),
  ])

  payload.logger.info(`— Seeding artifacts page...`)

  const artifactsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(artifactsPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  payload.logger.info(`— Seeding projects page...`)

  const projectsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(projectsPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  let artifactsPageID = artifactsPageDoc.id
  let projectsPageID = projectsPageDoc.id

  if (payload.db.defaultIDType === 'text') {
    artifactsPageID = `"${artifactsPageID}"`
    projectsPageID = `"${projectsPageID}"`
  }

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/"\{\{IMAGE_1\}\}"/g, image1ID)
        .replace(/"\{\{IMAGE_2\}\}"/g, image2ID)
        .replace(/"\{\{ARTIFACTS_PAGE_ID\}\}"/g, artifactsPageID)
        .replace(/"\{\{PROJECTS_PAGE_ID\}\}"/g, projectsPageID),
    ),
  })

  payload.logger.info(`— Seeding settings...`)

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      artifactsPage: artifactsPageDoc.id,
      projectsPage: projectsPageDoc.id,
    },
  })

  payload.logger.info(`— Seeding header...`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: artifactsPageDoc.id,
            },
            label: 'Artifacts',
          },
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: projectsPageDoc.id,
            },
            label: 'Projects',
          },
        },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
}
