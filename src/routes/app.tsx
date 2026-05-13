import { createFileRoute, redirect } from '@tanstack/react-router';
import { resolveLocale } from '@/integrations/lingui/resolve-locale';

/*
 *  Redireciona o usuário para a rota localizada de "/app".
 */
export const Route = createFileRoute('/app')({
  loader: () => {
    const { locale } = resolveLocale();

    throw redirect({
      to: `/$locale/app`,
      replace: true,
      params: { locale },
    });
  },
  component: NullLayout,
});

function NullLayout() {
  return null;
}
