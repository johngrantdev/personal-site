import { hexToHsl } from './hexToHsl'

export function generateColourGradient(
  colour: string,
  steps: number,
  highlightIncrease: number,
): Record<number, string> {
  const [h, s, originalL] = hexToHsl(colour)
  let stops: Record<number, string> = {}

  // Calculate maxL with the provided highlightIncrease, ensuring it does not exceed 100
  const lightnessRange = originalL + highlightIncrease > 100 ? 100 - originalL : highlightIncrease

  // Generate gradient stops
  for (let i = 0; i <= steps; i++) {
    const t = i / steps // Normalize step index to [0, 1]

    // exponential fall off for now.
    const lightnessAdjustment = lightnessRange * Math.exp(-5 * t)
    const adjustedLightness = originalL + lightnessAdjustment

    stops[Math.round(t * 100)] = `hsl(${h}, ${s}%, ${adjustedLightness}%)`
  }

  return stops
}
