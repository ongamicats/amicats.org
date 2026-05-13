import React, { useEffect } from 'react';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import type { Locale } from './locales';

interface LinguiProviderProps {
  // locale may be undefined during root render if no $locale route is
  // active (for example visiting `/`), so allow nullable values.
  locale?: Locale | null;
  // catalog must be the object returned from importing messages.po which
  // exposes `messages` per the official Lingui Vite workflow.
  catalog: { messages?: Record<string, string> } | null;
  children: React.ReactNode;
}

export function LinguiProvider({
  locale,
  catalog,
  children,
}: LinguiProviderProps) {
  // Synchronously load & activate on first render so SSR output contains
  // translations and hydration matches server HTML. Use loadAndActivate
  // when available via the i18n API — otherwise fall back to load + activate.
  // Guard against missing catalog to avoid activating with null messages
  // which would cause Lingui to render as not-ready and produce the
  // observed blank-page regression.
  if (locale && catalog && catalog.messages && i18n.locale !== locale) {
    try {
      const messages = catalog.messages;
      // i18n.loadAndActivate is convenient but not present on all versions
      // so attempt it and fall back to load + activate.
      if (typeof (i18n as any).loadAndActivate === 'function') {
        (i18n as any).loadAndActivate({ locale, messages });
      } else {
        i18n.load(locale, messages);
        i18n.activate(locale);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = locale;
      }
    } catch {
      // best-effort
    }
  }

  useEffect(() => {
    if (locale && catalog && catalog.messages && i18n.locale !== locale) {
      try {
        const messages = catalog.messages;
        if (messages) {
          if (typeof (i18n as any).loadAndActivate === 'function') {
            (i18n as any).loadAndActivate({ locale, messages });
          } else {
            i18n.load(locale, messages);
            i18n.activate(locale);
          }
        }
      } catch {
        // noop
      }
    }
    try {
      if (typeof document !== 'undefined')
        document.documentElement.lang = locale;
    } catch {}
  }, [locale, catalog]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
