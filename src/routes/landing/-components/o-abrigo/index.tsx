import { Container } from '@/components/layout/ui/container'
import { Grid } from '@/components/layout/ui/grid'
import { Flex } from '@/components/layout/ui/flex'
import { SectionContainer } from '@/components/layout/ui/container/section'

export function OAbrigoSection() {
    return (
        <SectionContainer containerId='c-o-abrigo' sectionId="o-abrigo" background='bg-base-200'>
            <Container fluid id='innerc-o-abrigo' spacing='lg' className={'md:h-screen md:overflow-hidden landscape-mobile:h-auto landscape-mobile:overflow-visible'}>
                <Flex stackAt='md' align='stretch' gap={6} className='md:h-full py-10 landscape-mobile:h-auto'>
                    <Flex id='c-abrigo-intro' justify='center' direction='col' grow className="items-center text-center">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">Nosso Dia a Dia</span>
                        <h2 className="text-2xl md:text-4xl xl:text-5xl landscape-mobile:text-xl font-bold mb-4 text-primary">O Abrigo</h2>
                        <p className="text-sm md:text-base opacity-70">
                            Estamos desde 2017 resgatando, cuidando e encontrando lares. 
                        </p>
                        <p className="text-sm md:text-base opacity-70">
                            Cada dia no abrigo é uma jornada de amor, dedicação e superação.
                            Enfrentamos desafios constantes, mas cada vida salva nos motiva a continuar.
                        </p>
                        <p className="pt-3 text-sm md:text-base opacity-70">
                            Possuímos areás de cuidados de gatos em observação, tratamento e recuperação.
                            Areas de filhotes, adultos e idosos. E uma área de quarentena para gatos recém resgatados. Além de áreas exclusivas para gatos com necessidades especiais, como os que vivem com FIV ou Felv, garantindo um ambiente seguro e acolhedor para todos.
                        </p>
                    </Flex>
                    <Flex grow direction='col' justify='center'>
                        <Container id='c-abrigo-desafios' size="lg" className="bg-base-100 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-base md:text-xl xl:text-3xl font-bold mb-4 text-center">Nossos Maiores Desafios</h3>
                            <Grid className="md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm md:text-lg font-semibold mb-3 text-primary">Financeiro</h4>
                                <p className="text-xs opacity-80 leading-relaxed">
                                    Manter o abrigo funcionando exige recursos constantes para alimentação,
                                    medicamentos, consultas veterinárias e infraestrutura. Dependemos
                                    inteiramente de doações e da generosidade da comunidade.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm md:text-lg font-semibold mb-3 text-secondary">Superlotação</h4>
                                <p className="text-xs opacity-80 leading-relaxed">
                                    O número de gatos resgatados cresce constantemente, enquanto o espaço
                                    e recursos permanecem limitados. Cada novo resgate é um equilíbrio
                                    delicado entre salvar vidas e manter a qualidade do cuidado.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm md:text-lg font-semibold mb-3 text-accent">Casos Complexos</h4>
                                <p className="text-xs opacity-80 leading-relaxed">
                                    Muitos gatos chegam com traumas físicos e emocionais profundos,
                                    exigindo tratamentos prolongados e cuidados especializados.
                                    A reabilitação é um processo longo, mas gratificante.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm md:text-lg font-semibold mb-3 text-info">Conscientização</h4>
                                <p className="text-xs opacity-80 leading-relaxed">
                                    Educar sobre posse responsável e a importância da castração é
                                    fundamental para reduzir o abandono. Trabalhamos constantemente
                                    para mudar mentalidades e criar uma comunidade mais compassiva.
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
