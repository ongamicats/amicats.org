import { createFileRoute } from '@tanstack/react-router';
import { Trans, useLingui } from '@lingui/react/macro';
import { useEffect, useMemo, useState } from 'react';
import AdocaoContent from './-components/adocao';
import ApadrinhamentoContent from './-components/apadrinhamento';
import VoluntariadoContent from './-components/voluntariado';
import { TabList } from '@/components/layout/ui/tab-list';
import { Container } from '@/components/layout/ui/container';
import { Navbar as LandingNavbar } from '@/components/pages/landing/navbar';
import { Flex } from '@/components/layout/ui/flex';
import { Footer } from '@/components/pages/landing/footer';

export const Route = createFileRoute('/$locale/como-funciona/')({
  component: RouteComponent,
});

export function RouteComponent() {
  const { t } = useLingui();

  const items = useMemo(
    () => [
      { id: 'adocao', label: t`Adoção` },
      { id: 'apadrinhamento', label: t`Apadrinhamento` },
      { id: 'voluntariado', label: t`Voluntariado` },
    ],
    [t],
  );

  // keep rendered panel in sync with URL search param `section` so tabs
  // are deep-linkable and the page can show per-tab placeholder content.
  const [selected, setSelected] = useState<string | undefined>(items[0]?.id);
  const [displayed, setDisplayed] = useState<string | undefined>(items[0]?.id);
  const [isOutgoing, setIsOutgoing] = useState(false);
  // incomingActive default true so initial content is visible
  const [isIncoming, setIsIncoming] = useState(false);
  const [outgoingActive, setOutgoingActive] = useState(false);
  const [incomingActive, setIncomingActive] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get('section') ?? items[0]?.id;
    setSelected(s ?? items[0]?.id);
    setDisplayed(s ?? items[0]?.id);
  }, []);

  // orchestrated change: update tab selection immediately for accessibility
  // then animate outgoing/incoming content.
  function handleTabChange(id: string) {
    if (!id || id === selected) return;
    // debug: track tab change timing in tests
    // console.debug can be enabled by tests if needed
    // console.debug('handleTabChange start', { id, selected });
    const OUT_MS = 200;
    const IN_MS = 250;
    // update tab state so the tab UI shows active immediately
    setSelected(id);
    // start outgoing animation for current displayed content
    setIsOutgoing(true);
    // allow DOM paint before triggering transition class
    setOutgoingActive(false);
    setTimeout(() => setOutgoingActive(true), 10);
    setTimeout(() => {
      // swap displayed content
      setDisplayed(id);
      setIsOutgoing(false);
      setOutgoingActive(false);
      // start incoming
      setIsIncoming(true);
      setIncomingActive(false);
      setTimeout(() => setIncomingActive(true), 10);
      setTimeout(() => {
        setIsIncoming(false);
        // Keep incomingActive true so steady-state remains visible after
        // the entrance transition completes. Do not reset it to false here.
      }, IN_MS + 10);
    }, OUT_MS);
  }

  return (
    // keep the page top padding in a wrapper, but place the title band
    // outside the padded Container so it can visually bleed edge-to-edge.
    <div className="pt-16 md:pt-20">
      {/* Landing navbar - keep visible on this page (padded by Container) */}
      <Container id="como-funciona-navbar" spacing="lg" fluid>
        <LandingNavbar forceVisible />
      </Container>

      {/* Title / hero band — full-bleed (outside padded Container). */}
      <Flex
        className="h-60 mb-6 bg-primary text-primary-content p-12"
        align="center"
      >
        {/* title band should span full available width, have white title, and
            not use rounded corners */}
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mt-2 text-white">
            <Trans>Como funciona?</Trans>
          </h1>
          <p className="mt-2 text-base opacity-95 text-white">{t`Veja como participar da AmiCat's de forma clara, prática e responsável.`}</p>
        </div>
      </Flex>

      <Container
        id="como-funciona-content"
        spacing="lg"
        className="pb-6 md:pb-10"
        fluid
      >
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Left column: stacked options (use full-width stacking on mobile) */}
          <div className="w-full md:w-1/4">
            <div className="flex flex-col gap-3">
              <TabList
                items={items}
                name="section"
                orientation="vertical"
                value={selected}
                onChange={(id) => handleTabChange(id)}
                className="w-full"
                itemClassName={{
                  adocao: 'bg-warning/10 text-warning',
                  apadrinhamento: 'bg-secondary/10 text-secondary',
                  voluntariado: 'bg-info/10 text-info',
                }}
              />
            </div>
          </div>

          {/* Right column: content container with fade animation on change */}
          <div className="w-full md:w-3/4 bg-base-100 p-6 rounded-md shadow-sm">
            {/* Outgoing content */}
            {isOutgoing && (
              <div
                className={
                  'text-base-content/80 transition-all duration-200 ease-out ' +
                  (outgoingActive
                    ? 'opacity-0 translate-y-2'
                    : 'opacity-100 translate-y-0')
                }
              >
                {displayed === 'adocao' && (
                  <div>
                    {/* Route-scoped component for Adoção */}
                    <AdocaoContent />
                  </div>
                )}
                {displayed === 'apadrinhamento' && (
                  <div>
                    <ApadrinhamentoContent />
                  </div>
                )}
                {displayed === 'voluntariado' && (
                  <div>
                    <VoluntariadoContent />
                  </div>
                )}
              </div>
            )}

            {/* Incoming / steady content */}
            {!isOutgoing && (
              <div
                className={
                  'text-base-content/80 transition-all duration-250 ease-in ' +
                  (incomingActive
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2')
                }
              >
                {displayed === 'adocao' && (
                  <div>
                    {/* Use route-scoped Adoção component for steady-state content */}
                    <AdocaoContent />
                  </div>
                )}
                {displayed === 'apadrinhamento' && (
                  <div>
                    <ApadrinhamentoContent />
                  </div>
                )}
                {displayed === 'voluntariado' && (
                  <div>
                    <VoluntariadoContent />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default RouteComponent;
