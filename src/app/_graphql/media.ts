export const MEDIA_FIELDS = `
mimeType
filename
width
height
alt
caption
`

export const MEDIA = `media {
  ${MEDIA_FIELDS}
}`

export const MEDIA_BY_FILENAME = `
query MediaByFilename($filename: String!) {
  media(filter: { filename: $filename }) {
    mimeType
    filename
    width
    height
    alt
    caption
    sizes {
      width
      height
      filename
    }
  }
}
${MEDIA_FIELDS}
`
