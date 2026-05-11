import { useCallback, useEffect, useRef, useState } from 'react'
import { colors } from '../lib/colors'
import { BIRD_COUNT, BIRD_SRC } from '../lib/birdAssets'
import { birdDisplayWidth } from '../lib/birdWidth'
import { formatEntryDate } from '../lib/formatDate'
import { supabase } from '../lib/supabase'
import { fontBody } from '../lib/type'

function isToday(iso) {
  const d = new Date(iso)
  const now = new Date()
  return d.toDateString() === now.toDateString()
}

export default function Feed() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [dragY, setDragY] = useState(0)
  const [transformTs, setTransformTs] = useState('none')
  const startY = useRef(0)
  const dragYRef = useRef(0)
  const lock = useRef(false)
  const panelRef = useRef(null)
  const pendingAfterExit = useRef(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!supabase) {
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('birds')
        .select('id, text, created_at')
        .order('created_at', { ascending: false })
        .limit(200)
      if (cancelled) return
      if (error || !data) {
        setRows([])
        setLoading(false)
        return
      }
      const today = data.filter((r) => isToday(r.created_at))
      setRows(today)
      setLoading(false)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const moments = rows.map((r) => r.text)
  const lastIdx = Math.max(0, moments.length - 1)
  const safeIndex = Math.min(index, lastIdx)

  const goNextAnimated = useCallback(() => {
    const el = panelRef.current
    if (!el || safeIndex >= lastIdx || lock.current) return
    const h = el.offsetHeight
    lock.current = true
    pendingAfterExit.current = 'next'
    setTransformTs('transform 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)')
    setDragY(-h)
    dragYRef.current = -h
  }, [safeIndex, lastIdx])

  const goPrevAnimated = useCallback(() => {
    const el = panelRef.current
    if (!el || safeIndex <= 0 || lock.current) return
    const h = el.offsetHeight
    lock.current = true
    pendingAfterExit.current = 'prev'
    setTransformTs('transform 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)')
    setDragY(h)
    dragYRef.current = h
  }, [safeIndex])

  function finishEnterFromEdge(direction) {
    const el = panelRef.current
    const h = el ? el.offsetHeight : 400
    setTransformTs('none')
    const start = direction === 'next' ? h : -h
    setDragY(start)
    dragYRef.current = start
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransformTs('transform 0.32s cubic-bezier(0.25, 0.8, 0.25, 1)')
        setDragY(0)
        dragYRef.current = 0
      })
    })
    window.setTimeout(() => {
      setTransformTs('none')
      lock.current = false
    }, 340)
  }

  function onCardTransitionEnd() {
    if (!pendingAfterExit.current) return
    const dir = pendingAfterExit.current
    pendingAfterExit.current = null

    if (dir === 'next') {
      setIndex((i) => Math.min(i + 1, lastIdx))
      finishEnterFromEdge('next')
    } else {
      setIndex((i) => Math.max(i - 1, 0))
      finishEnterFromEdge('prev')
    }
  }

  function onTouchStart(e) {
    if (lock.current) return
    startY.current = e.touches[0].clientY
    setTransformTs('none')
  }

  function onTouchMove(e) {
    if (lock.current) return
    const y = e.touches[0].clientY
    let dy = y - startY.current

    if (safeIndex === 0 && dy > 0) dy *= 0.25
    if (safeIndex >= lastIdx && dy < 0) dy *= 0.25

    dragYRef.current = dy
    setDragY(dy)
  }

  function onTouchEnd() {
    if (lock.current) return
    const dy = dragYRef.current
    const threshold = 56

    if (dy < -threshold && safeIndex < lastIdx) {
      goNextAnimated()
      return
    }
    if (dy > threshold && safeIndex > 0) {
      goPrevAnimated()
      return
    }

    setTransformTs('transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)')
    setDragY(0)
    dragYRef.current = 0
    window.setTimeout(() => setTransformTs('none'), 230)
  }

  const current = moments[safeIndex]
  const birdVariant = safeIndex % BIRD_COUNT
  const birdSrc = BIRD_SRC[birdVariant]
  const birdW = birdDisplayWidth(28, birdVariant)

  const dateLine = `today · ${formatEntryDate(new Date().toISOString())}`

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: colors.bg,
          maxWidth: 430,
          margin: '0 auto',
        }}
      />
    )
  }

  if (!supabase || moments.length === 0) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: colors.bg,
          paddingBottom: 100,
          maxWidth: 430,
          margin: '0 auto',
          padding: '48px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontFamily: fontBody,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 15,
            color: colors.textFaint,
            textAlign: 'center',
            margin: 0,
          }}
        >
          {!supabase
            ? 'connect the app to see birds from today'
            : 'no little birds today yet'}
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: colors.bg,
        paddingBottom: 100,
        maxWidth: 430,
        margin: '0 auto',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p
        style={{
          fontFamily: fontBody,
          fontWeight: 300,
          fontSize: 9,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: colors.textFaint,
          margin: '0 0 8px',
          flexShrink: 0,
          textAlign: 'center',
        }}
      >
        {dateLine}
      </p>

      <p
        style={{
          fontFamily: fontBody,
          fontWeight: 400,
          fontSize: 11,
          lineHeight: 1.5,
          color: colors.textFaint,
          textAlign: 'center',
          margin: '0 0 12px',
          flexShrink: 0,
        }}
      >
        whatever they sing is better than to know
      </p>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              flexShrink: 0,
              minHeight: 300,
              maxHeight: '52dvh',
              touchAction: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              overflow: 'hidden',
              borderRadius: 16,
              position: 'relative',
            }}
          >
            <div
              ref={panelRef}
              onTransitionEnd={onCardTransitionEnd}
              style={{
                height: '100%',
                minHeight: 300,
                background: colors.bgCard,
                border: `0.5px solid ${colors.border}`,
                borderRadius: 16,
                padding: '32px 22px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translateY(${dragY}px)`,
                transition: transformTs,
              }}
            >
              <img
                src={birdSrc}
                alt=""
                width={birdW}
                height="auto"
                style={{ marginBottom: 20, flexShrink: 0 }}
              />
              <p
                style={{
                  fontFamily: fontBody,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: colors.textDark,
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                {current}
              </p>
              <p
                style={{
                  marginTop: 'auto',
                  paddingTop: 24,
                  fontFamily: fontBody,
                  fontWeight: 300,
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: colors.textGhost,
                  flexShrink: 0,
                }}
              >
                swipe up for another
              </p>
            </div>
          </div>

          <p
            style={{
              marginTop: 14,
              textAlign: 'center',
              fontFamily: fontBody,
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: '0.06em',
              color: colors.textFaint,
              flexShrink: 0,
            }}
          >
            {safeIndex + 1} · {moments.length}
          </p>
        </div>
      </div>
    </div>
  )
}
