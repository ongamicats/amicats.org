import { useLingui } from '@lingui/react/macro';
import { msg } from '@lingui/core/macro';
import { Container } from '@/components/layout/ui/container';
import { Grid } from '@/components/layout/ui/grid';
import { Flex } from '@/components/layout/ui/flex';
import { SectionContainer } from '@/components/layout/ui/container/section';

export function CertificadosSection() {
  const { t } = useLingui();

  const certificados = [
    {
      nome: 'PHOMENTA',
      descricao: t`PHOMENTA — Programa de fomento a atividades produtivas rurais`,
      imagem: '/certificates/phomenta.png',
    },
    {
      nome: t`Bem-Estar Animal`,
      descricao: t`Certificação de Bem-Estar Animal`,
      imagem: '/certificates/animal-welfare.png',
    },
    {
      nome: t`Registro ONG`,
      descricao: t`Organização sem fins lucrativos registrada`,
      imagem: '/certificates/nonprofit-registration.png',
    },
    {
      nome: t`Parceria Veterinária`,
      descricao: t`Parceria com clínica veterinária local`,
      imagem: '/certificates/veterinary-partnership.png',
    },
  ];

  return (
    <SectionContainer containerId="c-certificados" sectionId="certificados">
      <Container
        fluid
        id="c-certificados-inner"
        spacing="lg"
        className="md:h-screen md:overflow-hidden landscape-mobile:h-auto landscape-mobile:overflow-visible"
      >
        <Flex
          direction="col"
          justify="center"
          className="md:h-full py-10 landscape-mobile:h-auto"
        >
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="text-neutral font-bold tracking-widest uppercase text-sm mb-2 block">
              {t`Reconhecimento`}
            </span>
            <h2 className="text-2xl md:text-4xl xl:text-5xl landscape-mobile:text-xl font-bold mb-4 text-primary">
              {t`Certificados`}
            </h2>
            <p className="text-sm md:text-base opacity-70">
              {t`Nosso compromisso com a excelência e transparência é reconhecido por várias instituições.`}
            </p>
          </div>

          <Grid className="grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {certificados.map((cert) => (
              <div
                key={cert.nome}
                className="group relative bg-base-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden bg-base-300">
                  <img
                    src={cert.imagem}
                    alt={cert.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-2 md:p-4">
                  <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-primary">
                    {cert.nome}
                  </h3>
                  <p className="text-xs md:text-sm opacity-70">
                    {cert.descricao}
                  </p>
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </Grid>
        </Flex>
      </Container>
    </SectionContainer>
  );
}
