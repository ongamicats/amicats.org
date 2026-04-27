import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export function Footer() {
  const { i18n } = useLingui()

  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="footer grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <aside>
            <h3 className="footer-title text-xl text-primary mb-4 opacity-100">
              {i18n._(t`Sobre a AmiCat's`)}
            </h3>
            <p className="text-base max-w-xs leading-relaxed">
              {i18n._(
                t`Somos uma organização dedicada ao resgate, cuidado e adoção responsável de gatos em Campo Grande, MS. Transformando vidas, um miado de cada vez.`,
              )}
            </p>
          </aside>
          <nav>
            <h6 className="footer-title text-xl text-primary mb-4 opacity-100">
              {i18n._(t`Links Rápidos`)}
            </h6>
            <a
              href="#about"
              className="link link-hover hover:text-primary transition-colors"
            >
              {i18n._(t`Quem Somos`)}
            </a>
            <a
              href="#adopt"
              className="link link-hover hover:text-primary transition-colors"
            >
              {i18n._(t`Quero Adotar`)}
            </a>
            <a
              href="#help"
              className="link link-hover hover:text-primary transition-colors"
            >
              {i18n._(t`Como Ajudar`)}
            </a>
            <a
              href="#contact"
              className="link link-hover hover:text-primary transition-colors"
            >
              {i18n._(t`Contato`)}
            </a>
          </nav>
          <nav>
            <h6 className="footer-title text-xl text-primary mb-4 opacity-100">
              {i18n._(t`Fale Conosco`)}
            </h6>
            <div className="flex flex-col gap-3">
              <a className="flex items-center gap-2 hover:text-primary transition-colors">
                <MapPin size={18} /> {i18n._(t`Campo Grande, MS`)}
              </a>
              <a className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={18} /> contato@amicats.org
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
            </div>
          </nav>
        </div>

        <div className="divider divider-neutral"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-content/50 mt-4">
          <p>
            {i18n._(
              t`Copyright © ${new Date().getFullYear()} - AmiCat's - Todos os direitos reservados`,
            )}
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a className="link link-hover">{i18n._(t`Privacidade`)}</a>
            <a className="link link-hover">{i18n._(t`Termos`)}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
