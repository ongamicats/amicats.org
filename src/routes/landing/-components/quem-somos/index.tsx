import { Heart, Home, Users } from 'lucide-react'
import { Container } from '@/components/layout/ui/container'
import { Grid } from '@/components/layout/ui/grid'
import { CardComponent as Card } from '@/components/layout/daisy/data-display/card'
import { SectionContainer } from '@/components/layout/ui/container/section'
import { Flex } from '@/components/layout/ui/flex'
import { Trans } from '@lingui/react/macro'

export function QuemSomosSection() {
  return (
    <SectionContainer containerId={'qs'} sectionId={'quem-somos'}>
      <Container
        fluid
        id={'qs-inner'}
        spacing="lg"
        className={
          'md:h-screen md:overflow-hidden landscape-mobile:h-auto landscape-mobile:overflow-visible'
        }
      >
        <Flex
          direction="col"
          className={'md:h-full py-10 landscape-mobile:h-auto'}
          justify="center"
        >
          <Flex
            direction="col"
            justify="center"
            gap={2}
            className={'items-center mx-auto py-10'}
          >
            <span className="text-secondary font-bold tracking-widest uppercase text-sm block">
              <Trans>Nossa História</Trans>
            </span>
            <h2 className="text-2xl md:text-4xl xl:text-5xl landscape-mobile:text-xl font-bold text-primary mb-4">
              <Trans>Quem Somos</Trans>
            </h2>
            <p className="text-center text-sm md:text-base opacity-70 wrap-break-word max-w-2xl mb-6">
              <Trans>
                A AmiCat's nasceu do desejo genuíno de mudar o destino de centenas
                de felinos nas ruas de Campo Grande. Somos voluntários apaixonados
                que dedicam tempo e recursos para resgatar, tratar e encontrar
                lares amorosos. Acreditamos que cada vida importa e que o amor
                pode curar as feridas mais profundas.
              </Trans>
            </p>
            </Flex>
          <Grid className="md:grid-cols-3 gap-6">
            <Card className="bg-base-200 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-primary">
              <Card.Body className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                  <Heart size={32} />
                </div>
                <Card.Title className="text-lg md:text-2xl mb-2">
                  Resgate & Cuidado
                </Card.Title>
                <p className="opacity-80">
                  Resgatamos gatos em situação de risco, oferecendo tratamento
                  veterinário completo e muito carinho até a recuperação.
                </p>
              </Card.Body>
            </Card>
            <Card className="bg-base-200 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-secondary">
              <Card.Body className="items-center text-center">
                <div className="p-4 bg-secondary/10 rounded-full mb-4 text-secondary">
                  <Home size={32} />
                </div>
                <Card.Title className="text-lg md:text-2xl mb-2">
                  Lares Temporários
                </Card.Title>
                <p className="opacity-80">
                  Nossa rede de voluntários oferece lares temporários seguros,
                  socializando os gatinhos para sua futura família.
                </p>
              </Card.Body>
            </Card>
            <Card className="bg-base-200 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-accent">
              <Card.Body className="items-center text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4 text-accent">
                  <Users size={32} />
                </div>
                <Card.Title className="text-lg md:text-2xl mb-2">
                  Eventos & Adoção
                </Card.Title>
                <p className="opacity-80">
                  Promovemos feiras de adoção e eventos educativos para
                  conscientizar sobre a posse responsável.
                </p>
              </Card.Body>
            </Card>
          </Grid>
        </Flex>
      </Container>
    </SectionContainer>
  )
}
