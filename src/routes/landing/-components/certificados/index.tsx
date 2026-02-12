import { Container } from '@/components/layout/ui/container'
import { Section } from '@/components/layout/ui/section'
import { Grid } from '@/components/layout/ui/grid'

export function CertificadosSection() {
    const certificados = [
        {
            nome: "PHOMENTA",
            descricao: "Programa de Fomento às Atividades Produtivas Rurais",
            imagem: "/certificates/phomenta.png"
        },
        {
            nome: "Bem-Estar Animal",
            descricao: "Certificação de Padrões de Bem-Estar Animal",
            imagem: "/certificates/animal-welfare.png"
        },
        {
            nome: "Registro ONG",
            descricao: "Organização Sem Fins Lucrativos Registrada",
            imagem: "/certificates/nonprofit-registration.png"
        },
        {
            nome: "Parceria Veterinária",
            descricao: "Associação de Médicos Veterinários",
            imagem: "/certificates/veterinary-partnership.png"
        }
    ]

    return (
        <Section id="certificados" className="bg-base-100">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Reconhecimento</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Certificados</h2>
                    <p className="text-lg opacity-70">
                        Nosso compromisso com a excelência e transparência é reconhecido por diversas instituições.
                    </p>
                </div>

                <Grid className="md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {certificados.map((cert) => (
                        <div
                            key={cert.nome}
                            className="group relative bg-base-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-base-300">
                                <img
                                    src={cert.imagem}
                                    alt={cert.nome}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-primary">{cert.nome}</h3>
                                <p className="text-sm opacity-70">{cert.descricao}</p>
                            </div>
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </Grid>
            </Container>
        </Section>
    )
}
