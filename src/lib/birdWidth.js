/** Bird3 (index 2) renders at 70% width so it matches other birds visually */
export function birdDisplayWidth(baseWidth, variantIndex) {
  return variantIndex % 3 === 2 ? Math.round(baseWidth * 0.7) : baseWidth
}
