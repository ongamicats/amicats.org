import { createFileRoute, useParams } from '@tanstack/react-router';
import { Trans, useLingui } from '@lingui/react/macro';
import { DonationCard } from './-components/donation-card';
import { VoluntarieCard } from './-components/voluntarie-card';
import { ItemsDonationCard } from './-components/items-donation-card';
import { Container } from '@/components/layout/ui/container';
import { Navbar as LandingNavbar } from '@/components/pages/landing/navbar';

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
        <div className="mx-auto max-w-5xl flex flex-col gap-6">
          {/* Primary call-to-action: donations (financial) */}
          <DonationCard locale={locale} />

          {/* Secondary stack: items donation and volunteering */}
          <div className="flex flex-col gap-6">
            <ItemsDonationCard locale={locale} />
            <VoluntarieCard locale={locale} />
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default RouteComponent;
