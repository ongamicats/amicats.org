import { createFileRoute, redirect } from '@tanstack/react-router'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'

export const Route = createFileRoute('/app/home/')({
  loader: async ({ cookieHeader }) => {
    const { locale } = resolveLocale({ cookieHeader })
    // Canonical entry for app routes is locale-prefixed. Redirect to
    // /{locale}/app/home/ to preserve the locale-of-truth.
    throw redirect({ to: `/${locale}/app/home/`, replace: true })
  },
  component: Redirect,
})

function Redirect() {
  return null
}
