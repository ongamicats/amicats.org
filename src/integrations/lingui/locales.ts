export const SUPPORTED_LOCALES = ['pt-BR', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'pt-BR'

export function isSupported(locale?: string): locale is Locale {
  return (
    !!locale && (SUPPORTED_LOCALES as ReadonlyArray<string>).includes(locale)
  )
}
