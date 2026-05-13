import { DEFAULT_LOCALE, isSupported } from './locales';

export function parseCookie(header?: string | null) {
  if (!header) return {};
  return Object.fromEntries(
    header.split(';').map((p) => {
      const [k, ...rest] = p.split('=');
      return [k.trim(), decodeURIComponent(rest.join('='))];
    }),
  );
}

export function resolveLocale({
  params,
}: { params?: { locale?: string } } = {}) {
  const paramLocale = params?.locale;
  if (isSupported(paramLocale))
    return { locale: paramLocale, redirected: false };

  const cookies = parseCookie(
    typeof document !== 'undefined' ? document.cookie : undefined,
  );
  const cookieLocale =
    typeof cookies !== 'undefined' ? cookies['locale'] : DEFAULT_LOCALE;
  if (isSupported(cookieLocale))
    return { locale: cookieLocale, redirected: false };

  return { locale: DEFAULT_LOCALE, redirected: true };
}

export function setLocaleCookie(
  target: { cookie?: string } | Document,
  locale: string,
) {
  const expires = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 365,
  ).toUTCString();
  const cookie = `locale=${encodeURIComponent(locale)}; Path=/; Expires=${expires}`;
  if (typeof document !== 'undefined' && 'cookie' in document) {
    document.cookie = cookie;
    return;
  }
  try {
    // server-side response-ish objects may accept set header via cookie prop
    target.cookie = cookie;
  } catch {}
}
