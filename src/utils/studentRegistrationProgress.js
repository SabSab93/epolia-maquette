const STORAGE_KEY = 'epolia-student-registration-progress'

export function loadStudentRegistrationProgress() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveStudentRegistrationProgress(progress) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const current = loadStudentRegistrationProgress() ?? {}
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...progress }))
  } catch {
    // no-op
  }
}

export function clearStudentRegistrationProgress() {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // no-op
  }
}
