import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'
import computeBlurhash from 'payload-blurhash-plugin'

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
import { adapter } from './utilities/s3adapter'

import dashboardAnalytics from '@nouance/payload-dashboard-analytics'
import type { PlausibleProvider } from '@nouance/payload-dashboard-analytics/dist/types/providers'

const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY
const PLAUSIBLE_HOST = process.env.PLAUSIBLE_HOST
const PLAUSIBLE_SITE_ID = process.env.PLAUSIBLE_SITE_ID

const plausibleProvider: PlausibleProvider = {
  source: 'plausible',
  apiSecret: PLAUSIBLE_API_KEY,
  siteId: PLAUSIBLE_SITE_ID,
  host: PLAUSIBLE_HOST,
}

const generateTitle: GenerateTitle = () => {
  return process.env.SITE_TITLE
}

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  debug: true,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {},
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
        },
      },
    }),
  },
  routes: {
    api: '/api/payload',
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
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Pages, Posts, Media, Category, Keywords, Clients, Users, Uploads],
  globals: [Site, HiddenLayout],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL],
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL],
  rateLimit: {
    max: 5000,
    trustProxy: true,
  },
  // endpoints: [
  //   // The seed endpoint is used to populate the database with some example data
  //   // You should delete this endpoint before deploying your site to production
  //   {
  //     path: '/seed',
  //     method: 'get',
  //     handler: seed,
  //   },
  // ],
  plugins: [
    // formBuilder({}),
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
          adapter: adapter,
        },
      },
    }),
    computeBlurhash(),
    dashboardAnalytics({
      provider: plausibleProvider,
      access: (user: any) => {
        return Boolean(user)
      },
      navigation: {
        afterNavLinks: [
          {
            type: 'live',
          },
        ],
      },
      dashboard: {
        beforeDashboard: ['viewsChart'],
        afterDashboard: ['topPages'],
      },
      collections: [
        {
          slug: Posts.slug,
          widgets: [
            {
              type: 'chart',
              label: 'Page views',
              metrics: ['views'],
              timeframe: 'currentMonth',
              idMatcher: (document: any) => `/articles/${document.slug}`,
            },
            {
              type: 'info',
              label: 'Page data',
              metrics: ['views', 'sessions', 'sessionDuration'],
              timeframe: '12mo',
              idMatcher: (document: any) => `/articles/${document.slug}`,
            },
          ],
        },
      ],
    }),
  ],
})
