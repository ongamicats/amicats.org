import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$locale/app/home/')({
  component: LocalizedAppHome,
})

function LocalizedAppHome() {
  // Keep the localized route simple and self-contained to avoid importing
  // other Route objects (which can confuse the router's code-splitting).
  return <div>Hello "/app/home/"!</div>
}
