// polyfills or globals for node environment if needed in tests
if (typeof globalThis.process === 'undefined') {
  // minimal process mock for some libs that access process.env
  ;(globalThis as any).process = { env: {} }
}

export {}
