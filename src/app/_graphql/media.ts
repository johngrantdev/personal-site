import { UPLOAD } from './uploads'

export const MEDIA_FIELDS = `
alt
caption
${UPLOAD}
`

export const MEDIA = `media {
  ${MEDIA_FIELDS}
}`
