import type { Locale } from './locales'

export async function loadCatalog(locale: Locale): Promise<Record<string, string>> {
  try {
    // Try project alias first (when tsconfig paths are active), otherwise
    // fall back to a relative import that matches the file layout.
    let catalog: any
    try {
      catalog = await import(`@/locales/${locale}/messages.json`)
    } catch {
      catalog = await import(`../../locales/${locale}/messages.json`)
    }
    return (catalog && (catalog.default ?? catalog)) as Record<string, string>
  } catch (e) {
    return {}
  }
}
