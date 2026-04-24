import { createFileRoute } from '@tanstack/react-router'
import { NotFound as GlobalNotFound } from '../not-found'

export const Route = createFileRoute('/$locale/not-found')({
  component: LocalizedNotFound,
})

function LocalizedNotFound() {
  return <GlobalNotFound />
}
