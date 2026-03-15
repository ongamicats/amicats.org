import { Container } from "@/components/layout/ui/container"
import { Flex } from "@/components/layout/ui/flex"
import { Grid } from "@/components/layout/ui/grid"
import { Voluntario } from "@/components/layout/ui/voluntario"
import { SectionContainer } from "@/components/layout/ui/container/section"

type VoluntariosProps = {
    voluntarios: Array<{
        nome: string;
        funcao: string;
        img: string;
    }>;
};

export function VoluntariosSection({ voluntarios }: VoluntariosProps) {
    return (
        <SectionContainer containerId="c-voluntarios" sectionId="voluntarios-section">
            <Container fluid id="c-voluntarios-equipe" spacing="lg" className="h-screen overflow-hidden">
                <Flex direction="col" justify="center" className="h-full py-10">
                    <Flex direction="col" align="center" className="text-center mb-6">
                        <span className="text-info font-bold uppercase tracking-wider text-sm">Nossa Equipe</span>
                        <h2 className="text-4xl font-bold mt-2 text-primary">Quem Faz Acontecer</h2>
                        <p className="mt-3 text-base opacity-70 max-w-2xl mx-auto">
                            Por trás de cada resgate, existe um time dedicado de voluntários que trabalha incansavelmente.
                        </p>
                    </Flex>
                    <Grid className="sm:grid-cols-2 md:grid-cols-6 gap-6">
                        {voluntarios.map((voluntario, index) => (
                            <div
                                key={index}
                                className={`${index < 3 ? 'md:col-span-2' : 'md:col-span-2 md:col-start-2 first:md:col-start-2 last:md:col-start-4'}`}
                            >
                                <Voluntario
                                    nome={voluntario.nome}
                                    funcao={voluntario.funcao}
                                    imagem={voluntario.img}
                                />
                            </div>
                        ))}
                    </Grid>
                </Flex>
            </Container>
        </SectionContainer>
    )
}
