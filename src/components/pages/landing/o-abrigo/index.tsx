import { Trans, useLingui } from '@lingui/react/macro';
import { msg } from '@lingui/core/macro';
import { Container } from '@/components/layout/ui/container';
import { Grid } from '@/components/layout/ui/grid';
import { Flex } from '@/components/layout/ui/flex';
import { SectionContainer } from '@/components/layout/ui/container/section';

export function OAbrigoSection() {
  const { t } = useLingui();
  return (
    <SectionContainer
      containerId="c-o-abrigo"
      sectionId="o-abrigo"
      background="bg-base-200"
    >
      <Container
        fluid
        id="innerc-o-abrigo"
        spacing="lg"
        className={
          'md:h-screen md:overflow-hidden landscape-mobile:h-auto landscape-mobile:overflow-visible'
        }
      >
        <Flex
          stackAt="md"
          align="stretch"
          gap={6}
          className="md:h-full py-10 landscape-mobile:h-auto"
        >
          <Flex
            id="c-abrigo-intro"
            justify="center"
            direction="col"
            grow
            className="items-center text-center"
          >
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">
              <Trans>Nosso Dia a Dia</Trans>
            </span>
            <h2 className="text-2xl md:text-4xl xl:text-5xl landscape-mobile:text-xl font-bold mb-4 text-primary">
              <Trans>O Abrigo</Trans>
            </h2>
            <p className="text-sm md:text-base opacity-70">
              <Trans>
                Estamos desde 2017 resgatando, cuidando e encontrando lares.
              </Trans>
            </p>
            <p className="text-sm md:text-base opacity-70">
              <Trans>
                Cada dia no abrigo é uma jornada de amor, dedicação e superação.
                Enfrentamos desafios constantes, mas cada vida salva nos motiva
                a continuar.
              </Trans>
            </p>
            <p className="pt-3 text-sm md:text-base opacity-70">
              {t`Temos áreas de observação, tratamento e recuperação: filhotes, adultos e idosos. Uma área de quarentena é usada para gatos recém-resgatados. Mantemos também espaços dedicados para gatos com necessidades especiais, como aqueles vivendo com FIV ou FeLV, garantindo um ambiente seguro e acolhedor para todos.`}
            </p>
          </Flex>
          <Flex grow direction="col" justify="center">
            <Container
              id="c-abrigo-desafios"
              size="lg"
              className="bg-base-100 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-base md:text-xl xl:text-3xl font-bold mb-4 text-center">
                {t`Nossos Maiores Desafios`}
              </h3>
              <Grid className="md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm md:text-lg font-semibold mb-3 text-primary">
                    {t`Financeiro`}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {t`Manter o abrigo ativo requer recursos contínuos para alimentação, medicamentos, cuidados veterinários e infraestrutura. Dependemos inteiramente de doações e da generosidade da comunidade.`}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold mb-3 text-secondary">
                    {t`Superlotação`}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {t`O número de gatos resgatados continua crescendo enquanto o espaço e os recursos permanecem limitados. Cada novo resgate é um delicado equilíbrio entre salvar vidas e manter a qualidade do cuidado.`}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold mb-3 text-accent">
                    {t`Casos Complexos`}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {t`Muitos gatos chegam com traumas físicos e emocionais profundos, exigindo tratamentos prolongados e cuidados especializados. A reabilitação é um processo longo, mas gratificante.`}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold mb-3 text-info">
                    {t`Conscientização`}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {t`Educar sobre a posse responsável e a importância da castração é essencial para reduzir o abandono. Trabalhamos continuamente para mudar mentalidades e construir uma comunidade mais compassiva.`}
                  </p>
                </div>
              </Grid>
            </Container>
          </Flex>
        </Flex>
      </Container>
    </SectionContainer>
  );
}
