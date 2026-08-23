import { postgresAdapter } from '@payloadcms/db-postgres'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import { BlocksFeature, CodeBlock, lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { CallToAction } from './blocks/CallToAction'
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
import { Site } from './globals/Site'
import { purgeTags } from './utilities/purgeTags'
import { workspaceRoot } from './utilities/workspaceRoot'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// .env sits at the workspace root; packages run from their own cwd.
if (!process.env.PAYLOAD_SECRET) {
  try {
    process.loadEnvFile(path.join(workspaceRoot(), '.env'))
  } catch {
    // no file; use the ambient environment
  }
}

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is required')
}

const CODE_LANGUAGES = {
  css: 'CSS',
  dockerfile: 'Dockerfile',
  go: 'Go',
  graphql: 'GraphQL',
  handlebars: 'Handlebars',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  kotlin: 'Kotlin',
  markdown: 'Markdown',
  pgsql: 'PostgresQL',
  python: 'Python',
  rust: 'Rust',
  scss: 'SCSS',
  swift: 'Swift',
  typescript: 'TypeScript',
  xml: 'XML',
  yaml: 'YAML',
}

const generateTitle: GenerateTitle = () => process.env.SITE_TITLE || ''
const serverURL = process.env.SERVER_URL

export default buildConfig({
  debug: process.env.NODE_ENV === 'development',
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
        // Keep the original slug and field shape so existing content remains valid.
        blocks: [
          CallToAction,
          CodeBlock({
            slug: 'code',
            defaultLanguage: 'typescript',
            languages: CODE_LANGUAGES,
            fieldOverrides: { interfaceName: 'CodeBlock' },
          }),
          MediaBlock,
          VimeoBlock,
        ],
      }),
    ],
  }),
  db: postgresAdapter({
    push: true,
    migrationDir: path.resolve(dirname, 'migrations'),
    prodMigrations: migrations,
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  secret: process.env.PAYLOAD_SECRET,
  serverURL,
  sharp,
  collections: [Pages, Posts, Media, Category, Keywords, Clients, Users, Uploads],
  globals: [Site],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: serverURL ? [serverURL] : [],
  csrf: serverURL ? [serverURL] : [],
  plugins: [
    redirectsPlugin({
      collections: ['pages', 'posts'],
      overrides: {
        hooks: {
          afterChange: [() => purgeTags('redirects')],
          afterDelete: [() => purgeTags('redirects')],
        },
      },
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
  ],
})
