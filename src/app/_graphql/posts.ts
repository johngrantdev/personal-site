import { ARCHIVE_BLOCK, CALL_TO_ACTION_BLOCK, CONTENT_BLOCK, MEDIA_BLOCK } from './blocks'
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
        categories {
          title
        }
        createdAt
        publishedAt
        populatedAuthors {
          id
          name
        }
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${CONTENT_BLOCK}
          ${CALL_TO_ACTION_BLOCK}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        enableRestrictedContent
        relatedPosts {
          id
          slug
          title
          ${META}
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
          ${CONTENT_BLOCK}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`
