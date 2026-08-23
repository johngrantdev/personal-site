import node from '@astrojs/node'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  vite: {
    // Node-only; Vite must not bundle these.
    ssr: {
      external: [
        'payload',
        'sharp',
        '@payloadcms/db-postgres',
        '@payloadcms/plugin-redirects',
        '@payloadcms/plugin-seo',
        '@payloadcms/richtext-lexical',
        '@payloadcms/storage-s3',
      ],
    },
  },
})
