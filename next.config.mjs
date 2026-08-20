import { withPayload } from '@payloadcms/next/withPayload'
import { withPlausibleProxy } from 'next-plausible'

import ContentSecurityPolicy from './csp.cjs'
import redirects from './redirects.cjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  output: 'standalone',
  async headers() {
    const headers = []

    if (process.env.NEXT_PUBLIC_IS_LIVE !== 'true') {
      headers.push({
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
        source: '/:path*',
      })
    }

    headers.push({
      headers: [{ key: 'Content-Security-Policy', value: ContentSecurityPolicy }],
      source: '/(.*)',
    })

    return headers
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        port: process.env.PORT || '3000',
        protocol: 'http',
      },
      {
        hostname: process.env.NEXT_PUBLIC_SERVER_URL
          ? new URL(process.env.NEXT_PUBLIC_SERVER_URL).hostname
          : undefined,
        protocol: 'https',
      },
    ].filter(pattern => pattern.hostname),
  },
  outputFileTracingIncludes: {
    '/*': ['./node_modules/@swc/helpers/**/*'],
  },
  reactStrictMode: false,
  redirects,
}

const plausibleConfig = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL
  ? withPlausibleProxy({ src: process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL })(nextConfig)
  : nextConfig

export default withPayload(plausibleConfig, { devBundleServerPackages: false })
