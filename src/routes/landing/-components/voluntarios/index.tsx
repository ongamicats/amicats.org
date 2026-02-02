import { Section } from "@/components/layout/ui/section"
import { Container } from "@/components/layout/ui/container"
import { Flex } from "@/components/layout/ui/flex"
import { Grid } from "@/components/layout/ui/grid"
import { Voluntario } from "@/components/layout/ui/voluntario"

export function VoluntariosSection() {
    const team = [
        {
            name: 'Ana Silva',
            role: 'Fundadora & Resgates',
            img: 'https://i.pravatar.cc/150?img=9'
        },
        {
            name: 'Dr. Carlos Souza',
            role: 'Veterinário Responsável',
            img: 'https://i.pravatar.cc/150?img=11'
        },
        {
            name: 'Beatriz Oliveira',
            role: 'Coordenadora de Adoções',
            img: 'https://i.pravatar.cc/150?img=5'
        },
        {
            name: 'Ricardo Lima',
            role: 'Voluntário & Lares',
            img: 'https://i.pravatar.cc/150?img=3'
        }
    ]

    return (
        <Section className="bg-base-100">
            <Container>
                <Flex direction="col" align="center" className="text-center mb-16">
                    <span className="text-secondary font-bold uppercase tracking-wider text-sm">Nossa Equipe</span>
                    <h2 className="text-4xl font-bold mt-2 text-primary">Quem Faz Acontecer</h2>
                    <p className="mt-4 text-lg opacity-70 max-w-2xl mx-auto">
                        Por trás de cada resgate, existe um time dedicado de voluntários que trabalha incansavelmente.
                    </p>
                </Flex>

                <Grid className="sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <Voluntario
                            key={index}
                            nome={member.name}
                            funcao={member.role}
                            imagem={member.img}
                        />
                    ))}
                </Grid>
            </Container>
        </Section>
    )
}
