import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

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
  const [user, setUser] = useState(null)

  const login = ({ email }) => {
    const nextUser = buildUserFromEmail(email)
    setUser(nextUser)
    return nextUser
  }

  const registerParticulier = ({ firstName, email, city }) => {
    setUser({
      type: 'particulier',
      firstName,
      email,
      city
    })
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, login, logout, registerParticulier }),
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
