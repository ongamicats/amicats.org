import { Container } from "@/components/layout/ui/container"
import { Grid } from "@/components/layout/ui/grid"
import { GatoCard } from "@/components/layout/ui/gato-card"
import { Flex } from "@/components/layout/ui/flex"
import { SectionContainer } from "@/components/layout/ui/container/section"

export interface AdoteSectionProps {
  images: Array<string>
}

export function AdoteSection({ images }: AdoteSectionProps) {
  const gatos = [
    {
      nome: "Zezinho",
      descricao: "Ama um carinho e adora um abraço, galã de novela.",
      imagem: images[0],
      status: "Disponível"
    },
    {
      nome: "Augusto",
      descricao: "A fofura do abrigo, distribuidor de amor. Esqueceu de desligar a fofura.",
      imagem: images[1],
      status: "Disponível"
    },
    {
      nome: "Poliana",
      descricao: "A Princesa da Ong, padeira de mão cheia, amor silencioso.",
      imagem: images[2],
      status: "Disponível"
    },
    {
      nome: "Túlio",
      descricao: "Amigo estou aqui! Os seus problemas, são meus também... 🎶",
      imagem: images[3],
      status: "Disponível"
    }
  ]


  return (
    <SectionContainer containerId="c-adote" sectionId="adote" background="bg-base-200">
      <Container fluid id="c-adote-gatinhos" spacing="lg" className="h-screen overflow-hidden">
        <Flex direction="col" justify="center" className="h-full py-10">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-primary-content font-bold tracking-widest uppercase text-sm mb-2 block">Nossos amiguinhos</span>
            <h2 className="text-3xl xl:text-4xl text-primary font-bold mb-3">Gatinhos Disponíveis</h2>
            <p className="opacity-70">
              Estes pequenos estão prontos para encher sua casa de alegria.
            </p>
          </div>

          <Grid className="md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gatos.map((gato) => (
              <GatoCard
                key={gato.nome}
                nome={gato.nome}
                descricao={gato.descricao}
                imagem={gato.imagem}
                status={gato.status}
              />
            ))}
          </Grid>
        </Flex>
      </Container>
    </SectionContainer>
  )
}
