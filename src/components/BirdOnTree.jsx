import { BIRD_POSITIONS } from '../lib/birdLayout'
import { BIRD_COUNT, BIRD_SRC } from '../lib/birdAssets'

export default function BirdOnTree({ birdsOldestFirst, onBirdClick }) {
  return (
    <>
      {birdsOldestFirst.map((bird, index) => {
        const pos = BIRD_POSITIONS[index % BIRD_POSITIONS.length]
        const v = index % BIRD_COUNT
        const src = BIRD_SRC[v]
        return (
          <img
            key={bird.id}
            src={src}
            alt=""
            role="presentation"
            onClick={() => onBirdClick(bird)}
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              width: index % 6 === 2 ? 80 : 38,
              height: 'auto',
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )
      })}
    </>
  )
}
