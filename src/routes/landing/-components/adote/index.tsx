import { Section } from "@/components/layout/ui/section"
import { Container } from "@/components/layout/ui/container"
import { Grid } from "@/components/layout/ui/grid"
import { GatoCard } from "@/components/layout/ui/gato-card"

export interface AdoteSectionProps {
  images: string[]
}

export function AdoteSection({ images }: AdoteSectionProps) {
  return (
    <Section id="adote" className="px-4 bg-base-200">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Gatinhos Disponíveis</h2>
          <p className="opacity-70">
            Estes pequenos estão prontos para encher sua casa de alegria.
          </p>
        </div>

        <Grid className="md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <GatoCard
              key={i}
              nome={`Gato ${i + 1}`}
              descricao="Castrado, vacinado e muito carinhoso. Adora brincar com bolinhas de papel."
              imagem={images[i]}
              status="Disponível"
            />
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
