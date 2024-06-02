// import type { GenerateTitle } from '@payloadcms/plugin-seo/types'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { nestedDocs } from '@payloadcms/plugin-nested-docs'
import { redirects } from '@payloadcms/plugin-redirects'
import { seo } from '@payloadcms/plugin-seo'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
// import computeBlurhash from 'payload-blurhash-plugin'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { CallToAction } from './payload/blocks/CallToAction'
import { Code } from './payload/blocks/Code'
import { MediaBlock } from './payload/blocks/MediaBlock'
import { VimeoBlock } from './payload/blocks/VimeoBlock'
import Category from './payload/collections/Category'
import Clients from './payload/collections/Clients'
import Keywords from './payload/collections/Keywords'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Posts } from './payload/collections/Posts'
import { Uploads } from './payload/collections/Uploads'
import { Users } from './payload/collections/Users'
import { HiddenLayout } from './payload/globals/Hidden'
import { Site } from './payload/globals/Site'
import { adapter } from './payload/utilities/s3adapter'

const generateTitle = () => {
  return process.env.SITE_TITLE || 'Personal Site'
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Pages, Posts, Media, Category, Keywords, Clients, Users, Uploads],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL ? process.env.PAYLOAD_PUBLIC_SERVER_URL : 'http://localhost:3000'],
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL ? process.env.PAYLOAD_PUBLIC_SERVER_URL : 'http://localhost:3000'],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [CallToAction, Code, MediaBlock, VimeoBlock],
      }),
    ],
      }),
  globals: [Site, HiddenLayout],
  plugins: [
    redirects({
      collections: ['pages', 'posts'],
    }),
    nestedDocs({
      collections: ['keywords'],
    }),
    seo({
      collections: ['pages', 'posts'],
      generateTitle,
      uploadsCollection: 'uploads',
    }),
    cloudStorage({
      collections: {
        uploads: {
          adapter,
        },
      },
    }),
    // computeBlurhash(),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
