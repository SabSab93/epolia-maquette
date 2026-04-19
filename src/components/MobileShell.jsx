import { Navbar } from './Navbar'
import { useAuth } from '../contexts/AuthContext'
import { useLocation } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { readStoredNavMode, writeStoredNavMode } from '../utils/navMode'

export function MobileShell({ children, withNav = false }) {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const isStudentRoute = pathname.startsWith('/dashboard-etudiant') || pathname.startsWith('/missions-etudiant')
  const isSharedNavRoute = pathname.startsWith('/messages') || pathname === '/profil'
  const storedNavMode = readStoredNavMode()

  useEffect(() => {
    if (user?.type === 'etudiant' || isStudentRoute) {
      writeStoredNavMode('etudiant')
    }
    if (user?.type === 'particulier') {
      writeStoredNavMode('particulier')
    }
  }, [isStudentRoute, user?.type])

  const isStudentContext = useMemo(() => {
    if (user?.type === 'etudiant') return true
    if (isStudentRoute) return true
    return isSharedNavRoute && storedNavMode === 'etudiant'
  }, [isSharedNavRoute, isStudentRoute, storedNavMode, user?.type])

  const showNav = withNav && (Boolean(user) || isStudentContext)

  return (
    <div className="epolia-page-bg min-h-screen">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-transparent">
        <div className="pointer-events-none absolute -left-16 top-14 h-44 w-44 rounded-full bg-[#58126A]/12 blur-3xl" />
        <div className="pointer-events-none absolute right-[-56px] top-[-12px] h-52 w-52 rounded-full bg-[#A592D4]/18 blur-3xl" />
        <div className="pointer-events-none absolute left-[-22px] bottom-24 h-36 w-36 rounded-full bg-[#C3E841]/14 blur-3xl" />
        <div className="pointer-events-none absolute right-[-32px] bottom-16 h-36 w-36 rounded-full bg-[#FF661A]/13 blur-2xl" />
        <div className="pointer-events-none absolute left-[28%] top-[42%] h-32 w-32 rounded-full bg-[#F3E8CC]/30 blur-2xl" />

        <main className={showNav ? 'relative z-10 pb-24' : 'relative z-10'}>{children}</main>
        {showNav ? <Navbar /> : null}
      </div>
    </div>
  )
}
