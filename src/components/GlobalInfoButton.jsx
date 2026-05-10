import { colors } from '../lib/colors'
import { fontBody } from '../lib/type'

export default function GlobalInfoButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="More about Little Birds"
      style={{
        position: 'fixed',
        top: 12,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: `0.5px solid ${colors.border}`,
        background: colors.bgCard,
        color: colors.textFaint,
        fontFamily: fontBody,
        fontWeight: 400,
        fontSize: 16,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        padding: 0,
        zIndex: 50,
      }}
    >
      ?
    </button>
  )
}
