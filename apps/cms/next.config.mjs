import { withPayload } from '@payloadcms/next/withPayload'

import ContentSecurityPolicy from './csp.cjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  output: 'standalone',
  outputFileTracingRoot: new URL('../../', import.meta.url).pathname,
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
  outputFileTracingIncludes: {
    '/*': ['../../node_modules/@swc/helpers/**/*'],
  },
  reactStrictMode: false,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
