import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const PAGES = `
  query Pages {
    Pages(limit: 300)  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        layout {
          id
          scrollSnap
          sideContentPosition
          fullPageHeight
          sideColumn {
            style
            hero {
              ${MEDIA}
              description
              links {
                link ${LINK_FIELDS()}
              }
            }
            sideContent1
            sideContent2
          }
          mainColumn {
            style
            column1
            column2
          }
        }
        ${META}
      }
    }
  }
`
