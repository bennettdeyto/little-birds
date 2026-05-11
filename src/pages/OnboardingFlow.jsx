import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import startScreenUrl from '../assets/start-screen.svg?url'
import { BIRD_COUNT, BIRD_SRC } from '../lib/birdAssets'
import { colors } from '../lib/colors'
import { birdDisplayWidth } from '../lib/birdWidth'
import { markOnboardingComplete } from '../lib/onboarding'
import { fontBody } from '../lib/type'

/** visual: bird uses SVG birds; icon uses Tabler (aligned with bottom nav) */
const SLIDES = [
  {
    title: 'Little Birds',
    body:
      'a little bird is a small moment worth remembering — the coffee that tasted right, a joke that landed, light through the blinds.',
    visual: 'bird',
    birdIndex: 0,
    firstBirdLift: true,
  },
  {
    title: 'log',
    body: 'note one thing you noticed today. something small that made you happy.',
    visual: 'icon',
    iconClass: 'ti ti-feather',
  },
  {
    title: 'feed',
    body: 'swipe through an anonymous collage of tiny joys.',
    visual: 'icon',
    iconClass: 'ti ti-heart',
  },
  {
    title: 'your tree',
    body:
      'everything you save gathers on your tree: a spare list of the small moments that made you glad you looked up.',
    visual: 'icon',
    iconClass: 'ti ti-leaf',
  },
]

export default function OnboardingFlow() {
  const navigate = useNavigate()
  const [step, setStep] = useState(-1)
  const touchStartY = useRef(null)
  const instructionsTouchStart = useRef(null)

  const finish = useCallback(() => {
    markOnboardingComplete()
    navigate('/log', { replace: true })
  }, [navigate])

  function onSwipeAreaStart(e) {
    touchStartY.current = e.touches[0].clientY
  }

  function onSwipeAreaEnd(e) {
    if (touchStartY.current == null) return
    const dy = touchStartY.current - e.changedTouches[0].clientY
    touchStartY.current = null
    if (step === -1 && dy > 48) setStep(0)
  }

  function onInstructionsSwipeStart(e) {
    instructionsTouchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }

  function onInstructionsSwipeEnd(e) {
    const start = instructionsTouchStart.current
    if (start == null) return
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientY
    instructionsTouchStart.current = null

    const dx = x - start.x
    const dy = y - start.y
    const threshold = 48

    if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return

    if (dx < 0) {
      if (step >= SLIDES.length - 1) finish()
      else setStep(step + 1)
    } else if (step > 0) {
      setStep(step - 1)
    }
  }

  if (step === -1) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          maxWidth: 430,
          margin: '0 auto',
          position: 'relative',
          background: colors.bg,
          overflow: 'hidden',
        }}
      >
        <div
          role="presentation"
          onTouchStart={onSwipeAreaStart}
          onTouchEnd={onSwipeAreaEnd}
          style={{
            position: 'absolute',
            inset: 0,
            touchAction: 'none',
          }}
        >
          <img
            src={startScreenUrl}
            alt=""
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
              width: 'auto',
              minWidth: '100%',
              objectFit: 'cover',
              objectPosition: 'right center',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingBottom: 'max(36px, env(safe-area-inset-bottom))',
            paddingTop: 120,
            textAlign: 'center',
            pointerEvents: 'none',
            background:
              `linear-gradient(to bottom, transparent 0%, ${colors.bg} 55%)`,
          }}
        >
          <p
            style={{
              fontFamily: fontBody,
              fontWeight: 400,
              fontSize: 13,
              letterSpacing: '0.04em',
              color: colors.textDark,
              margin: '0 0 10px',
            }}
          >
            swipe up to start
          </p>
          <i
            className="ti ti-chevron-down"
            style={{
              fontSize: 22,
              color: colors.textMuted,
              display: 'block',
              lineHeight: 1,
              opacity: 0.85,
            }}
            aria-hidden
          />
        </div>
      </div>
    )
  }

  const slide = SLIDES[step]
  const birdIdx = slide.visual === 'bird' ? slide.birdIndex % BIRD_COUNT : 0
  const birdW = birdDisplayWidth(56, birdIdx)

  return (
    <div
      style={{
        minHeight: '100dvh',
        maxWidth: 430,
        margin: '0 auto',
        background: colors.bg,
        padding: '16px 24px max(28px, env(safe-area-inset-bottom))',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <button
        type="button"
        onClick={finish}
        style={{
          position: 'absolute',
          top: 14,
          right: 20,
          border: 'none',
          background: 'none',
          fontFamily: fontBody,
          fontWeight: 300,
          fontSize: 12,
          color: colors.textFaint,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          padding: 8,
        }}
      >
        skip
      </button>

      <div
        role="presentation"
        onTouchStart={onInstructionsSwipeStart}
        onTouchEnd={onInstructionsSwipeEnd}
        onTouchCancel={() => {
          instructionsTouchStart.current = null
        }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 40,
          paddingBottom: 24,
          touchAction: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 28,
            minHeight: 64,
          }}
        >
          {slide.visual === 'bird' ? (
            <img
              src={BIRD_SRC[birdIdx]}
              alt=""
              width={birdW}
              height="auto"
              style={{
                display: 'block',
                transform: slide.firstBirdLift ? 'translateY(-70%)' : undefined,
              }}
            />
          ) : (
            <i
              className={slide.iconClass}
              style={{ fontSize: 52, color: colors.textDark, lineHeight: 1 }}
              aria-hidden
            />
          )}
        </div>
        {slide.title ? (
          <h2
            style={{
              fontFamily: fontBody,
              fontWeight: 400,
              fontSize: 13,
              textTransform: step === 0 ? 'none' : 'uppercase',
              letterSpacing: step === 0 ? '0.06em' : '0.14em',
              color: colors.textMuted,
              margin: '0 0 16px',
              textAlign: 'center',
            }}
          >
            {slide.title}
          </h2>
        ) : null}
        <p
          style={{
            fontFamily: fontBody,
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.65,
            color: colors.textDark,
            margin: 0,
            textAlign: 'center',
          }}
        >
          {slide.body}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 6,
          marginBottom: 12,
        }}
      >
        {SLIDES.map((_, i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: step === i ? colors.red : colors.textGhost,
              opacity: step === i ? 1 : 0.35,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => (step >= SLIDES.length - 1 ? finish() : setStep(step + 1))}
        style={{
          fontFamily: fontBody,
          fontWeight: 400,
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          background: colors.red,
          color: colors.bg,
          border: 'none',
          borderRadius: 6,
          padding: '14px 24px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {step >= SLIDES.length - 1 ? 'try it' : 'next'}
      </button>
    </div>
  )
}
