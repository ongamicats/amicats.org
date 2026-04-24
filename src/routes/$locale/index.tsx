import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '../landing'

export const Route = createFileRoute('/$locale/')({
  component: LocalizedLanding,
})

function LocalizedLanding() {
  return <LandingPage />
}
