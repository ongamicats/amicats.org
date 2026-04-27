import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'

export const Route = createFileRoute('/$locale/app')({
  loader: async ({ params, cookieHeader }) => {
    const { locale } = resolveLocale({ params, cookieHeader })
    if (params?.locale !== locale) {
      // Redirect to the canonical localized app root using redirect().
      throw redirect({ to: `/${locale}/app/`, replace: true })
    }
    return null
  },
  component: AppLayout,
})

function AppLayout({ children }: { children: React.ReactNode }) {
  // Use Outlet so nested routes render correctly and support code-splitting.
  return <Outlet />
}
