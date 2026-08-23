import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const origin = process.env.SERVER_URL || 'http://localhost:4321'
  const disallow = process.env.IS_LIVE === 'true' ? '' : 'Disallow: /\n'

  return new Response(`User-agent: *\n${disallow}Sitemap: ${origin}/sitemap.xml\n`)
}
