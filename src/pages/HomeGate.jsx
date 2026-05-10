import { Navigate } from 'react-router-dom'
import { hasCompletedOnboarding } from '../lib/onboarding'
import OnboardingFlow from './OnboardingFlow'

export default function HomeGate() {
  if (typeof window !== 'undefined' && hasCompletedOnboarding()) {
    return <Navigate to="/log" replace />
  }
  return <OnboardingFlow />
}
