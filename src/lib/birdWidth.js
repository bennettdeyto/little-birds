import { BIRD_COUNT } from './birdAssets'

/** Log, Feed, Board, onboarding: Bird3 (index 2 mod cycle) is 90% larger than other variants. Tree uses BirdOnTree sizing only. */
export function birdDisplayWidth(baseWidth, variantIndex) {
  if (variantIndex % BIRD_COUNT === 2) {
    return Math.round(baseWidth * 1.9)
  }
  return baseWidth
}
