import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { note1 } from './note-1'
import { note2 } from './note-2'
import { note3 } from './note-3'
import { notesPage } from './notes-page'
import { project1 } from './project-1'
import { project2 } from './project-2'
import { project3 } from './project-3'
import { projectsPage } from './projects-page'

const collections = ['categories', 'keywords', 'media', 'pages', 'posts']
const globals = ['header', 'footer']

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

  let [{ id: demoAuthorID }] = await Promise.all([
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

  const [notesCategory, projectsCategory] = await Promise.all([
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Notes',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Projects',
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

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const note1Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...note1, categories: [notesCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const note2Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...note2, categories: [notesCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const project1Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...project1, categories: [projectsCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image2ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const note3Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...note3, categories: [notesCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const project2Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...project2, categories: [projectsCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image2ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  const project3Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...project3, categories: [projectsCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image2ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAuthorID),
    ),
  })

  // update each post with related posts

  await Promise.all([
    await payload.update({
      collection: 'posts',
      id: note1Doc.id,
      data: {
        relatedPosts: [note2Doc.id, note3Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: note2Doc.id,
      data: {
        relatedPosts: [note1Doc.id, note3Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: note3Doc.id,
      data: {
        relatedPosts: [note1Doc.id, note2Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: project1Doc.id,
      data: {
        relatedPosts: [project2Doc.id, project3Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: note2Doc.id,
      data: {
        relatedPosts: [project1Doc.id, project3Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: note3Doc.id,
      data: {
        relatedPosts: [project1Doc.id, project2Doc.id],
      },
    }),
  ])

  payload.logger.info(`— Seeding notes page...`)

  const notesPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(notesPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  let notesPageID = notesPageDoc.id

  if (payload.db.defaultIDType === 'text') {
    notesPageID = `"${notesPageID}"`
  }

  payload.logger.info(`— Seeding projects page...`)

  const projectsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(projectsPage).replace(/"\{\{IMAGE\}\}"/g, image2ID)),
  })

  let projectPageID = projectsPageDoc.id

  if (payload.db.defaultIDType === 'text') {
    notesPageID = `"${projectPageID}"`
  }

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/"\{\{IMAGE_1\}\}"/g, image1ID)
        .replace(/"\{\{IMAGE_2\}\}"/g, image2ID)
        .replace(/"\{\{POSTS_PAGE_ID\}\}"/g, notesPageID),
    ),
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
              value: notesPageDoc.id,
            },
            label: 'Notes',
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
