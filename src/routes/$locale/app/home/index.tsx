import { createFileRoute } from '@tanstack/react-router'
import { Route as AppHome } from '../../../../routes/app/home/index'

export const Route = createFileRoute('/$locale/app/home/')({
  component: AppHome.component ?? AppHomeShim,
})

function AppHomeShim() {
  return <div />
}
