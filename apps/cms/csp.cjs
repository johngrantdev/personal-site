const policies = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://maps.googleapis.com',
    'https://player.vimeo.com',
  ],
  'child-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'https://raw.githubusercontent.com'],
  'font-src': ["'self'"],
  'frame-src': ["'self'", 'https://player.vimeo.com'],
  'connect-src': [
    "'self'",
    'https://maps.googleapis.com',
    'https://vimeo.com',
    'https://player.vimeo.com',
  ],
}

module.exports = Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(' ')}`
    }
    return ''
  })
  .join('; ')
