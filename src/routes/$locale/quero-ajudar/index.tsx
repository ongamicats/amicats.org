import { createFileRoute, useParams } from '@tanstack/react-router';
import { Trans, useLingui } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';
import { DonationCard } from './-components/donation-card';
import { VoluntarieCard } from './-components/voluntarie-card';
import { ItemsDonationCard } from './-components/items-donation-card';
import { Container } from '@/components/layout/ui/container';
import { Navbar as LandingNavbar } from '@/components/pages/landing/navbar';
import { Flex } from '@/components/layout/ui/flex';
import { Footer } from '@/components/pages/landing/footer';
import { resolveLocale } from '@/integrations/lingui/resolve-locale';

export const Route = createFileRoute('/$locale/quero-ajudar/')({
  component: RouteComponent,
});

export function RouteComponent(): JSX.Element {
  const { t } = useLingui();
  const params = useParams({ strict: false });
  const locale = resolveLocale({ params }).locale;

  return (
    <div className="pt-16 md:pt-20">
      <Container id="quero-ajudar-navbar" spacing="lg" fluid>
        <LandingNavbar forceVisible />
      </Container>

      {/* Full-bleed hero band: background spans full width, inner content aligned to main wrapper width */}
      <div className="w-full bg-primary text-primary-content mb-6">
        <div className="mx-auto w-full md:w-4/5 h-60 p-12 flex items-center">
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mt-2 text-white">
              <Trans>Como Ajudar</Trans>
            </h1>
            <p className="mt-2 text-base opacity-95 text-white">{t`Escolha a forma de ajudar que mais combina com você.`}</p>
          </div>
        </div>
      </div>

      <Container
        id="quero-ajudar-content"
        spacing="lg"
        className="pb-6 md:pb-10"
        fluid
      >
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="rounded-lg bg-base-100 p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{t`Quero Adotar`}</h3>
            <p className="text-base-content/80 mb-4">{t`Veja o processo completo de adoção e encontre o gatinho certo para seu lar.`}</p>
            <div className="mt-auto">
              <Link
                to={`/${locale}/como-funciona/`}
                className="btn btn-primary"
              >
                <Trans>Saiba como adotar</Trans>
              </Link>
            </div>
          </article>

          <article className="rounded-lg bg-base-100 p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{t`Apadrinhar`}</h3>
            <p className="text-base-content/80 mb-4">{t`Apoie financeiramente um gatinho sem precisar adotar — receba atualizações e participe da rotina.`}</p>
            <div className="mt-auto">
              <Link
                to={`/${locale}/como-funciona/?section=apadrinhamento`}
                className="btn btn-secondary"
              >
                <Trans>Saiba como apadrinhar</Trans>
              </Link>
            </div>
          </article>

          <article className="rounded-lg bg-base-100 p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{t`Ser Voluntário`}</h3>
            <p className="text-base-content/80 mb-4">{t`Participe das rotinas de cuidado, resgates e eventos — sua ajuda faz a diferença.`}</p>
            <div className="mt-auto">
              <Link
                to={`/${locale}/como-funciona/?section=voluntariado`}
                className="btn btn-accent"
              >
                <Trans>Saiba como ser voluntário</Trans>
              </Link>
            </div>
          </article>

          <article className="rounded-lg bg-base-100 p-6 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold mb-2">{t`Ser Parceiro`}</h3>
            <p className="text-base-content/80 mb-4">{t`Empresas e profissionais podem apoiar com recursos, serviços e divulgação.`}</p>
            <div className="mt-auto">
              <Link
                to={`/${locale}/seja-um-parceiro/`}
                className="btn btn-ghost"
              >
                <Trans>Saiba sobre parcerias</Trans>
              </Link>
            </div>
          </article>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default RouteComponent;
