import { useEffect, useState } from 'react'
import { HomePage } from './HomePage'
import { OnboardingPage } from './OnboardingPage'
import { OnboardingLoadingPage } from './OnboardingLoadingPage'
import { useAuth } from '../contexts/AuthContext'
import { onboardingSlides } from '../data/onboardingSlides'

export function EntryPage() {
  const { user } = useAuth()
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true)

  useEffect(() => {
    if (user) return

    let isCancelled = false

    const imageSources = onboardingSlides

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
