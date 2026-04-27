import React, { useEffect } from 'react'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import type { Locale } from './locales'

interface LinguiProviderProps {
  locale: Locale
  catalog: Record<string, string>
  children: React.ReactNode
}

export function LinguiProvider({
  locale,
  catalog,
  children,
}: LinguiProviderProps) {
  // If the root loader provided locale and catalog synchronously (SSR),
  // activate them immediately so the first paint has translations and the
  // provider won't render a null/fallback on hydrate.
  if (locale && catalog && i18n.locale !== locale) {
    try {
      i18n.load(locale, catalog)
      i18n.activate(locale)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = locale
      }
    } catch {
      // best-effort; ignore failures in limited runtimes
    }
  }

  // Keep effect for client navigations / hydration where synchronous
  // activation didn't run (or props change afterwards).
  useEffect(() => {
    if (locale && catalog && i18n.locale !== locale) {
      i18n.load(locale, catalog)
      i18n.activate(locale)
    }
    try {
      if (typeof document !== 'undefined')
        document.documentElement.lang = locale
    } catch {
      // noop on SSR
    }
  }, [locale, catalog])

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
