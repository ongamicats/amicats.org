import { Container } from '@/components/layout/ui/container'
import { GatoCard } from '@/components/layout/ui/gato-card'
import { Flex } from '@/components/layout/ui/flex'
import { SectionContainer } from '@/components/layout/ui/container/section'
import { GatosCarouselComponent as GatosCarousel } from '@/components/layout/ui/gatos-carousel'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export interface AdoteSectionProps {
  images: Array<string>
}

export function AdoteSection({ images }: AdoteSectionProps) {
  const { i18n } = useLingui()

  const gatos = [
    {
      nome: 'Zezinho',
      descricao: i18n._(
        t`Ama um carinho e adora um abraço, galã de novela.`,
      ),
      imagem: images[0],
      status: i18n._(t`Disponível`),
    },
    {
      nome: 'Augusto',
      descricao: i18n._(
        t`A fofura do abrigo, distribuidor de amor. Esqueceu de desligar a fofura.`,
      ),
      imagem: images[1],
      status: i18n._(t`Disponível`),
    },
    {
      nome: 'Poliana',
      descricao: i18n._(t`A Princesa da Ong, padeira de mão cheia, amor silencioso.`),
      imagem: images[2],
      status: i18n._(t`Disponível`),
    },
    {
      nome: 'Túlio',
      descricao: i18n._(t`Amigo estou aqui! Os seus problemas, são meus também... 🎶`),
      imagem: images[3],
      status: i18n._(t`Disponível`),
    },
  ]

  return (
    <SectionContainer
      containerId="c-adote"
      sectionId="adote"
      background="bg-base-200"
    >
      <Container
        fluid
        id="c-adote-gatinhos"
        spacing="lg"
        className="md:h-screen md:overflow-hidden landscape-mobile:h-auto landscape-mobile:overflow-visible"
      >
        <Flex
          direction="col"
          justify="center"
          className="md:h-full py-10 landscape-mobile:h-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-primary-content font-bold tracking-widest uppercase text-sm mb-2 block">
              {i18n._(t`Nossos amiguinhos`)}
            </span>
            <h2 className="text-xl md:text-3xl xl:text-4xl landscape-mobile:text-base text-primary font-bold mb-3">
              {i18n._(t`Gatinhos Disponíveis`)}
            </h2>
            <p className="text-sm md:text-base opacity-70">
              {i18n._(t`Estes pequenos estão prontos para encher sua casa de alegria.`)}
            </p>
          </div>

          <GatosCarousel buttonShape="circle" buttonColor="primary">
            {gatos.map((gato) => (
              <GatoCard
                key={gato.nome}
                nome={gato.nome}
                descricao={gato.descricao}
                imagem={gato.imagem}
                status={gato.status}
              />
            ))}
          </GatosCarousel>
        </Flex>
      </Container>
    </SectionContainer>
  )
}
