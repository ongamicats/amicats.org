import { Heart, Home, Users } from 'lucide-react'
import { Container } from '@/components/layout/ui/container'
import { Section } from '@/components/layout/ui/section'
import { Grid } from '@/components/layout/ui/grid'
import { CardComponent as Card } from '@/components/layout/daisy/data-display/card'

export function QuemSomosSection() {
    return (
        <Section id="about" className="bg-base-100">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Nossa História</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Quem Somos</h2>
                    <p className="text-lg opacity-70">
                        A AmiCat's nasceu do desejo genuíno de mudar o destino de centenas de felinos nas ruas de Campo Grande.
                        Somos voluntários apaixonados que dedicam tempo e recursos para resgatar, tratar e encontrar lares amorosos.
                        Acreditamos que cada vida importa e que o amor pode curar as feridas mais profundas.
                    </p>
                </div>

                <Grid className="md:grid-cols-3 gap-8">
                    <Card className="bg-base-200 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-primary">
                        <Card.Body className="items-center text-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                                <Heart size={32} />
                            </div>
                            <Card.Title className="text-2xl mb-2">Resgate & Cuidado</Card.Title>
                            <p className="opacity-80">
                                Resgatamos gatos em situação de risco, oferecendo tratamento veterinário completo e muito carinho até a recuperação.
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="bg-base-200 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-secondary">
                        <Card.Body className="items-center text-center">
                            <div className="p-4 bg-secondary/10 rounded-full mb-4 text-secondary">
                                <Home size={32} />
                            </div>
                            <Card.Title className="text-2xl mb-2">Lares Temporários</Card.Title>
                            <p className="opacity-80">
                                Nossa rede de voluntários oferece lares temporários seguros, socializando os gatinhos para sua futura família.
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="bg-base-200 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-accent">
                        <Card.Body className="items-center text-center">
                            <div className="p-4 bg-accent/10 rounded-full mb-4 text-accent">
                                <Users size={32} />
                            </div>
                            <Card.Title className="text-2xl mb-2">Eventos & Adoção</Card.Title>
                            <p className="opacity-80">
                                Promovemos feiras de adoção e eventos educativos para conscientizar sobre a posse responsável.
                            </p>
                        </Card.Body>
                    </Card>
                </Grid>
            </Container>
        </Section>
    )
}
