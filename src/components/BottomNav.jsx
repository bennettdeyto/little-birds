import { NavLink, useLocation } from 'react-router-dom'
import { colors } from '../lib/colors'
import { fontBody } from '../lib/type'

const tabs = [
  { label: 'log', icon: 'feather', path: '/log' },
  { label: 'feed', icon: 'heart', path: '/feed' },
  { label: 'tree', icon: 'leaf', path: '/tree' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  if (
    pathname === '/' ||
    pathname.startsWith('/board/') ||
    pathname === '/poem'
  ) {
    return null
  }

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        borderTop: `0.5px solid ${colors.border}`,
        background: colors.bg,
        paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        paddingTop: 10,
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {tabs.map((t) => (
          <NavLink
            key={t.path}
            to={t.path}
            style={({ isActive }) => ({
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              color: isActive ? colors.red : colors.textFaint,
            })}
          >
            <i className={`ti ti-${t.icon}`} style={{ fontSize: 20 }} />
            <span
              style={{
                fontFamily: fontBody,
                fontWeight: 300,
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {t.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
