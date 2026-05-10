import { useNavigate } from 'react-router-dom'
import { colors } from '../lib/colors'
import { fontBody } from '../lib/type'

const lines = [
  'in Just-',
  'spring          when the world is mud-',
  'luscious the little',
  'lame balloonman',
  '',
  'whistles          far          and          wee',
  '',
  'and eddieandbill come',
  'running from marbles and',
  "piracies and it's",
  'spring',
  '',
  'when the world is puddle-wonderful',
  '',
  'the queer',
  'old balloonman whistles',
  'far          and          wee',
  '',
  'and bettyandisbel come dancing',
  '',
  'from hop-scotch and jump-rope and',
  '',
  "it's",
  'spring',
]

const aboutParagraphs = [
  'This poem is by E. E. Cummings, from Tulips and Chimneys (1923), and lives in the public domain.',
  'Little Birds is a tiny journal for what makes you feel awake; the poem is here because spring, mud, and whistle belong together.',
  'The app is not affiliated with the Cummings estate — only grateful for the language.',
]

export default function Poem() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: colors.bg,
        maxWidth: 430,
        margin: '0 auto',
        padding: '16px 24px 48px',
        position: 'relative',
      }}
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Back"
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          padding: 8,
          color: colors.textMid,
        }}
      >
        <i className="ti ti-arrow-left" style={{ fontSize: 22 }} />
      </button>

      <div style={{ paddingTop: 48, textAlign: 'center' }}>
        {lines.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: fontBody,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: line === '' ? 10 : 15,
              lineHeight: line === '' ? 0.6 : 1.85,
              color: colors.textDark,
              margin: line === '' ? '0.35em 0' : '0.1em 0',
              whiteSpace: 'pre-wrap',
            }}
          >
            {line}
          </p>
        ))}

        <div
          style={{
            height: 1,
            background: colors.border,
            margin: '36px auto 28px',
            maxWidth: 200,
          }}
        />

        <div style={{ marginTop: 8 }}>
          {aboutParagraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: fontBody,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 12,
                lineHeight: 1.7,
                color: colors.textMuted,
                margin: i === 0 ? 0 : '1em 0 0',
                textAlign: 'left',
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
