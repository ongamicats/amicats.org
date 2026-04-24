import { createElement } from 'react'
import '@testing-library/jest-dom'
import { vi, afterEach } from 'vitest'
// reset landing locale module state between tests to avoid cross-test leakage
// from module-level state in use-landing-locale.ts
import { __resetLandingLocaleForTests } from '@/hooks/use-landing-locale'

// Mock @tanstack/react-router Link for tests that render components directly
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<any>('@tanstack/react-router')
  return {
    ...actual,
    Link: (props: any) => {
      const { children, ...rest } = props
      return createElement('a', rest, children)
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
;(globalThis as any).__triggerIO = (entries: Array<IntersectionObserverEntry>) => {
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
