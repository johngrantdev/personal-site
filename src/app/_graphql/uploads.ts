const sizesFields = `
    card {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    desktop {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    desktopHalf {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    tablet {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    tabletHalf {
      url
      width
      height
      mimeType
      filesize
      filename
    }
    mobile {
      url
      width
      height
      mimeType
      filesize
      filename
    }
  `

export const UPLOAD_FIELDS = `
  id
  blurhash
  updatedAt
  createdAt
  url
  filename
  mimeType
  filesize
  width
  height
  sizes {
    ${sizesFields}
  }
`

export const UPLOAD = `media {
  ${UPLOAD_FIELDS}
}`

export const UPLOAD_BY_FILENAME = `
query UploadByFilename($filename: String!) {
    media(filter: { filename: $filename }) {
      id
      blurhash
      updatedAt
      createdAt
      url
      filename
      mimeType
      filesize
      width
      height
      sizes {
        ${sizesFields}
      }
    }
  }
`

export const UPLOAD_BY_ID = `
query UploadById($id: ID!) {
    media(id: $id) {
      id
      blurhash
      updatedAt
      createdAt
      url
      filename
      mimeType
      filesize
      width
      height
      sizes {
        ${sizesFields}
      }
    }
  }
`
