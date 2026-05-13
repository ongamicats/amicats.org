import { createFileRoute } from '@tanstack/react-router';
import { Trans, useLingui } from '@lingui/react/macro';
import { Container } from '@/components/layout/ui/container';
import { Navbar as LandingNavbar } from '@/components/pages/landing/navbar';
import { Flex } from '@/components/layout/ui/flex';
import { Footer } from '@/components/pages/landing/footer';
import { Button } from '@/components/layout/daisy/actions/button';

export const Route = createFileRoute('/$locale/seja-um-parceiro/')({
  component: RouteComponent,
});

export function RouteComponent(): JSX.Element {
  const { t } = useLingui();

  return (
    <div className="pt-16 md:pt-20">
      <Container id="seja-um-parceiro-navbar" spacing="lg" fluid>
        <LandingNavbar forceVisible />
      </Container>

      {/* Title / hero band — follow como-funciona rhythm */}
      <Flex className="h-60 mb-6 bg-primary text-primary-content p-12" align="center">
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mt-2 text-white">
            <Trans>Como ser parceiro</Trans>
          </h1>
          <p className="mt-2 text-base opacity-95 text-white">{t`Veja como sua empresa pode iniciar uma parceria prática e transparente com a AmiCat's.`}</p>
        </div>
      </Flex>

      <Container id="seja-um-parceiro-content" spacing="lg" className="pb-6 md:pb-10" fluid>
        <div className="mx-auto max-w-7xl">
          <div className="md:grid md:grid-cols-3 md:gap-10">
            {/* Left: support / benefits (supporting, not main) */}
            <aside className="md:col-span-1">
              <div className="md:sticky md:top-28 mb-6 md:mb-0">
                <div className="rounded-lg bg-base-100 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">{t`Como ser parceiro da AmiCat's`}</h2>
                  <p className="mt-2 text-sm text-base-content/80">{t`A parceria fortalece nosso trabalho e dá visibilidade à sua marca com propósito.`}</p>

                <div className="mt-4 space-y-2 text-sm text-base-content/80">
                    <div className="flex items-start gap-3">
                      <span className="badge badge-primary badge-outline">✓</span>
                      <span>{t`Divulgação da marca em nossas redes sociais e eventos`}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="badge badge-primary badge-outline">✓</span>
                      <span>{t`Logo destacado em nosso site e materiais de comunicação`}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="badge badge-primary badge-outline">✓</span>
                      <span>{t`Certificado de Empresa Parceira`}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="badge badge-primary badge-outline">✓</span>
                      <span>{t`Possibilidade de ações conjuntas e eventos`}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="badge badge-primary badge-outline">✓</span>
                      <span>{t`A satisfação de contribuir para uma causa importante`}</span>
                    </div>

                    <div className="mt-10 flex justify-center">
                      <Button
                        href="https://api.whatsapp.com/send/?phone=5567999300401&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+como+me+tornar+parceiro+da+AmiCat%27s.&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t`Abrir WhatsApp para parcerias`}
                        variant="primary"
                        className="flex items-center gap-2"
                      >
                        {/* Inline WhatsApp icon from footer pattern */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path d="M20.52 3.48A11.81 11.81 0 0012.01.5C6.02.5 1.25 5.27 1.25 11.26c0 1.98.52 3.9 1.51 5.6L.5 23.5l6.9-2.02a11.7 11.7 0 005.6 1.3h.01c6 0 10.77-4.77 10.77-10.77 0-3.01-1.18-5.83-3.27-7.53zM12 20.5h-.01a10 10 0 01-4.96-1.4l-.36-.21-4.1 1.2 1.23-3.99-.24-.4A9.95 9.95 0 012 11.27c0-5.52 4.49-10 10-10 2.66 0 5.16 1.04 7.05 2.93A9.95 9.95 0 0122 11.26c0 5.52-4.49 9.24-10 9.24z" />
                          <path d="M17.24 14.5c-.3-.16-1.76-.86-2.03-.96-.27-.1-.47-.16-.67.16-.2.33-.78.96-.96 1.16-.18.2-.36.22-.66.08-.3-.14-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.14-.14.3-.36.45-.54.15-.18.2-.31.3-.52.1-.2.04-.38-.02-.54-.06-.16-.67-1.6-.92-2.2-.24-.58-.5-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.33-.28.26-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.36 5.19 4.71 3.05 1.35 3.05.9 3.6.85.55-.05 1.76-.72 2.01-1.42.24-.7.24-1.3.17-1.42-.07-.12-.27-.2-.57-.36z" />
                        </svg>
                        {t`Quero ser parceiro Amicat's!`}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main: partnership journey (centerpiece) */}
            <main className="md:col-span-2">
              <article className="bg-base-100 rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold">{t`Jornada para se tornar parceiro`}</h3>
                <p className="mt-2 text-base-content/80">{t`Um caminho simples e direto para começar a colaborar com a AmiCat's.`}</p>

                <ol className="mt-6 divide-y divide-base-200">
                  <li className="flex gap-4 py-6 items-start">
                    <div className="w-10 h-10 rounded-full bg-info text-info-content flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">{t`Demonstre interesse`}</h4>
                      <p className="text-sm text-base-content/80">{t`Envie um e-mail para iniciarmos a conversa sobre possibilidades e objetivos.`}</p>
                    </div>
                  </li>

                  <li className="flex gap-4 py-6 items-start">
                    <div className="w-10 h-10 rounded-full bg-info text-info-content flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">{t`Converse com a equipe`}</h4>
                      <p className="text-sm text-base-content/80">{t`Teremos uma reunião para entender seus interesses e o formato ideal de apoio.`}</p>
                    </div>
                  </li>

                  <li className="flex gap-4 py-6 items-start">
                    <div className="w-10 h-10 rounded-full bg-info text-info-content flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">{t`Defina o formato da parceria`}</h4>
                      <p className="text-sm text-base-content/80">{t`Escolha entre doações, descontos, patrocínios ou ações conjuntas, com regras claras.`}</p>
                    </div>
                  </li>

                  <li className="flex gap-4 py-6 items-start">
                    <div className="w-10 h-10 rounded-full bg-info text-info-content flex items-center justify-center font-bold">4</div>
                    <div>
                      <h4 className="font-semibold">{t`Alinhe divulgação e apoio`}</h4>
                      <p className="text-sm text-base-content/80">{t`Definimos como sua marca será divulgada e como a parceria será comunicada ao público.`}</p>
                    </div>
                  </li>

                  <li className="flex gap-4 py-6 items-start">
                    <div className="w-10 h-10 rounded-full bg-info text-info-content flex items-center justify-center font-bold">5</div>
                    <div>
                      <h4 className="font-semibold">{t`Comece a parceria`}</h4>
                      <p className="text-sm text-base-content/80">{t`Iniciamos as ações previstas e acompanhamos o impacto e a comunicação.`}</p>
                    </div>
                  </li>
                </ol>

                {/* Types section */}
                <section className="mt-12">
                  <h4 className="text-lg font-semibold">{t`Tipos de Parceria`}</h4>
                  <p className="mt-2 text-base-content/80">{t`Conheça as modalidades de parceria que oferecemos.`}</p>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-md bg-base-200 p-6 border-l-4 border-primary shadow-sm">
                      <h5 className="text-md font-semibold">{t`Doações`}</h5>
                      <p className="mt-2 text-base-content/80">{t`Empresas que desejam apoiar a ONG através de doações financeiras, produtos ou serviços`}</p>
                    </div>

                    <div className="rounded-md bg-base-200 p-6 border-l-4 border-primary shadow-sm">
                      <h5 className="text-md font-semibold">{t`Descontos`}</h5>
                      <p className="mt-2 text-base-content/80">{t`Pet shops, clínicas veterinárias e fornecedores que queiram oferecer descontos ou doações`}</p>
                    </div>

                    <div className="rounded-md bg-base-200 p-6 border-l-4 border-primary shadow-sm">
                      <h5 className="text-md font-semibold">{t`Eventos`}</h5>
                      <p className="mt-2 text-base-content/80">{t`Empresas interessadas em realizar eventos beneficentes ou ações conjuntas`}</p>
                    </div>
                  </div>
                </section>
              </article>
            </main>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default RouteComponent;
