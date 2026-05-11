import { BIRD_COUNT } from './birdAssets'

/** Bird3 (index 2 mod cycle) renders at 70% width so it matches other birds visually */
export function birdDisplayWidth(baseWidth, variantIndex) {
  return variantIndex % BIRD_COUNT === 2 ? Math.round(baseWidth * 0.7) : baseWidth
}
