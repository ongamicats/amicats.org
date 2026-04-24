import { Navigate, createFileRoute } from '@tanstack/react-router'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'

export const Route = createFileRoute('/$locale/app')({
  loader: async ({ params, cookieHeader, location }) => {
    const { locale } = resolveLocale({ params, cookieHeader })
    if (params?.locale !== locale) {
      const to = `/${locale}/app${location?.search ?? ''}${location?.hash ?? ''}`
      throw new Navigate({ to, replace: true })
    }
    return null
  },
  component: AppLayout,
})

function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
