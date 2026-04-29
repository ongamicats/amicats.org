import { Container } from '@/components/layout/ui/container'
import { Grid } from '@/components/layout/ui/grid'
import { Flex } from '@/components/layout/ui/flex'
import { SectionContainer } from '@/components/layout/ui/container/section'
import { Trans } from '@lingui/react/macro'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export function OAbrigoSection() {
  const { i18n } = useLingui()
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
              <Trans>Estamos desde 2017 resgatando, cuidando e encontrando lares.</Trans>
            </p>
            <p className="text-sm md:text-base opacity-70">
              <Trans>
                Cada dia no abrigo é uma jornada de amor, dedicação e
                superação. Enfrentamos desafios constantes, mas cada vida salva
                nos motiva a continuar.
              </Trans>
            </p>
            <p className="pt-3 text-sm md:text-base opacity-70">
              {i18n._(
                t`We have areas for observation, treatment and recovery: kittens, adults and seniors. A quarantine area is used for newly rescued cats. We also maintain dedicated spaces for special-needs cats, such as those living with FIV or FeLV, ensuring a safe and welcoming environment for all.`
              )}
            </p>
          </Flex>
          <Flex grow direction="col" justify="center">
            <Container
              id="c-abrigo-desafios"
              size="lg"
              className="bg-base-100 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-base md:text-xl xl:text-3xl font-bold mb-4 text-center">
                {i18n._(t`Nossos Maiores Desafios`)}
              </h3>
              <Grid className="md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm md:text-lg font-semibold mb-3 text-primary">
                    {i18n._(t`Financeiro`)}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {i18n._(
                      t`Keeping the shelter running requires continuous resources for food, medication, veterinary care and infrastructure. We rely entirely on donations and the generosity of the community.`
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold mb-3 text-secondary">
                    {i18n._(t`Superlotação`)}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {i18n._(
                      t`The number of rescued cats keeps growing while space and resources remain limited. Each new rescue is a delicate balance between saving lives and maintaining quality care.`
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold mb-3 text-accent">
                    {i18n._(t`Casos Complexos`)}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {i18n._(
                      t`Many cats arrive with deep physical and emotional traumas, requiring prolonged treatments and specialized care. Rehabilitation is a long but rewarding process.`
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-semibold mb-3 text-info">
                    {i18n._(t`Conscientização`)}
                  </h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    {i18n._(
                      t`Educating about responsible ownership and the importance of spaying/neutering is essential to reduce abandonment. We continuously work to change mindsets and build a more compassionate community.`
                    )}
                  </p>
                </div>
              </Grid>
            </Container>
          </Flex>
        </Flex>
      </Container>
    </SectionContainer>
  )
}
