// Paranoid deterministic i18n fixtures for tests
//
// This file registers a narrow mock for the app's catalog-loader so tests
// never perform dynamic imports at runtime. The mock returns the real JSON
// catalogs checked into the repo, ensuring deterministic translations during
// tests and preventing the loader's dynamic import paths from causing
// non-deterministic behavior in the test runner.

import { vi } from 'vitest'
import enJson from '../locales/en/messages.json'
import ptJson from '../locales/pt-BR/messages.json'
import type { Locale } from '@/integrations/lingui/locales'

// Normalize possible `default` export shape from JSON imports
const EN = (enJson as any).default ?? enJson
const PT = (ptJson as any).default ?? ptJson

const CATALOGS: Record<Locale, Record<string, string>> = {
  en: EN as unknown as Record<string, string>,
  'pt-BR': PT as unknown as Record<string, string>,
}

// Mock the exact module the application uses to load catalogs. This is a
// narrow mock: it only replaces `loadCatalog` from the catalog-loader. We
// avoid mocking broad dynamic-import patterns globally — instead we mock the
// one function the app calls, which keeps tests fast and deterministic.
vi.mock('@/integrations/lingui/catalog-loader', async () => {
  return {
    // keep the signature and async behaviour of the real loader
    loadCatalog: async (locale: Locale) => {
      return CATALOGS[locale] ?? {}
    },
  }
})

export function setupI18nMocks() {
  // noop — importing this module registers the mocks. Exposed so setup.ts
  // can call the function and clearly express intent.
}

export {}
