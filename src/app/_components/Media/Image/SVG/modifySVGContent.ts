import type { Media } from '../../../../../payload/payload-types'
import { fetchMediaByFilename } from '../../../../_api/fetchMediaByFilename'

export async function modifySvgContent(svg: string): Promise<string> {
  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(svg, 'image/svg+xml')
  const images = svgDoc.querySelectorAll('image')

  await Promise.all(
    Array.from(images).map(async img => {
      const href = img.getAttribute('xlink:href')
      const widthAttr = img.getAttribute('width')
      const width = widthAttr ? parseInt(widthAttr, 10) : undefined

      if (href && width) {
        const filename = href.split('/').pop()
        if (filename) {
          try {
            const mediaData = (await fetchMediaByFilename(filename)) as Media
            let newFilename = filename
            if (mediaData && mediaData.width > width) {
              newFilename = selectAppropriateFilename(mediaData, width)
            }
            const modifiedHref = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${newFilename}`
            img.setAttribute('xlink:href', modifiedHref)
          } catch (error: unknown) {
            // eslint-disable-next-line no-console
            console.error('Error fetching media data:', error)
          }
        }
      }
    }),
  )

  return new XMLSerializer().serializeToString(svgDoc)
}

function selectAppropriateFilename(mediaData: Media, width: number): string {
  let newFilename
  if (mediaData && mediaData.width > width) {
    if (width < 425) {
      newFilename = mediaData.sizes.mobile.filename
    } else if (width >= 425 && width < 750) {
      newFilename = mediaData.sizes.tablet.filename
    } else if (width >= 750 && width < 950) {
      newFilename = mediaData.sizes.desktopHalf.filename
    } else if (width >= 950) {
      newFilename = mediaData.sizes.desktop.filename
    }
  }
  return newFilename
}
