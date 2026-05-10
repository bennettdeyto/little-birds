import { useEffect, useState } from 'react'
import { colors } from '../lib/colors'

export default function BottomSheet({ open, onClose, children }) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [open])

  if (!open) return null

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 430,
          background: colors.bg,
          borderRadius: '20px 20px 0 0',
          padding: 24,
          boxSizing: 'border-box',
          position: 'relative',
          transform: entered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.25s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  )
}
