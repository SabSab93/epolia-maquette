import { HomePage } from './HomePage'
import { OnboardingPage } from './OnboardingPage'
import { useAuth } from '../contexts/AuthContext'

export function EntryPage() {
  const { user } = useAuth()

  if (user) {
    return <HomePage />
  }

  return <OnboardingPage />
}
