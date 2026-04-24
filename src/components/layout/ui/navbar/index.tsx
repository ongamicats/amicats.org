import { resolveLocale } from '@/integrations/lingui/resolve-locale'
import { Link } from '@tanstack/react-router'

export function Navbar(): JSX.Element {
  const initial = resolveLocale()
  const locale = initial.locale

  return (
    <div className="sticky top-0 z-50 navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to={`/${locale}/app/home`} className="btn btn-ghost text-xl">
          Amicats App
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={`/${locale}/`}>Landing</Link>
          </li>
        </ul>

        <div className="ml-4">
          <Link to={`/${locale}/`} className="btn btn-ghost btn-sm">
            {locale === 'pt-BR' ? 'PT' : 'ENG'}
          </Link>
        </div>
      </div>
    </div>
  )
}
