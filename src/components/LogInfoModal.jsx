import { colors } from '../lib/colors'
import { fontBody } from '../lib/type'

const POEM_STANZAS = [
  ['may my heart always be open to little', 'birds who are the secrets of living', 'whatever they sing is better than to know', 'and if men should not hear them men are old'],
  ['may my mind stroll about hungry', 'and fearless and thirsty and supple', "and even if it's sunday may i be wrong", 'for whenever men are right they are not young'],
  ['and may myself do nothing usefully', 'and love yourself so more than truly', "there's never been quite such a fool who could fail", 'pulling all the sky over him with one smile'],
]

const APP_TEXT = [
  'this app was inspired by this poem by e. e. cummings.',
  'what he meant, i think, is that the small moments are the ones that actually matter. not just the milestones. not just the big days. the morning coffee that was exactly right. a joke that landed. facetiming your brother after too long.',
  "these are the things that make up most of a life, and they're the easiest to let pass without noticing.",
  'Little Birds gives you somewhere to put them. one small thing, one day at a time. no pressure, no performance. just a quiet record of the things that caught you.',
  'because if you pay attention to the little birds long enough, you start to realize how full the tree already is.',
]

export default function LogInfoModal({ open, onClose }) {
  if (!open) return null

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="log-info-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.bg,
          border: `0.5px solid ${colors.border}`,
          borderRadius: 12,
          maxWidth: 380,
          width: '100%',
          maxHeight: 'min(85dvh, 640px)',
          overflowY: 'auto',
          padding: '22px 20px 24px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
          }}
        >
          <div
            id="log-info-title"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: '0 10px',
            }}
          >
            <h2
              style={{
                fontFamily: fontBody,
                fontSize: 13,
                fontWeight: 400,
                color: colors.textMuted,
                margin: 0,
              }}
            >
              19
            </h2>
            <span
              style={{
                fontFamily: fontBody,
                fontSize: 11,
                fontWeight: 300,
                color: colors.textFaint,
                letterSpacing: '0.06em',
              }}
            >
              e. e. cummings
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 4,
              color: colors.textMuted,
              lineHeight: 1,
            }}
          >
            <i className="ti ti-x" style={{ fontSize: 20 }} />
          </button>
        </div>

        <div style={{ textAlign: 'left', marginBottom: 24 }}>
          {POEM_STANZAS.map((stanza, si) => (
            <div key={si} style={{ marginBottom: si < POEM_STANZAS.length - 1 ? 20 : 0 }}>
              {stanza.map((line, li) => (
                <p
                  key={li}
                  style={{
                    fontFamily: fontBody,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 11,
                    lineHeight: 1.55,
                    color: colors.textDark,
                    margin: '0.12em 0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            height: 1,
            background: colors.border,
            margin: '0 0 18px',
            opacity: 0.9,
          }}
        />

        <p
          style={{
            fontFamily: fontBody,
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 1.65,
            color: colors.textMuted,
            margin: '0 0 14px',
          }}
        >
          {APP_TEXT[0]}
        </p>
        <p
          style={{
            fontFamily: fontBody,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 1.65,
            color: colors.textDark,
            margin: '0 0 16px',
          }}
        >
          &ldquo;little birds who are the secrets of living&rdquo;
        </p>
        {APP_TEXT.slice(1).map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: fontBody,
              fontWeight: 400,
              fontSize: 12,
              lineHeight: 1.65,
              color: colors.textMuted,
              margin: i === 0 ? '0 0 0.95em' : '0.95em 0 0',
            }}
          >
            {p}
          </p>
        ))}
        <p
          style={{
            fontFamily: fontBody,
            fontWeight: 300,
            fontSize: 12,
            lineHeight: 1.65,
            color: colors.textFaint,
            margin: '1.1em 0 0',
            letterSpacing: '0.06em',
          }}
        >
          - bd
        </p>
      </div>
    </div>
  )
}
