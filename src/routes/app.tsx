import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: AppLayout,
})

function AppLayout({ children }: { children: React.ReactNode }) {
  return <Outlet />
}
