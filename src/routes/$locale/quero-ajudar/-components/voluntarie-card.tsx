import { Link } from '@tanstack/react-router';
import { Trans, useLingui } from '@lingui/react/macro';
import { UserPlus, HandFist, Stethoscope, Megaphone, Info } from 'lucide-react';
import { cn } from '@/components/layout/shared/helpers/class.helper';

interface Props {
  locale: string;
}

export function VoluntarieCard({ locale }: Props) {
  const { t } = useLingui();
  const waText = t`Olá! Gostaria de me voluntariar na AmiCat's.`;
  const wa = `https://api.whatsapp.com/send/?phone=5567999217560&text=${encodeURIComponent(
    waText,
  ).replace(/%20/g, '+')}&type=phone_number&app_absent=0`;

  return (
    <section className={cn('rounded-lg bg-base-100 p-6 shadow-sm')}>
      <div className="grid gap-4 md:grid-cols-[auto_1fr] items-start">
        <div className="flex items-start">
          <div className="p-3 rounded-md bg-base-200">
            <UserPlus size={28} className="text-info" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mt-1"><Trans>Doe Seu Tempo</Trans></h3>
          <p className="text-base-content/80"><Trans>Existem várias formas de contribuir como voluntário</Trans></p>

          <div className="mt-8 mb-8 grid gap-3">
            <div className="flex items-center gap-3 p-3 rounded-md bg-base-200">
              <div className="p-2 rounded bg-base-100 flex items-center justify-center">
                <HandFist className="h-5 w-5 text-info" aria-hidden />
              </div>
              <div>
                <div className="font-semibold"><Trans>Limpeza e Organização</Trans></div>
                <div className="text-sm text-base-content/80">{t`Ajude na limpeza e organização da ONG aos sábados e domingos à tarde`}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md bg-base-200">
              <div className="p-2 rounded bg-base-100 flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-secondary" aria-hidden />
              </div>
              <div>
                <div className="font-semibold"><Trans>Profissionais da Saúde</Trans></div>
                <div className="text-sm text-base-content/80">{t`Médicos veterinários, auxiliares veterinários e outros profissionais da área`}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md bg-base-200">
              <div className="p-2 rounded bg-base-100 flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-accent" aria-hidden />
              </div>
              <div>
                <div className="font-semibold"><Trans>Apoio e Comunicação</Trans></div>
                <div className="text-sm text-base-content/80">{t`Auxílio em redes sociais, captação de recursos, feiras de adoção e eventos`}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2 justify-between">
            <div className="flex items-center gap-2">
              <a className="btn btn-primary flex items-center gap-2" href={wa} target="_blank" rel="noreferrer" aria-label={t`Entrar em contato via WhatsApp`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M20.52 3.48A11.81 11.81 0 0012.01.5C6.02.5 1.25 5.27 1.25 11.26c0 1.98.52 3.9 1.51 5.6L.5 23.5l6.9-2.02a11.7 11.7 0 005.6 1.3h.01c6 0 10.77-4.77 10.77-10.77 0-3.01-1.18-5.83-3.27-7.53zM12 20.5h-.01a10 10 0 01-4.96-1.4l-.36-.21-4.1 1.2 1.23-3.99-.24-.4A9.95 9.95 0 012 11.27c0-5.52 4.49-10 10-10 2.66 0 5.16 1.04 7.05 2.93A9.95 9.95 0 0122 11.26c0 5.52-4.49 9.24-10 9.24z" />
                  <path d="M17.24 14.5c-.3-.16-1.76-.86-2.03-.96-.27-.1-.47-.16-.67.16-.2.33-.78.96-.96 1.16-.18.2-.36.22-.66.08-.3-.14-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.14-.14.3-.36.45-.54.15-.18.2-.31.3-.52.1-.2.04-.38-.02-.54-.06-.16-.67-1.6-.92-2.2-.24-.58-.5-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.33-.28.26-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.36 5.19 4.71 3.05 1.35 3.05.9 3.6.85.55-.05 1.76-.72 2.01-1.42.24-.7.24-1.3.17-1.42-.07-.12-.27-.2-.57-.36z" />
                </svg>
                <Trans>Entrar em contato</Trans>
              </a>
            </div>

            <div className="ml-auto">
              <Link to={`/${locale}/como-funciona/?section=voluntariado`} className="btn btn-ghost flex items-center gap-2">
                <Info className="h-4 w-4" />
                <Trans>Saiba como funciona</Trans>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
