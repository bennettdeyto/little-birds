import { useEffect, useRef, useState } from 'react'
import { colors } from '../lib/colors'
import { BIRD_COUNT, BIRD_SRC } from '../lib/birdAssets'
import { birdDisplayWidth } from '../lib/birdWidth'
import { formatEntryDate } from '../lib/formatDate'
import { getBirds, saveAndSync } from '../lib/storage'
import { fontBody } from '../lib/type'

const INPUT_PLACEHOLDERS = [
  'What did you notice today...',
  'What brought you joy...',
  'A special moment...',
]

export default function Log() {
  const [placeholder] = useState(
    () => INPUT_PLACEHOLDERS[Math.floor(Math.random() * INPUT_PLACEHOLDERS.length)],
  )

  const [input, setInput] = useState('')
  const [birds, setBirds] = useState(getBirds)
  const [birdPopSeq, setBirdPopSeq] = useState(0)
  const prevBirdCount = useRef(birds.length)

  useEffect(() => {
    const n = birds.length
    if (n > prevBirdCount.current) {
      setBirdPopSeq((s) => s + 1)
    }
    prevBirdCount.current = n
  }, [birds.length])

  const hasEntries = birds.length > 0
  const latest = birds[0]
  const hasEntryToday =
    !!latest
    && new Date(latest.created_at).toDateString() === new Date().toDateString()
  const variant = hasEntries ? (birds.length - 1) % BIRD_COUNT : 0
  const birdSrc = BIRD_SRC[variant]
  const birdW = birdDisplayWidth(72, variant)

  async function submitEntry() {
    const text = input.trim()
    if (!text) return
    await saveAndSync(text)
    setInput('')
    setBirds(getBirds())
  }

  async function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    e.preventDefault()
    await submitEntry()
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
            key={birdPopSeq > 0 ? `bird-pop-${birdPopSeq}` : 'bird-idle'}
            className={birdPopSeq > 0 ? 'lb-log-bird-pop' : undefined}
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
          {!hasEntryToday && (
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
          )}
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
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={submitEntry}
              style={{
                border: `1px solid ${colors.border}`,
                background: colors.bgCard,
                color: colors.textDark,
                fontFamily: fontBody,
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                borderRadius: 6,
                padding: '8px 12px',
                cursor: 'pointer',
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
