import { Trans, useLingui } from '@lingui/react/macro';
import { Box } from 'lucide-react';
import { cn } from '@/components/layout/shared/helpers/class.helper';

interface Props {
  locale: string;
}

export function ItemsDonationCard({ locale }: Props) {
  const { t } = useLingui();
  // tailored WhatsApp message for item donation (built from a translated string)
  const waText = t`Olá! Gostaria de doar itens para a AmiCat's. Quais são os itens mais necessários?`;
  const wa = `https://api.whatsapp.com/send/?phone=5567999217560&text=${encodeURIComponent(
    waText,
  ).replace(/%20/g, '+')}&type=phone_number&app_absent=0`;

  return (
    <section className={cn('rounded-lg bg-base-100 p-6 shadow-sm')}>
      <div className="grid gap-4 md:grid-cols-[auto_1fr] items-start">
        <div className="flex items-start">
          <div className="p-3 rounded-md bg-base-200">
            <Box size={28} className="text-secondary" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-1">
            <Trans>Doação de Itens</Trans>
          </h3>
          <p className="text-base-content/80">
            <Trans>Velhinhos ou novos, qualquer contribuição é bem-vinda</Trans>
          </p>

          <div className="text-base-content/80 mt-8 mb-8">
            {/* Two columns with vertical divider on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-start">
              <div className="md:pr-4 md:border-r md:border-base-300">
                <h4 className="font-semibold">
                  <Trans>Itens para os Gatos</Trans>
                </h4>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                  <li>
                    <Trans>Ração para gatos</Trans>
                  </li>
                  <li>
                    <Trans>Areia higiênica</Trans>
                  </li>
                  <li>
                    <Trans>Cobertores e mantas</Trans>
                  </li>
                  <li>
                    <Trans>Arranhadores</Trans>
                  </li>
                  <li>
                    <Trans>Casinhas e tocas</Trans>
                  </li>
                  <li>
                    <Trans>Remédios e suplementos</Trans>
                  </li>
                  <li>
                    <Trans>
                      Produtos de limpeza (desinfetantes, pás, vassouras, rodos)
                    </Trans>
                  </li>
                  <li>
                    <Trans>Jornais</Trans>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">
                  <Trans>Itens para Bazar</Trans>
                </h4>
                <p className="text-sm mb-1">{t`Doe itens em bom estado para nosso bazar beneficente:`}</p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                  <li>
                    <Trans>Roupas em bom estado</Trans>
                  </li>
                  <li>
                    <Trans>Móveis</Trans>
                  </li>
                  <li>
                    <Trans>Decoração</Trans>
                  </li>
                  <li>
                    <Trans>Livros</Trans>
                  </li>
                  <li>
                    <Trans>Eletrônicos funcionando</Trans>
                  </li>
                  <li>
                    <Trans>Outros itens em boas condições</Trans>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <a
              className="btn btn-primary flex items-center gap-2"
              href={wa}
              target="_blank"
              rel="noreferrer"
              aria-label={t`Doar itens via WhatsApp`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden
              >
                <path d="M20.52 3.48A11.81 11.81 0 0012.01.5C6.02.5 1.25 5.27 1.25 11.26c0 1.98.52 3.9 1.51 5.6L.5 23.5l6.9-2.02a11.7 11.7 0 005.6 1.3h.01c6 0 10.77-4.77 10.77-10.77 0-3.01-1.18-5.83-3.27-7.53zM12 20.5h-.01a10 10 0 01-4.96-1.4l-.36-.21-4.1 1.2 1.23-3.99-.24-.4A9.95 9.95 0 012 11.27c0-5.52 4.49-10 10-10 2.66 0 5.16 1.04 7.05 2.93A9.95 9.95 0 0122 11.26c0 5.52-4.49 9.24-10 9.24z" />
                <path d="M17.24 14.5c-.3-.16-1.76-.86-2.03-.96-.27-.1-.47-.16-.67.16-.2.33-.78.96-.96 1.16-.18.2-.36.22-.66.08-.3-.14-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.14-.14.3-.36.45-.54.15-.18.2-.31.3-.52.1-.2.04-.38-.02-.54-.06-.16-.67-1.6-.92-2.2-.24-.58-.5-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.33-.28.26-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.36 5.19 4.71 3.05 1.35 3.05.9 3.6.85.55-.05 1.76-.72 2.01-1.42.24-.7.24-1.3.17-1.42-.07-.12-.27-.2-.57-.36z" />
              </svg>
              <Trans>Quero doar itens</Trans>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
