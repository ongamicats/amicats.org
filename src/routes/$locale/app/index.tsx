import { createFileRoute } from '@tanstack/react-router'

// Localized app index: provide a simple self-contained component
// to avoid importing other Route objects (which breaks code-splitting).
export const Route = createFileRoute('/$locale/app/')({
  component: LocalizedAppIndex,
})

function LocalizedAppIndex() {
  return <div />
}
