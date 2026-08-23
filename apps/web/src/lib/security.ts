import { createHash } from 'node:crypto'

export const THEME_BOOTSTRAP = `(()=>{const e=localStorage.getItem("theme"),t=e?"dark"===e:matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",t),document.documentElement.style.colorScheme=t?"dark":"light"})();`

const themeHash = createHash('sha256').update(THEME_BOOTSTRAP).digest('base64')

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'self'",
  'frame-ancestors \'none\'',
  "frame-src https://player.vimeo.com",
  "img-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  `script-src 'self' 'sha256-${themeHash}'`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
].join('; ')
