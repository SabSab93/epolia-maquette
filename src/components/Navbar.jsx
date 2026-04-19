import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { readStoredNavMode, writeStoredNavMode } from '../utils/navMode'
import { useEffect, useMemo } from 'react'

const particulierNavItems = [
  {
    to: '/fil-annonces',
    label: 'Accueil',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    )
  },
  {
    to: '/favoris',
    label: 'Favoris',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M12 20.5s-7-4.35-7-10a4 4 0 0 1 7-2.6 4 4 0 0 1 7 2.6c0 5.65-7 10-7 10Z" />
      </svg>
    )
  },
  {
    to: '/messages',
    label: 'Messages',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M4 6h16v10H7l-3 3V6Z" />
      </svg>
    )
  },
  {
    to: '/profil',
    label: 'Profil',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20a8 8 0 0 1 16 0" />
      </svg>
    )
  }
]

const etudiantNavItems = [
  {
    to: '/dashboard-etudiant',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-3H4v3Zm10-7h6v-3h-6v3Z" />
      </svg>
    )
  },
  {
    to: '/messages',
    label: 'Message',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path d="M4 6h16v10H7l-3 3V6Z" />
      </svg>
    )
  },
  {
    to: '/missions-etudiant',
    label: 'Missions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M9 7V5h6v2" />
      </svg>
    )
  },
  {
    to: '/profil',
    label: 'Profil',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20a8 8 0 0 1 16 0" />
      </svg>
    )
  }
]

export function Navbar() {
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

  const navItems = isStudentContext ? etudiantNavItems : particulierNavItems

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-between border-t border-epolia-purple/10 bg-white/95 px-3 pb-[max(0.8rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex min-w-[64px] flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-epolia-orange' : 'text-epolia-purple/45'
            }`
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
