// Utility function to lighten or darken a colour
// colour is in hex format
export function shadeColour(colour: string, percent: number): string {
  let R = parseInt(colour.substring(1, 3), 16)
  let G = parseInt(colour.substring(3, 5), 16)
  let B = parseInt(colour.substring(5, 7), 16)

  R = Math.round((R * (100 + percent)) / 100)
  G = Math.round((G * (100 + percent)) / 100)
  B = Math.round((B * (100 + percent)) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  const RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
  const GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
  const BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}
