import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'
import { NotFound } from './not-found'

import type { QueryClient } from '@tanstack/react-query'
import type { Locale } from '@/integrations/lingui/locales'
import { resolveLocale } from '@/integrations/lingui/resolve-locale'
import { loadCatalog } from '@/integrations/lingui/catalog-loader'
import { LinguiProvider } from '@/integrations/lingui/provider'

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
    const catalog = await loadCatalog(locale)
    return { locale, catalog }
  },

  // Render the full document from the root component so router hooks
  // (useLoaderData) may be used server-side during SSR. Using the
  // shellComponent previously caused router hooks to be called from an
  // unsupported location which resulted in runtime failures.
  component: AppShell,
  notFoundComponent: NotFound,
})

function AppShell({ children }: { children: React.ReactNode }) {
  // Use the root loader data (locale + catalog) and provide Lingui. The
  // root component is allowed to call router hooks which enables setting
  // the <html lang> attribute server-side during SSR.
  const data = Route.useLoaderData?.()

  const lang = data?.locale ?? 'pt-BR'

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0" />
        <HeadContent />
      </head>
      <body>
        <LinguiProvider locale={data?.locale} catalog={data?.catalog}>
          <Outlet />
        </LinguiProvider>

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

