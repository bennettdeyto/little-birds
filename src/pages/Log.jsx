import { useState } from 'react'
import bird1Url from '../assets/Bird1.svg?url'
import bird2Url from '../assets/Bird2.svg?url'
import bird3Url from '../assets/Bird3.svg?url'
import { colors } from '../lib/colors'
import { birdDisplayWidth } from '../lib/birdWidth'
import { formatEntryDate } from '../lib/formatDate'
import { getBirds, saveAndSync } from '../lib/storage'
import { fontBody } from '../lib/type'

const BIRD_SRC = [bird1Url, bird2Url, bird3Url]

const INPUT_PLACEHOLDERS = [
  'What did you notice today...',
  'What brought you joy...',
  'Write others',
]

export default function Log() {
  const [placeholder] = useState(
    () => INPUT_PLACEHOLDERS[Math.floor(Math.random() * INPUT_PLACEHOLDERS.length)],
  )

  const [input, setInput] = useState('')
  const [birds, setBirds] = useState(getBirds)

  const hasEntries = birds.length > 0
  const latest = birds[0]
  const variant = hasEntries ? (birds.length - 1) % 3 : 0
  const birdSrc = BIRD_SRC[variant]
  const birdW = birdDisplayWidth(72, variant)

  async function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const text = input.trim()
    if (!text) return
    e.preventDefault()
    await saveAndSync(text)
    setInput('')
    setBirds(getBirds())
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: colors.bg,
        paddingBottom: 88,
        maxWidth: 430,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '56px 24px 32px',
          paddingTop: 56,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: hasEntries ? 20 : 24,
          }}
        >
          <img
            src={birdSrc}
            alt=""
            width={birdW}
            height="auto"
            style={{ display: 'block' }}
          />
        </div>

        {hasEntries && latest && (
          <div style={{ marginBottom: 22 }}>
            <p
              style={{
                fontFamily: fontBody,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 17,
                lineHeight: 1.55,
                color: colors.textDark,
                textAlign: 'center',
                margin: '0 0 10px',
              }}
            >
              {latest.text}
            </p>
            <p
              style={{
                fontFamily: fontBody,
                fontWeight: 300,
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: colors.textGhost,
                textAlign: 'center',
                margin: 0,
              }}
            >
              what you noticed · {formatEntryDate(latest.created_at)}
            </p>
          </div>
        )}

        <div>
          <p
            style={{
              fontFamily: fontBody,
              fontWeight: 300,
              fontSize: 9,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: colors.textFaint,
              margin: '0 0 12px',
            }}
          >
            today · {formatEntryDate(new Date().toISOString())}
          </p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
            style={{
              width: '100%',
              fontFamily: fontBody,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 16,
              color: colors.textDark,
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${colors.border}`,
              padding: '8px 0',
              outline: 'none',
            }}
          />
          <p
            style={{
              margin: '12px 0 0',
              fontFamily: fontBody,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 9,
              color: colors.textGhost,
            }}
          >
            {hasEntries
              ? 'press enter to add another small moment'
              : 'a few words is enough'}
          </p>
        </div>
      </div>
    </div>
  )
}
