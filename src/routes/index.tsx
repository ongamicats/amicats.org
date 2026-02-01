import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: LandingPageWrapper,
})

import { LandingPage } from './landing/index'

function LandingPageWrapper() {
  return <LandingPage />
}

