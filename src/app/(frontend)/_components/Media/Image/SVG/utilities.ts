// Utility function to parse transform attribute
export const parseTransform = (transform: string | null): { x: string; y: string } | null => {
  if (transform?.includes('translate')) {
    const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/)
    if (match) {
      return { x: match[1], y: match[2] }
    }
  }
  return null
}

interface CreateForeignObjectProps {
  text: SVGTextElement
  x: number | string
  y: number | string
  width: number | string
  height: number | string
  fontSize: number
}

// Function to create and insert foreignObject
export const createForeignObject = ({
  text,
  x,
  y,
  width,
  height,
  fontSize,
}: CreateForeignObjectProps): void => {
  const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
  foreignObject.setAttribute('x', String(x))
  foreignObject.setAttribute('y', String(y))
  foreignObject.setAttribute('width', String(width))
  foreignObject.setAttribute('height', String(height))

  const div = document.createElement('div')
  div.style.fontSize = `${fontSize}px`
  div.style.lineHeight = `${fontSize * 1.5}px`
  div.style.display = 'flex'
  div.style.flexDirection = 'column'
  div.textContent = text.textContent

  // Append the div to the foreignObject and replace the text element in the SVG
  foreignObject.appendChild(div)
  if (text.parentNode) {
    text.parentNode.insertBefore(foreignObject, text)
    text.parentNode.removeChild(text)
  }
}

// Function to adjust <image> hrefs
export const adjustImageHrefs = (images: NodeListOf<SVGImageElement>): void => {
  images.forEach(img => {
    const href = img.getAttribute('xlink:href')
    if (href) {
      const modifiedHref = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${href}`
      img.setAttribute('xlink:href', modifiedHref)
    }
  })
}

// Function to apply theme-based adjustments to styles
export const applyThemeAdjustments = (
  styles: NodeListOf<HTMLStyleElement>,
  theme: string,
): void => {
  styles.forEach(style => {
    let cssText = style.textContent || ''
    if (theme === 'dark') {
      cssText = cssText
        .replace(/#000000/g, '#ffffff')
        .replace(/#000/g, '#ffffff')
        .replace(/black/g, 'white')
        .replace(/rgb\(0,\s*0,\s*0\)/g, 'rgb(255, 255, 255)')
    }
    style.textContent = cssText
  })
}
