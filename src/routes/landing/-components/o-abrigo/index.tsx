import { Container } from '@/components/layout/ui/container'
import { Section } from '@/components/layout/ui/section'
import { Grid } from '@/components/layout/ui/grid'
import { Flex } from '@/components/layout/ui/flex'

export function OAbrigoSection() {
    return (
        <Section id="o-abrigo" className="bg-base-200 lg:h-150 overflow-hidden">
            <Container>
                <Flex gap={4}>
                    <Container size='md' className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">Nosso Dia a Dia</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">O Abrigo</h2>
                        <p className="text-base opacity-70">
                            Estamos desde 2017 resgatando, cuidando e encontrando lares. 
                        </p>
                        <p className="text-base opacity-70">
                            Cada dia no abrigo é uma jornada de amor, dedicação e superação.
                            Enfrentamos desafios constantes, mas cada vida salva nos motiva a continuar.
                        </p>
                        <p className="pt-4 text-base opacity-70">
                            Possuímos areás de cuidados de gatos em observação, tratamento e recuperação.
                            Areas de filhotes, adultos e idosos. E uma área de quarentena para gatos recém resgatados. Além de áreas exclusivas para gatos com necessidades especiais, como os que vivem com FIV ou Felv, garantindo um ambiente seguro e acolhedor para todos.
                        </p>
                    </Container>
                    <Container size="md" className="bg-base-100 rounded-2xl p-8 md:p-12 shadow-xl">
                        <h3 className="text-lg md:text-3xl font-bold mb-6 text-center">Nossos Maiores Desafios</h3>
                        <Grid className="md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-primary">Financeiro</h4>
                                <p className="text-xs opacity-80 leading-relaxed">
                                    Manter o abrigo funcionando exige recursos constantes para alimentação,
                                    medicamentos, consultas veterinárias e infraestrutura. Dependemos
                                    inteiramente de doações e da generosidade da comunidade.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-secondary">Superlotação</h4>
                                <p className="text-xs opacity-80 leading-relaxed">
                                    O número de gatos resgatados cresce constantemente, enquanto o espaço
                                    e recursos permanecem limitados. Cada novo resgate é um equilíbrio
                                    delicado entre salvar vidas e manter a qualidade do cuidado.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-accent">Casos Complexos</h4>
                                <p className="text-xs opacity-80 leading-relaxed">
                                    Muitos gatos chegam com traumas físicos e emocionais profundos,
                                    exigindo tratamentos prolongados e cuidados especializados.
                                    A reabilitação é um processo longo, mas gratificante.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-info">Conscientização</h4>
                                <p className="text-xs opacity-80 leading-relaxed">
                                    Educar sobre posse responsável e a importância da castração é
                                    fundamental para reduzir o abandono. Trabalhamos constantemente
                                    para mudar mentalidades e criar uma comunidade mais compassiva.
                                </p>
                            </div>
                        </Grid>
                    </Container>
                </Flex>
            </Container>
        </Section>
    )
}
