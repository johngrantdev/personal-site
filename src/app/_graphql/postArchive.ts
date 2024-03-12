import { CARD } from "./card";

export const POST_ARCHIVE = `
  category {
    title
  }
  limit
  showPageRange
  populatedDocs {
    relationTo
    value { 
      ... on Post {
        title
        description
        keywords {
          title
        }
        slug
        publishedAt
        card {
          ${CARD}
        }
      }
    }
  }
`
