import { createElement } from 'react'
import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { i18n } from '@lingui/core'

// Provide a lightweight mock for @lingui/react in the test environment so
// components that call `useLingui()` don't fail if a full I18nProvider isn't
// present. The mock returns the real `i18n` instance from @lingui/core so
// tests can manipulate/activate catalogs via the app's helpers or the
// LinguiProvider wrapper used in some tests.
vi.mock('@lingui/react', async () => {
  const actual = await vi.importActual<any>('@lingui/react').catch(() => ({}))
  return {
    ...actual,
    useLingui: () => ({ i18n }),
    I18nProvider: ({ children }: any) => children,
    Trans: ({ children }: any) => children,
  }
})

// Preload catalogs and activate default locale for tests to avoid race
// conditions where components call i18n._() during render before any
// test explicitly activates a locale. We load the checked-in JSON catalogs
// so tests are deterministic.
import enCatalog from '../locales/en/messages.json'
import ptCatalog from '../locales/pt-BR/messages.json'

const EN = (enCatalog as any).default ?? enCatalog
const PT = (ptCatalog as any).default ?? ptCatalog

try {
  // load both catalogs and activate pt-BR by default
  i18n.load('en', EN as any)
  i18n.load('pt-BR', PT as any)
  i18n.activate('pt-BR')
} catch (e) {
  // ignore failures — tests that wrap with LinguiProvider will control i18n
}
// reset landing locale module state between tests to avoid cross-test leakage
// from module-level state in use-landing-locale.ts
import { __resetLandingLocaleForTests } from '@/hooks/use-landing-locale'
// Import deterministic i18n mocks so loaders that dynamically import
// locale catalogs become deterministic in the test environment.
// The module registers a narrow vi.mock for the catalog loader.
import './i18n-fixtures'

// Mock @tanstack/react-router Link for tests that render components directly
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<any>('@tanstack/react-router')
  return {
    ...actual,
    Link: (props: any) => {
      const { children, ...rest } = props
      return createElement('a', rest, children)
    },
    // Provide a lightweight useNavigate mock for tests that call navigate({ to })
    // during migration. The real router will perform navigation; in tests a
    // no-op that updates history is sufficient to avoid errors and to let
    // components compute path-based behavior.
    useNavigate: () => {
      return ({ to }: { to?: string } = {}) => {
        try {
          if (typeof window !== 'undefined' && typeof to === 'string') {
            // update the history so components that read window.location see the new path
            window.history.pushState({}, '', to)
          }
        } catch (e) {
          // swallow - tests will assert expected behavior
        }
      }
    },
  }
})

// Enhanced IntersectionObserver mock for jsdom/vitest environments.
// - Records created observers and their callbacks so tests can simulate
//   intersection changes by calling `globalThis.__triggerIO(entries)`.
// - Provides observe/unobserve/disconnect/takeRecords methods.
// - Keeps a simple API and logs creation via vi.fn() so assertions can spy on it.
const __createdObservers: Array<{
  callback: IntersectionObserverCallback
  options?: IntersectionObserverInit
}> = []

const MockIntersectionObserver = vi.fn().mockImplementation(function (
  this: any,
  cb: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  // Store the callback so tests can invoke it
  __createdObservers.push({ callback: cb, options })

  this.observe = vi.fn()
  this.unobserve = vi.fn()
  this.disconnect = vi.fn()
  this.takeRecords = vi.fn().mockReturnValue([])
})

Object.defineProperty(globalThis, 'IntersectionObserver', {
  configurable: true,
  writable: true,
  value: MockIntersectionObserver,
})

// helper for tests to trigger intersection callbacks for all created observers
;(globalThis as any).__triggerIO = (
  entries: Array<IntersectionObserverEntry>,
) => {
  for (const obs of __createdObservers) {
    try {
      obs.callback(entries as any, {} as IntersectionObserver)
    } catch (e) {
      // swallow - tests will assert expected behavior
    }
  }
}

if (typeof window !== 'undefined') {
  // @ts-ignore - augmenting the global window for tests
  window.IntersectionObserver = MockIntersectionObserver as any
  ;(window as any).__triggerIO = (globalThis as any).__triggerIO
}

// requestAnimationFrame/cancelAnimationFrame polyfill for Node/jsdom test env
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  // @ts-ignore
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
    setTimeout(cb, 0)
  // @ts-ignore
  globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id)
}

// helper to clear created observers between tests
;(globalThis as any).__clearIO = () => {
  __createdObservers.length = 0
}

// global test helpers can be attached here

afterEach(() => {
  try {
    ;(globalThis as any).__clearIO()
  } catch (e) {
    // ignore
  }

  try {
    __resetLandingLocaleForTests()
  } catch (e) {
    // ignore
  }

  // clear locale cookie between tests to avoid cross-test leakage
  try {
    if (typeof document !== 'undefined') {
      // Expire the locale cookie
      document.cookie = 'locale=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  } catch (e) {
    // ignore
  }
})

export {}
