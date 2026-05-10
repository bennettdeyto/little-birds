import { useNavigate } from 'react-router-dom'
import { colors } from '../lib/colors'
import { fontBody, fontHeader } from '../lib/type'
import treeUrl from '../assets/Tree.svg?url'

const line1 = 'in Just-'
const line2 = 'spring when the world is mud-'

export default function Splash() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: colors.bg,
        maxWidth: 430,
        margin: '0 auto',
      }}
    >
      <button
        type="button"
        onClick={() => navigate('/poem')}
        style={{
          border: 'none',
          padding: 0,
          margin: 0,
          display: 'block',
          width: '100%',
          height: '50dvh',
          background: 'transparent',
          cursor: 'pointer',
        }}
        aria-label="Read poem"
      >
        <img
          src={treeUrl}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            verticalAlign: 'top',
          }}
        />
      </button>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 28px 48px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: fontHeader,
            fontSize: 24,
            fontWeight: 400,
            color: colors.textDark,
            margin: '0 0 16px',
          }}
        >
          Little Birds
        </h1>
        <p
          style={{
            fontFamily: fontBody,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 1.5,
            color: colors.textMuted,
            margin: '0 0 8px',
          }}
        >
          {line1}
        </p>
        <p
          style={{
            fontFamily: fontBody,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 1.5,
            color: colors.textMuted,
            margin: '0 0 32px',
          }}
        >
          {line2}
        </p>
        <button
          type="button"
          onClick={() => navigate('/log')}
          style={{
            fontFamily: fontBody,
            fontWeight: 400,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            background: colors.red,
            color: colors.bg,
            border: 'none',
            borderRadius: 4,
            padding: '14px 28px',
            cursor: 'pointer',
          }}
        >
          get started
        </button>
      </div>
    </div>
  )
}
