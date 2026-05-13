import type { Locale } from './locales';

// Load a Lingui .po catalog at runtime via Vite's Lingui plugin.
// Official pattern: import(`./locales/${locale}/messages.po`) and use
// the returned catalog.messages shape. We intentionally do NOT support
// any JSON fallback — the project uses a pure .po workflow.
export async function loadCatalog(locale: Locale) {
  try {
    let mod: unknown;
    try {
      mod = await import(`@/locales/${locale}/messages.po`);
    } catch {
      // fallback relative path for different bundler resolutions
      mod = await import(`../../locales/${locale}/messages.po`);
    }

    if (!mod) return null;

    // Vite Lingui plugin returns an object with `messages` export.
    const catalog = (mod as any).default ?? mod;
    return catalog as { messages?: Record<string, string> } | null;
  } catch (e) {
    return null;
  }
}
