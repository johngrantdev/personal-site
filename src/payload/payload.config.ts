import { postgresAdapter } from '@payloadcms/db-postgres'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload'
import computeBlurhash from 'payload-blurhash-plugin'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { CallToAction } from './blocks/CallToAction'
import { Code } from './blocks/Code'
import { MediaBlock } from './blocks/MediaBlock'
import { VimeoBlock } from './blocks/VimeoBlock'
import Category from './collections/Category'
import Clients from './collections/Clients'
import Keywords from './collections/Keywords'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Uploads } from './collections/Uploads'
import Users from './collections/Users'
import { HiddenLayout } from './globals/Hidden'
import { Site } from './globals/Site'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({
  path: path.resolve(dirname, '../../.env'),
})

const generateTitle: GenerateTitle = () => process.env.SITE_TITLE || ''
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL

export default buildConfig({
  debug: true,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    api: '/api/payload',
    graphQL: '/api/payload/graphql',
    graphQLPlayground: '/api/payload/graphql-playground',
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [CallToAction, Code, MediaBlock, VimeoBlock],
      }),
    ],
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL,
  sharp,
  collections: [Pages, Posts, Media, Category, Keywords, Clients, Users, Uploads],
  globals: [Site, HiddenLayout],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: serverURL ? [serverURL] : [],
  csrf: serverURL ? [serverURL] : [],
  plugins: [
    redirectsPlugin({
      collections: ['pages', 'posts'],
    }),
    nestedDocsPlugin({
      collections: ['keywords'],
    }),
    seoPlugin({
      collections: ['pages', 'posts'],
      generateTitle,
      uploadsCollection: 'uploads',
    }),
    s3Storage({
      bucket: process.env.S3_BUCKET || '',
      collections: {
        uploads: true,
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
      },
      enabled: Boolean(process.env.S3_BUCKET),
    }),
    computeBlurhash(),
  ],
})
