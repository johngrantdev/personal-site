import { defineMiddleware } from 'astro:middleware'

import { CONTENT_SECURITY_POLICY } from './lib/security'

export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next()
  response.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY)
  response.headers.set('X-Robots-Tag', process.env.IS_LIVE === 'true' ? 'all' : 'noindex')
  return response
})
