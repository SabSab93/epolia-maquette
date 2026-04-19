import { profileAvatars } from '../data/profileAvatars'

function hashString(value = '') {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }
  return Math.abs(hash)
}

export function getProfileAvatar(user) {
  if (user?.avatar) return user.avatar

  const seed = `${user?.email ?? ''}-${user?.firstName ?? ''}-${user?.type ?? ''}`
  const hash = hashString(seed)
  const index = hash % profileAvatars.length
  return profileAvatars[index] ?? profileAvatars[0]
}
