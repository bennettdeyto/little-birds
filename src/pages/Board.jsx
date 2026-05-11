import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { colors } from '../lib/colors'
import { BIRD_COUNT, BIRD_SRC } from '../lib/birdAssets'
import { birdDisplayWidth } from '../lib/birdWidth'
import { formatEntryDate } from '../lib/formatDate'
import { fontBody } from '../lib/type'
import { supabase } from '../lib/supabase'

export default function Board() {
  const { id } = useParams()
  const [entries, setEntries] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!id) return
      if (!supabase) {
        setNotFound(true)
        return
      }
      const { data, error } = await supabase
        .from('boards')
        .select('entries')
        .eq('id', id)
        .maybeSingle()
      if (cancelled) return
      if (error || !data) {
        setNotFound(true)
        return
      }
      const list = Array.isArray(data.entries) ? data.entries : []
      setEntries(list)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [id])

  const ordered = useMemo(() => {
    if (!entries) return []
    return [...entries].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    )
  }, [entries])

  if (notFound) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: colors.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          maxWidth: 430,
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontFamily: fontBody,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 16,
            color: colors.textFaint,
            textAlign: 'center',
            margin: 0,
          }}
        >
          this flock has flown
        </p>
      </div>
    )
  }

  if (entries === null) {
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

  if (entries.length === 0) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: colors.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          maxWidth: 430,
          margin: '0 auto',
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
          this branch was shared before anything landed
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: colors.bg,
        maxWidth: 430,
        margin: '0 auto',
        padding: '28px 16px 40px',
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1
          style={{
            fontFamily: fontBody,
            fontSize: 18,
            fontWeight: 400,
            color: colors.textDark,
            margin: '0 0 8px',
          }}
        >
          a few little birds
        </h1>
        <p
          style={{
            fontFamily: fontBody,
            fontWeight: 300,
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: colors.textFaint,
            margin: 0,
          }}
        >
          things that made someone feel alive lately
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}
      >
        {ordered.map((entry, index) => {
          const v = index % BIRD_COUNT
          return (
          <article
            key={entry.id || index}
            style={{
              background: colors.bgCard,
              border: `0.5px solid ${colors.border}`,
              borderRadius: 10,
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={BIRD_SRC[v]}
              alt=""
              width={birdDisplayWidth(24, v)}
              height="auto"
              style={{ marginBottom: 8 }}
            />
            <p
              style={{
                margin: 0,
                fontFamily: fontBody,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 11,
                lineHeight: 1.45,
                color: '#4a3f2a',
                textAlign: 'center',
              }}
            >
              {entry.text}
            </p>
            <p
              style={{
                marginTop: 10,
                marginBottom: 0,
                fontFamily: fontBody,
                fontWeight: 300,
                fontSize: 9,
                color: colors.textFaint,
              }}
            >
              {formatEntryDate(entry.created_at)}
            </p>
          </article>
          )
        })}
      </div>
    </div>
  )
}
