import { Section } from "@/components/layout/ui/section"
import { Container } from "@/components/layout/ui/container"
import { Flex } from "@/components/layout/ui/flex"
import { Grid } from "@/components/layout/ui/grid"
import { Voluntario } from "@/components/layout/ui/voluntario"

type VoluntariosProps = {
    voluntarios: Array<{
        nome: string;
        funcao: string;
        img: string;
    }>;
};

export function VoluntariosSection({ voluntarios }: VoluntariosProps) {
    return (
        <Section className="bg-base-100 lg:h-180 overflow-hidden">
            <Container>
                <Flex direction="col" align="center" className="text-center mb-10">
                    <span className="text-info font-bold uppercase tracking-wider text-sm">Nossa Equipe</span>
                    <h2 className="text-4xl font-bold mt-2 text-primary">Quem Faz Acontecer</h2>
                    <p className="mt-4 text-lg opacity-70 max-w-2xl mx-auto">
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
            </Container>
        </Section>
    )
}
