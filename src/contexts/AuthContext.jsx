import { createContext, useContext, useMemo, useState } from 'react'
import { clearStoredNavMode, writeStoredNavMode } from '../utils/navMode'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'epolia-auth-user'

function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function formatFirstName(value = '') {
  if (!value) return 'Visiteur'
  return `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`
}

function buildUserFromEmail(rawEmail = '') {
  const email = String(rawEmail).trim()
  const normalizedEmail = normalizeText(email)
  const localPart = email.split('@')[0] ?? ''
  const firstToken = localPart.split(/[._-]/)[0] ?? ''

  const isStudent = normalizedEmail.includes('etudiant')
  const isParticulier = normalizedEmail.includes('particulier')
  const type = isStudent ? 'etudiant' : isParticulier ? 'particulier' : 'particulier'

  return {
    type,
    firstName: formatFirstName(firstToken),
    email
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null

    const raw = window.sessionStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null

    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  })

  const saveUser = (nextUser) => {
    setUser(nextUser)
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    }
    if (nextUser?.type) {
      writeStoredNavMode(nextUser.type)
    }
    return nextUser
  }

  const login = ({ email }) => {
    const nextUser = buildUserFromEmail(email)
    return saveUser(nextUser)
  }

  const registerParticulier = ({ firstName, email, city }) => {
    return saveUser({
      type: 'particulier',
      firstName,
      email,
      city
    })
  }

  const registerEtudiant = ({ firstName, email }) => {
    const nextUser = {
      type: 'etudiant',
      firstName: formatFirstName(firstName),
      email: String(email ?? '').trim()
    }
    return saveUser(nextUser)
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
    }
    clearStoredNavMode()
  }

  const value = useMemo(
    () => ({ user, login, logout, registerParticulier, registerEtudiant }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
