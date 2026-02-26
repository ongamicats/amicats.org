import { createFileRoute } from '@tanstack/react-router'

import { LandingPage } from './landing/index'

export const Route = createFileRoute('/')({
  component: LandingPageWrapper,
})

function LandingPageWrapper() {
  return <LandingPage />
}

