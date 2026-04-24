import React, { useEffect } from 'react'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import type { Locale } from './locales'

interface LinguiProviderProps {
  locale: Locale
  catalog: Record<string, string>
  children: React.ReactNode
}

export function LinguiProvider({ locale, catalog, children }: LinguiProviderProps) {
  useEffect(() => {
    i18n.load(locale, catalog)
    i18n.activate(locale)
    try {
      document.documentElement.lang = locale
    } catch {
      // noop on SSR
    }
  }, [locale, catalog])

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
