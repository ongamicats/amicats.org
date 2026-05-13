// Paranoid deterministic i18n fixtures for tests
//
// This file registers a narrow mock for the app's catalog-loader so tests
// never perform dynamic imports at runtime. The mock returns the real JSON
// catalogs checked into the repo, ensuring deterministic translations during
// tests and preventing the loader's dynamic import paths from causing
// non-deterministic behavior in the test runner.

import { vi } from 'vitest';
import type { Locale } from '@/integrations/lingui/locales';
// Tests should use deterministic mock catalogs. During the Lingui .po
// migration we keep a narrow fixture that maps locale -> messages map.
// Import compiled JSON fixtures if present; otherwise provide minimal
// inline stubs so tests remain deterministic without depending on the
// project's build output.
let enJson: any;
let ptJson: any;
try {
  enJson = await import('../locales/en/messages.json');
} catch {
  try {
    enJson = await import('../../src/locales/en/messages.json');
  } catch {
    enJson = {};
  }
}
try {
  ptJson = await import('../locales/pt-BR/messages.json');
} catch {
  ptJson = {};
}

// Normalize possible `default` export shape from JSON imports
const EN = enJson.default ?? enJson;
const PT = ptJson.default ?? ptJson;

// If compiled JSON fixtures are available (from Lingui build) use them;
// otherwise use minimal maps derived from the PO files via messages keys
// for basic tests. The test harness's mocking of catalog-loader keeps
// loader imports deterministic.
const CATALOGS: Record<Locale, Record<string, string>> = {
  en: EN as unknown as Record<string, string>,
  'pt-BR': PT as unknown as Record<string, string>,
};

// Mock the exact module the application uses to load catalogs. This is a
// narrow mock: it only replaces `loadCatalog` from the catalog-loader. We
// avoid mocking broad dynamic-import patterns globally — instead we mock the
// one function the app calls, which keeps tests fast and deterministic.
vi.mock('@/integrations/lingui/catalog-loader', async () => {
  return {
    // keep the signature and async behaviour of the real loader
    loadCatalog: async (locale: Locale) => {
      return CATALOGS[locale] ?? {};
    },
  };
});

export function setupI18nMocks() {
  // noop — importing this module registers the mocks. Exposed so setup.ts
  // can call the function and clearly express intent.
}

export {};
