import { useEffect, useState } from 'react'
import { HomePage } from './HomePage'
import { OnboardingPage } from './OnboardingPage'
import { OnboardingLoadingPage } from './OnboardingLoadingPage'
import { useAuth } from '../contexts/AuthContext'

export function EntryPage() {
  const { user } = useAuth()
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true)

  useEffect(() => {
    if (user) return

    let isCancelled = false

    const imageSources = [
      new URL('../assets/images/auth/connexion-img-1.jpg', import.meta.url).href,
      new URL('../assets/images/auth/connexion-img-2.jpg', import.meta.url).href,
      new URL('../assets/images/auth/connexion-img-3.jpg', import.meta.url).href
    ]

    const preloadImages = imageSources.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image()
          image.onload = () => resolve(true)
          image.onerror = () => resolve(false)
          image.src = src
        })
    )

    const loadingTimeout = new Promise((resolve) => {
      window.setTimeout(resolve, 1800)
    })

    Promise.race([Promise.all(preloadImages), loadingTimeout]).then(() => {
      if (!isCancelled) {
        setIsLoadingOnboarding(false)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [user])

  if (user) {
    return <HomePage />
  }

  if (isLoadingOnboarding) {
    return <OnboardingLoadingPage />
  }

  return <OnboardingPage />
}
