import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'
import { NotFound } from './not-found'

import type { QueryClient } from '@tanstack/react-query'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'
import { loadCatalog } from '@/integrations/lingui/catalog-loader'
import { LinguiProvider } from '@/integrations/lingui/provider'
import type { Locale } from '@/integrations/lingui/locales'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Amicats.org',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  // Resolve locale server-side and load Lingui catalog so SSR renders with
  // the correct strings. The root loader SHOULD NOT unconditionally
  // redirect. Locale-prefixed routes or dedicated shims handle redirects.
  loader: async ({ params, cookieHeader }) => {
    const { locale } = resolveLocale({ params, cookieHeader })
    // Load a catalog for SSR rendering when available. Do not redirect here.
    const catalog = await loadCatalog(locale as Locale)
    return { locale, catalog }
  },

  component: AppShell,
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Attempt to read the loader data for the root route to set html lang
  // server-side when available. Fall back to pt-BR.
  const data = Route.useLoaderData?.() as { locale?: Locale; catalog?: Record<string, string> } | undefined
  const lang = data?.locale ?? 'pt-BR'

  return (
    <html lang={lang}>
      <head>
        <meta
          charSet="utf-8"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function AppShell({ children }: { children: React.ReactNode }) {
  // Use the root loader data (locale + catalog) and provide Lingui
  const data = Route.useLoaderData?.() as { locale: Locale; catalog: Record<string, string> } | undefined

  if (!data) return <>{children}</>

  return (
    <LinguiProvider locale={data.locale} catalog={data.catalog}>
      {children}
    </LinguiProvider>
  )
}
