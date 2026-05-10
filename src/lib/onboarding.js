const KEY = 'lb_onboarding_complete'

export function hasCompletedOnboarding() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function markOnboardingComplete() {
  try {
    localStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
}
