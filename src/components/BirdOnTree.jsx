import bird1Url from '../assets/Bird1.svg?url'
import bird2Url from '../assets/Bird2.svg?url'
import bird3Url from '../assets/Bird3.svg?url'
import { BIRD_POSITIONS } from '../lib/birdLayout'
import { birdDisplayWidth } from '../lib/birdWidth'

const BIRD_SRC = [bird1Url, bird2Url, bird3Url]

export default function BirdOnTree({ birdsOldestFirst, onBirdClick }) {
  return (
    <>
      {birdsOldestFirst.map((bird, index) => {
        const pos = BIRD_POSITIONS[index % BIRD_POSITIONS.length]
        const v = index % 3
        const src = BIRD_SRC[v]
        const w = birdDisplayWidth(40, v)
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
              width: w,
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
