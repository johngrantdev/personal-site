import { UPLOAD_FIELDS } from './uploads'

export const META = `meta {
  title
  image {
    ${UPLOAD_FIELDS}
  }
  description
}`
