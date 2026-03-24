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

const desktopOrder: Record<number, string> = { 0: 'md:order-2', 1: 'md:order-1', 2: 'md:order-3', 3: 'md:order-4', 4: 'md:order-5' }

export function VoluntariosSection({ voluntarios }: VoluntariosProps) {
    return (
        <SectionContainer containerId="c-voluntarios" sectionId="voluntarios-section">
            <Container fluid id="c-voluntarios-equipe" spacing="lg" className="md:h-screen md:overflow-hidden landscape-mobile:h-auto landscape-mobile:overflow-visible">
                <Flex direction="col" justify="center" className="md:h-full py-10 landscape-mobile:h-auto">
                    <Flex direction="col" align="center" className="text-center mb-6">
                        <span className="text-info font-bold uppercase tracking-wider text-sm">Nossa Equipe</span>
                        <h2 className="text-2xl md:text-4xl landscape-mobile:text-xl font-bold mt-2 text-primary">Quem Faz Acontecer</h2>
                        <p className="mt-3 text-sm md:text-base opacity-70 max-w-2xl mx-auto">
                            Por trás de cada resgate, existe um time dedicado de voluntários que trabalha incansavelmente.
                        </p>
                    </Flex>
                    <Grid className="grid-cols-2 md:grid-cols-6 gap-4 md:gap-6">
                        {voluntarios.map((voluntario, index) => (
                            <div
                                key={voluntario.nome}
                                className={`${index === 0 ? 'col-span-2 md:col-span-2' : index < 3 ? 'md:col-span-2' : 'md:col-span-2 md:col-start-2 first:md:col-start-2 last:md:col-start-4'} ${desktopOrder[index] ?? ''}`}
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
