import { createFileRoute, Navigate } from '@tanstack/react-router'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'

export const Route = createFileRoute('/$locale')({
  loader: async ({ params, cookieHeader, location }) => {
    const { locale, redirected } = resolveLocale({ params, cookieHeader })
    // If the requested :locale is invalid, redirect to the resolved
    // locale while preserving the remainder of the path.
    if (redirected) {
      const path = location?.pathname === '/' ? '/' : location?.pathname ?? '/'
      const to = `/${locale}${path}`
      throw new Navigate({ to, replace: true })
    }
    return null
  },
  component: LocaleLayout,
})

function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
