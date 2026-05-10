import { useState } from 'react'
import BirdOnTree from '../components/BirdOnTree'
import BottomSheet from '../components/BottomSheet'
import { colors } from '../lib/colors'
import { formatEntryDate } from '../lib/formatDate'
import { getBirds } from '../lib/storage'
import { supabase } from '../lib/supabase'
import { fontBody } from '../lib/type'
import treeUrl from '../assets/Tree.svg?url'

export default function TreePage() {
  const [view, setView] = useState('tree')
  const [sheetBird, setSheetBird] = useState(null)
  const [shareUrl, setShareUrl] = useState(null)
  const [shareBusy, setShareBusy] = useState(false)
  const [shareHint, setShareHint] = useState(null)

  const birds = getBirds()
  const birdsOldestFirst = [...birds].reverse()

  async function createShareBoard() {
    if (!supabase) {
      setShareHint('add Supabase keys in .env to share a board')
      return
    }
    setShareBusy(true)
    setShareHint(null)
    try {
      const id = Math.random().toString(36).slice(2, 8)
      const entries = getBirds()
      const { error } = await supabase.from('boards').insert({
        id,
        entries,
      })
      if (error) throw error
      setShareUrl(`${window.location.origin}/board/${id}`)
    } catch {
      setShareUrl(null)
      setShareHint('could not save the board — try again')
    } finally {
      setShareBusy(false)
    }
  }

  function openShareFromSheet() {
    setSheetBird(null)
    createShareBoard()
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: colors.bg,
        maxWidth: 430,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 16px 8px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            border: `0.5px solid ${colors.border}`,
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setView('tree')}
            style={{
              border: 'none',
              background: view === 'tree' ? colors.bgCard : 'transparent',
              color: view === 'tree' ? colors.red : colors.textFaint,
              fontFamily: fontBody,
              fontWeight: 300,
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            tree
          </button>
          <button
            type="button"
            onClick={() => setView('list')}
            style={{
              border: 'none',
              background: view === 'list' ? colors.bgCard : 'transparent',
              color: view === 'list' ? colors.red : colors.textFaint,
              fontFamily: fontBody,
              fontWeight: 300,
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            all birds
          </button>
        </div>
      </div>

      {view === 'tree' ? (
        <>
          <div style={{ position: 'relative', flex: 1, minHeight: '55dvh' }}>
            <img
              src={treeUrl}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                minHeight: '55dvh',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <BirdOnTree
              birdsOldestFirst={birdsOldestFirst}
              onBirdClick={(b) => setSheetBird(b)}
            />
          </div>
          <div
            style={{
              padding: '20px 20px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: fontBody,
                fontWeight: 300,
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: colors.textFaint,
              }}
            >
              {birds.length} birds
            </p>
            <button
              type="button"
              onClick={createShareBoard}
              disabled={shareBusy}
              style={{
                border: `0.5px solid ${colors.redLight}`,
                color: colors.red,
                background: 'transparent',
                borderRadius: 10,
                padding: '10px 20px',
                fontFamily: fontBody,
                fontWeight: 300,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: shareBusy ? 'wait' : 'pointer',
              }}
            >
              share board
            </button>
          </div>
        </>
      ) : (
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 8,
          }}
        >
          {birds.length === 0 ? (
            <p
              style={{
                fontFamily: fontBody,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 14,
                color: colors.textFaint,
                textAlign: 'center',
                marginTop: 40,
              }}
            >
              the branches are still empty
            </p>
          ) : (
            birds.map((b) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '14px 0',
                  borderBottom: `0.5px solid #E8E0D4`,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    fontFamily: fontBody,
                    fontWeight: 300,
                    fontSize: 9,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: colors.textFaint,
                    width: 72,
                  }}
                >
                  {formatEntryDate(b.created_at)}
                </span>
                <p
                  style={{
                    margin: 0,
                    flex: 1,
                    fontFamily: fontBody,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: colors.textMid,
                  }}
                >
                  {b.text}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      <BottomSheet
        key={sheetBird?.id ?? 'closed'}
        open={!!sheetBird}
        onClose={() => setSheetBird(null)}
      >
        {sheetBird && (
          <>
            <button
              type="button"
              onClick={() => setSheetBird(null)}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 8,
                color: colors.textMuted,
              }}
            >
              <i className="ti ti-x" style={{ fontSize: 22 }} />
            </button>
            <p
              style={{
                fontFamily: fontBody,
                fontWeight: 300,
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: colors.textFaint,
                margin: '0 0 12px',
              }}
            >
              {formatEntryDate(sheetBird.created_at)}
            </p>
            <p
              style={{
                fontFamily: fontBody,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 18,
                lineHeight: 1.45,
                color: colors.textDark,
                margin: '0 0 20px',
                paddingRight: 32,
              }}
            >
              {sheetBird.text}
            </p>
            <button
              type="button"
              onClick={openShareFromSheet}
              style={{
                border: `0.5px solid ${colors.redLight}`,
                color: colors.red,
                background: 'transparent',
                borderRadius: 10,
                padding: '10px 16px',
                fontFamily: fontBody,
                fontWeight: 300,
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              share board
            </button>
          </>
        )}
      </BottomSheet>

      {(shareUrl || shareHint) && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => {
            setShareUrl(null)
            setShareHint(null)
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: colors.bgCard,
              border: `0.5px solid ${colors.border}`,
              borderRadius: 12,
              padding: 24,
              maxWidth: 360,
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: fontBody,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 14,
                color: colors.textMid,
                margin: '0 0 12px',
              }}
            >
              share board
            </p>
            {shareUrl && (
              <p
                style={{
                  wordBreak: 'break-all',
                  fontFamily: fontBody,
                  fontSize: 12,
                  fontWeight: 300,
                  color: colors.textDark,
                  margin: '0 0 16px',
                }}
              >
                {shareUrl}
              </p>
            )}
            {shareHint && (
              <p
                style={{
                  fontFamily: fontBody,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 13,
                  color: colors.textMuted,
                  margin: '0 0 16px',
                }}
              >
                {shareHint}
              </p>
            )}
            {shareUrl && (
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl)
                }}
                style={{
                  border: `0.5px solid ${colors.border}`,
                  background: colors.bg,
                  color: colors.red,
                  borderRadius: 8,
                  padding: '10px 16px',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  marginRight: 8,
                }}
              >
                copy
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setShareUrl(null)
                setShareHint(null)
              }}
              style={{
                border: 'none',
                background: 'none',
                color: colors.textMuted,
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
