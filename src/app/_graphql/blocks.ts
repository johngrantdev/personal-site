import { CATEGORIES } from './categories'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  invertBackground
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CONTENT = `
...on Content {
  blockType
  invertBackground
  columns {
    size
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  invertBackground
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on Archive {
  blockType
  introContent
  populateBy
  relationTo
  ${CATEGORIES}
  limit
  showPageRange
  selectedDocs {
    relationTo
    value {
      ...on Artifact {
        id
        slug
        title
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Artifact {
        id
        slug
        title
        ${CATEGORIES}
        ${META}
      }
    }
  }
  populatedDocsTotal
}
`
