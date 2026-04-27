import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'

export const Route = createFileRoute('/$locale')({
  loader: async ({ params, cookieHeader }) => {
    const { locale, redirected } = resolveLocale({ params, cookieHeader })
    // If the requested :locale is invalid, redirect to the resolved
    // locale while preserving the remainder of the path.
    if (redirected) {
      // Use the redirect() helper to produce a proper loader redirect.
      throw redirect({ to: `/${locale}/`, replace: true })
    }
    return null
  },
  component: LocaleLayout,
})

function LocaleLayout({ children }: { children: React.ReactNode }) {
  // Use Outlet to render nested routes instead of directly returning
  // children. This ensures the file-based router can code-split and mount
  // nested route components correctly.
  return <Outlet />
}
