import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { resolveLocale } from '@/integrations/lingui/resolve-locale';
import { loadCatalog } from '@/integrations/lingui/catalog-loader';
import { LinguiProvider } from '@/integrations/lingui/provider';
import { NotFound } from '@/components/pages/not-found';

// The $locale route now owns locale resolution and Lingui catalog loading.
// This guarantees that when the locale segment changes the loader runs,
// returning the active locale & catalog for the route tree. The root
// layout will read this loader data to set <html lang> and provide Lingui.

export const Route = createFileRoute('/$locale')({
  loader: async ({ params }) => {
    const { locale, redirected } = resolveLocale({ params });
    // If the requested :locale is invalid, redirect to the resolved
    // locale while preserving the remainder of the path.
    if (redirected) {
      // Use the redirect() helper to produce a proper loader redirect.
      throw redirect({
        to: `/$locale`,
        replace: true,
        params: { locale },
      });
    }

    // Load the Lingui catalog for this locale so SSR includes translations
    // and client-side navigation re-activates the correct catalog.
    const catalog = await loadCatalog(locale);

    return { locale, catalog };
  },

  // Expose the active locale as head metadata so server-rendered <head>
  // contains a Content-Language hint that matches the route's locale.
  // This is a valid route-owned mechanism (no root-to-child loader reads)
  // and improves language correctness for crawlers and assistive tech.
  // Note: root still owns the <html> element and therefore the
  // html[lang] attribute remains the root's responsibility. The
  // LinguiProvider updates document.documentElement.lang on the client
  // during hydration so the attribute becomes correct immediately
  // after client activation.
  // The head callback must NOT call React hooks. Use the callback args
  // (loaderData, params, etc.) provided by TanStack Router instead.
  head: ({ loaderData }: { loaderData?: { locale?: string } | null }) => {
    // loaderData is the data returned from this route's loader (see above).
    // We explicitly type it as unknown -> typed shape to avoid importing
    // route types here and to keep this a small, surgical change.
    const ld = loaderData as { locale?: string } | undefined | null;
    const locale = ld?.locale ?? 'pt-BR';
    return {
      meta: [
        // Standard HTTP-equivalent header meta (Content-Language).
        { httpEquiv: 'Content-Language', content: locale },
        // A named fallback so older tooling may pick it up.
        { name: 'content-language', content: locale },
      ],
    };
  },
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  // Read this route's loader data and render the LinguiProvider here where
  // useLoaderData is valid. This guarantees i18n.loadAndActivate runs during
  // SSR before provider-dependent components render.
  const data = (Route as any).useLoaderData?.() ?? null;
  const locale = data?.locale ?? null;
  const catalog = data?.catalog ?? null;

  return (
    <LinguiProvider locale={locale} catalog={catalog}>
      <Outlet />
    </LinguiProvider>
  );
}
