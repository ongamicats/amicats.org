import { createFileRoute } from '@tanstack/react-router'
import { Route as AppRoute } from '@/routes/app'

// Localized app index: reuse the main app route component if available.
export const Route = createFileRoute('/$locale/app/')({
  component: AppRoute.component ?? AppIndexShim,
})

function AppIndexShim() {
  return <div />
}
