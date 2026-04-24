import { createFileRoute, Navigate } from '@tanstack/react-router'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'

export const Route = createFileRoute('/')({
  loader: async ({ cookieHeader, location }) => {
    const { locale } = resolveLocale({ cookieHeader })
    const to = `/${locale}/${location?.search ?? ''}${location?.hash ?? ''}`
    throw new Navigate({ to, replace: true })
  },
  component: Redirect,
})

function Redirect() {
  return null
}
