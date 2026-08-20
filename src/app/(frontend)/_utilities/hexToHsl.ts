export function hexToHsl(hex: string): [number, number, number] {
  if (!hex) {
    hex = '#333333'
  }
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '')

  // Parse the r, g, b values
  let r: number, g: number, b: number
  if (hex.length === 3) {
    r = parseInt(hex.charAt(0).repeat(2), 16)
    g = parseInt(hex.charAt(1).repeat(2), 16)
    b = parseInt(hex.charAt(2).repeat(2), 16)
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else {
    throw new Error('Invalid HEX color format')
  }

  // Convert r, g, b to fractions of 1
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h: number,
    s: number,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  // Convert h, s, l values into percentages and return
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}
