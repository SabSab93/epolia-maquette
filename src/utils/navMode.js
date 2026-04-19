export const NAV_MODE_STORAGE_KEY = 'epolia-nav-mode'

export function readStoredNavMode() {
  if (typeof window === 'undefined') return null
  return window.sessionStorage.getItem(NAV_MODE_STORAGE_KEY)
}

export function writeStoredNavMode(mode) {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(NAV_MODE_STORAGE_KEY, mode)
}

export function clearStoredNavMode() {
  if (typeof window === 'undefined') return
  window.sessionStorage.removeItem(NAV_MODE_STORAGE_KEY)
}
