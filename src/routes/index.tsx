import { createFileRoute, redirect } from '@tanstack/react-router';
import { resolveLocale } from '@/integrations/lingui/resolve-locale';

export const Route = createFileRoute('/')({
  loader: () => {
    const { locale } = resolveLocale();

    throw redirect({
      to: `/$locale`,
      replace: true,
      params: { locale },
    });
  },
  component: RedirectToLocale,
});

function RedirectToLocale() {
  return null;
}
