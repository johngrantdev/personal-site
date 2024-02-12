import { ARCHIVE_BLOCK, CALL_TO_ACTION_BLOCK, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const POSTS = `
  query Posts {
    Posts(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const POST = `
  query Posts($slug: String, $draft: Boolean) {
    Posts(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        description
        category {
          title
        }
        keywords {
          title
        }
        createdAt
        publishedAt
        populatedAuthors {
          id
          name
        }
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
            projectHero {
              year
              client {
                title
              }
              links {
                link ${LINK_FIELDS()}
              }
            }
            sideContent1
            sideContent2
          }
          mainColumn {
            style
            row1column1
            row1column2
            row2column1
            row2column2
          }
        }
        relatedPosts {
          id
          slug
          title
          description
          publishedAt
          card {
            backgroundColour
            overlayImage
            showDate
          }
          ${META}
        }
        card {
          ${MEDIA}
          backgroundColour
          overlayImage
          showDate
        }
        ${META}
      }
    }
  }
`

export const POST_RESTRICTED_CONTENT = `
  query Posts($slug: String, $draft: Boolean) {
    Posts(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        restrictedContent {
          ${CALL_TO_ACTION_BLOCK}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`
