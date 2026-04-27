import { createFileRoute, redirect } from '@tanstack/react-router'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'

export const Route = createFileRoute('/')({
  loader: async ({ cookieHeader }) => {
    const { locale } = resolveLocale({ cookieHeader })
    // Redirect to the localized root path using the framework redirect
    // helper which produces a proper redirect result from loaders.
    throw redirect({ to: `/${locale}/`, replace: true })
  },
  component: Redirect,
})

function Redirect() {
  return null
}
