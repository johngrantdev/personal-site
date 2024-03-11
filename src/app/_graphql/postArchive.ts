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
          backgroundColour
          overlayImage
          showDate
          hideTitle
          media {
            alt
            caption
            media {
              blurhash
              sizes {
                card {
                  filename
                  mimeType
                  width
                  height
                }
                tablet {
                  filename  
                  mimeType
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`
