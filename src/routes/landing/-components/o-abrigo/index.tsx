import { Clock, TrendingUp, AlertCircle, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/ui/container'
import { Section } from '@/components/layout/ui/section'
import { Grid } from '@/components/layout/ui/grid'
import { CardComponent as Card } from '@/components/layout/daisy/data-display/card'

export function OAbrigoSection() {
    return (
        <Section id="o-abrigo" className="bg-base-200">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">Nosso Dia a Dia</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">O Abrigo</h2>
                    <p className="text-lg opacity-70">
                        Cada dia no abrigo é uma jornada de amor, dedicação e superação.
                        Enfrentamos desafios constantes, mas cada vida salva nos motiva a continuar.
                    </p>
                </div>

                <Grid className="md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <Card className="bg-base-100 hover:-translate-y-2 transition-transform duration-300 border-l-4 border-primary">
                        <Card.Body className="items-center text-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                                <Clock size={32} />
                            </div>
                            <Card.Title className="text-2xl mb-2">24/7</Card.Title>
                            <p className="opacity-80">
                                Cuidados contínuos para garantir que cada gatinho receba atenção quando precisar
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="bg-base-100 hover:-translate-y-2 transition-transform duration-300 border-l-4 border-secondary">
                        <Card.Body className="items-center text-center">
                            <div className="p-4 bg-secondary/10 rounded-full mb-4 text-secondary">
                                <TrendingUp size={32} />
                            </div>
                            <Card.Title className="text-2xl mb-2">150+</Card.Title>
                            <p className="opacity-80">
                                Gatos resgatados e reabilitados ao longo dos anos
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="bg-base-100 hover:-translate-y-2 transition-transform duration-300 border-l-4 border-accent">
                        <Card.Body className="items-center text-center">
                            <div className="p-4 bg-accent/10 rounded-full mb-4 text-accent">
                                <AlertCircle size={32} />
                            </div>
                            <Card.Title className="text-2xl mb-2">Desafios</Card.Title>
                            <p className="opacity-80">
                                Recursos limitados, casos complexos e a busca constante por lares responsáveis
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="bg-base-100 hover:-translate-y-2 transition-transform duration-300 border-l-4 border-info">
                        <Card.Body className="items-center text-center">
                            <div className="p-4 bg-info/10 rounded-full mb-4 text-info">
                                <Sparkles size={32} />
                            </div>
                            <Card.Title className="text-2xl mb-2">Vitórias</Card.Title>
                            <p className="opacity-80">
                                Cada adoção bem-sucedida e cada vida transformada nos inspira
                            </p>
                        </Card.Body>
                    </Card>
                </Grid>

                <div className="bg-base-100 rounded-2xl p-8 md:p-12 shadow-xl">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">Nossos Maiores Desafios</h3>
                    <Grid className="md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xl font-semibold mb-3 text-primary">Financeiro</h4>
                            <p className="opacity-80 leading-relaxed">
                                Manter o abrigo funcionando exige recursos constantes para alimentação,
                                medicamentos, consultas veterinárias e infraestrutura. Dependemos
                                inteiramente de doações e da generosidade da comunidade.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-3 text-secondary">Superlotação</h4>
                            <p className="opacity-80 leading-relaxed">
                                O número de gatos abandonados cresce constantemente, enquanto o espaço
                                e recursos permanecem limitados. Cada novo resgate é um equilíbrio
                                delicado entre salvar vidas e manter a qualidade do cuidado.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-3 text-accent">Casos Complexos</h4>
                            <p className="opacity-80 leading-relaxed">
                                Muitos gatos chegam com traumas físicos e emocionais profundos,
                                exigindo tratamentos prolongados e cuidados especializados.
                                A reabilitação é um processo longo, mas gratificante.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-3 text-info">Conscientização</h4>
                            <p className="opacity-80 leading-relaxed">
                                Educar sobre posse responsável e a importância da castração é
                                fundamental para reduzir o abandono. Trabalhamos constantemente
                                para mudar mentalidades e criar uma comunidade mais compassiva.
                            </p>
                        </div>
                    </Grid>
                </div>
            </Container>
        </Section>
    )
}
