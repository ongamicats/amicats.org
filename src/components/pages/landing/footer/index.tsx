import { Facebook, Instagram, Mail, MapPin } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';
import { useLingui } from '@lingui/react/macro';
import { resolveLocale } from '@/integrations/lingui/resolve-locale';

export function Footer() {
  const { t } = useLingui();
  const params = useParams({ strict: false });
  const locale = resolveLocale({ params }).locale;

  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="footer grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <aside>
            <h3 className="footer-title text-xl text-primary mb-4 opacity-100">
              {t`Sobre a AmiCat's`}
            </h3>
            <p className="text-base max-w-xs leading-relaxed">
              {t`Somos uma organização dedicada ao resgate, cuidado e adoção responsável de gatos em Campo Grande, MS. Transformando vidas, um miado de cada vez.`}
            </p>
          </aside>
          <nav>
            <h6 className="footer-title text-xl text-primary mb-4 opacity-100">
              {t`Institucional`}
            </h6>
            {/* Localized landing links using the same pattern as the rest of the site */}
            <Link
              to={`/${locale}/`}
              hash="quem-somos"
              className="link link-hover hover:text-primary transition-colors"
            >
              {t`Quem Somos`}
            </Link>
            <Link
              to={`/${locale}/`}
              hash="adote"
              className="link link-hover hover:text-primary transition-colors"
            >
              {t`Quero Adotar`}
            </Link>
            <Link
              to={`/${locale}/quero-ajudar/`}
              className="link link-hover hover:text-primary transition-colors"
            >
              {t`Como Ajudar`}
            </Link>
            <Link
              to={`/${locale}/seja-um-parceiro/`}
              className="link link-hover hover:text-primary transition-colors"
            >
              {t`Seja um parceiro`}
            </Link>
          </nav>
          {/* contact block has id so footer "Contato" links can target it */}
          <nav id="footer-contact">
            <h6 className="footer-title text-xl text-primary mb-4 opacity-100">
              {t`Contato`}
            </h6>
            <p className="text-xs opacity-90 mb-1">{t`Atendimento por WhatsApp e E-mail`}</p>
            <p className="text-xs opacity-90 mb-3">{t`Segunda a Sexta: 14h às 17h`}</p>
            <div className="flex flex-col gap-3">
              <a className="flex items-center gap-2 hover:text-primary transition-colors mt-4">
                <MapPin size={18} /> {t`Campo Grande, MS`}
              </a>
              <a
                className="flex items-center gap-2 hover:text-primary transition-colors"
                href="mailto:amicatsong@gmail.com"
              >
                <Mail size={18} /> amicatsong@gmail.com
              </a>
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href="https://instagram.com/ongamicats"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost hover:text-secondary hover:bg-neutral-focus"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com/ongamicats"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost hover:text-secondary hover:bg-neutral-focus"
              >
                <Facebook size={24} />
              </a>
              <a
                href={`https://wa.me/5567999300401?text=${encodeURIComponent(
                  t`Olá! Gostaria de mais informações sobre parcerias com a AmiCat's.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t`Abrir WhatsApp`}
                className="btn btn-circle btn-ghost hover:text-secondary hover:bg-neutral-focus"
              >
                {/* Inline WhatsApp icon (no new dependency) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.81 11.81 0 0012.01.5C6.02.5 1.25 5.27 1.25 11.26c0 1.98.52 3.9 1.51 5.6L.5 23.5l6.9-2.02a11.7 11.7 0 005.6 1.3h.01c6 0 10.77-4.77 10.77-10.77 0-3.01-1.18-5.83-3.27-7.53zM12 20.5h-.01a10 10 0 01-4.96-1.4l-.36-.21-4.1 1.2 1.23-3.99-.24-.4A9.95 9.95 0 012 11.27c0-5.52 4.49-10 10-10 2.66 0 5.16 1.04 7.05 2.93A9.95 9.95 0 0122 11.26c0 5.52-4.49 9.24-10 9.24z" />
                  <path d="M17.24 14.5c-.3-.16-1.76-.86-2.03-.96-.27-.1-.47-.16-.67.16-.2.33-.78.96-.96 1.16-.18.2-.36.22-.66.08-.3-.14-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.14-.14.3-.36.45-.54.15-.18.2-.31.3-.52.1-.2.04-.38-.02-.54-.06-.16-.67-1.6-.92-2.2-.24-.58-.5-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.33-.28.26-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.36 5.19 4.71 3.05 1.35 3.05.9 3.6.85.55-.05 1.76-.72 2.01-1.42.24-.7.24-1.3.17-1.42-.07-.12-.27-.2-.57-.36z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>

        <div className="divider divider-neutral"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-content/50 mt-4">
          <p>
            {t`Copyright © ${new Date().getFullYear()} - AmiCat's - Todos os direitos reservados`}
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            {/* Hidden for now; keep markup for future use */}
            <a className="link link-hover hidden">{t`Privacidade`}</a>
            <a className="link link-hover hidden">{t`Termos`}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
