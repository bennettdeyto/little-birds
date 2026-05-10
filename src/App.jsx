import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import GlobalInfoButton from './components/GlobalInfoButton'
import LogInfoModal from './components/LogInfoModal'
import { getUserId, syncFromSupabase } from './lib/storage'
import Board from './pages/Board'
import Feed from './pages/Feed'
import Log from './pages/Log'
import Poem from './pages/Poem'
import HomeGate from './pages/HomeGate'
import TreePage from './pages/Tree'
import { colors } from './lib/colors'

function AppShell({ children }) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: colors.bg,
        position: 'relative',
      }}
    >
      {children}
      <BottomNav />
    </div>
  )
}

export default function App() {
  const [infoOpen, setInfoOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const userId = getUserId()
    syncFromSupabase(userId)
  }, [])

  const showHelp = pathname !== '/'

  return (
    <>
      {showHelp && <GlobalInfoButton onClick={() => setInfoOpen(true)} />}
      <LogInfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />
      <Routes>
        <Route path="/" element={<HomeGate />} />
        <Route
          path="/log"
          element={
            <AppShell>
              <Log />
            </AppShell>
          }
        />
        <Route
          path="/feed"
          element={
            <AppShell>
              <Feed />
            </AppShell>
          }
        />
        <Route
          path="/tree"
          element={
            <AppShell>
              <TreePage />
            </AppShell>
          }
        />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/poem" element={<Poem />} />
      </Routes>
    </>
  )
}
