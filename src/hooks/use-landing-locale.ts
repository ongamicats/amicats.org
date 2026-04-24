import { useEffect, useRef, useState } from 'react'

type Locale = 'pt-BR' | 'en'

// Module-level state & subscribers so multiple hook instances sync in the same window.
let currentLocale: Locale = 'pt-BR'
const subscribers = new Set<(l: Locale) => void>()

function notify(l: Locale) {
  currentLocale = l
  // persist
  try {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      window.localStorage.setItem('locale', l)
      // also emit storage event for other windows (browsers will do this automatically when using localStorage)
      // but for same-window subscribers we notify directly
    }
  } catch (e) {
    // ignore storage errors
  }

  subscribers.forEach((cb) => cb(l))
}

export function useLandingLocale(): [Locale, (l: Locale) => void] {
  const mountedRef = useRef(false)
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      if (
        typeof window !== 'undefined' &&
        typeof window.localStorage !== 'undefined'
      ) {
        const stored = window.localStorage.getItem('locale') as Locale | null
        if (stored === 'en' || stored === 'pt-BR') {
          currentLocale = stored
          return stored
        }
      }
    } catch (e) {
      // ignore
    }
    return currentLocale
  })

  useEffect(() => {
    mountedRef.current = true

    const cb = (l: Locale) => {
      // update local state only if different
      setLocaleState((prev) => (prev === l ? prev : l))
    }

    subscribers.add(cb)

    // listen to storage events from other tabs
    function onStorage(e: StorageEvent) {
      if (
        e.key === 'locale' &&
        (e.newValue === 'en' || e.newValue === 'pt-BR')
      ) {
        const l = e.newValue as Locale
        // sync module state and subscribers
        currentLocale = l
        subscribers.forEach((s) => s(l))
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', onStorage)
    }

    return () => {
      subscribers.delete(cb)
      if (typeof window !== 'undefined')
        window.removeEventListener('storage', onStorage)
      mountedRef.current = false
    }
  }, [])

  function setLocale(l: Locale) {
    if (l !== currentLocale) {
      notify(l)
    }
    // also update local hook state immediately
    setLocaleState(l)
  }

  return [locale, setLocale]
}

export default useLandingLocale

// Test helper: reset module-level state between tests to avoid cross-test
// leakage. This is intentionally exported only for test environments.
// Tests can import this helper from src/test/setup.ts to ensure a clean
// starting state for locale between test cases.
export function __resetLandingLocaleForTests() {
  currentLocale = 'pt-BR'
  subscribers.clear()
}
