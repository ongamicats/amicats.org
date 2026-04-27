import { createFileRoute, redirect } from '@tanstack/react-router'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'

export const Route = createFileRoute('/app/')({
  loader: async ({ cookieHeader }) => {
    const { locale } = resolveLocale({ cookieHeader })
    // Redirect to the canonical localized app root using redirect().
    throw redirect({ to: `/${locale}/app/`, replace: true })
  },
  component: Redirect,
})

function Redirect() {
  return null
}
