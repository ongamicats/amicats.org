import { Link } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import { useLingui } from '@lingui/react/macro';
import { resolveLocale } from '@/integrations/lingui/resolve-locale';

export const NotFound = () => {
  const locale = resolveLocale().locale;

  const { t } = useLingui();

  const title = t`Page not found`;
  const message = t`We couldn't find the page you were looking for. It may have been moved or removed.`;
  const home = t`Home`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
      <div className="text-secondary mb-4 opacity-50">
        <AlertCircle size={64} />
      </div>
      <h1 className="text-9xl font-black text-primary/20 select-none">404</h1>
      <h2 className="text-4xl font-bold -mt-8 mb-4 text-base-content">
        {title}
      </h2>
      <p className="text-lg opacity-60 mb-8 max-w-md mx-auto">{message}</p>
      <Link
        to={`/$locale`}
        params={{ locale }}
        className="btn btn-primary rounded-full px-8 shadow-lg"
      >
        {home}
      </Link>
    </div>
  );
};
