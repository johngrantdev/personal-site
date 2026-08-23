import type { APIRoute } from 'astro'

import { getSlugs } from '../lib/queries'

export const GET: APIRoute = async () => {
  const origin = process.env.SERVER_URL || 'http://localhost:4321'
  const [pages, posts] = await Promise.all([getSlugs('pages'), getSlugs('posts')])
  const paths = [
    ...pages.map(slug => slug === 'home' ? '/' : `/${slug}`),
    ...posts.map(slug => `/posts/${slug}`),
  ]
  const urls = paths.map(path => `<url><loc>${new URL(path, origin)}</loc></url>`).join('')

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
