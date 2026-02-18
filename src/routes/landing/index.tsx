import { createFileRoute } from '@tanstack/react-router'
import { Footer } from './-components/footer'
import { IntroducaoSection } from './-components/introducao'
import { VoluntariosSection } from './-components/voluntarios'
import { QuemSomosSection } from './-components/quem-somos'
import { AdoteSection } from './-components/adote'
import { OAbrigoSection } from './-components/o-abrigo'
import { CertificadosSection } from './-components/certificados'

export const Route = createFileRoute('/landing/')({
    component: LandingPage,
})

export function LandingPage() {
    const heroImages = [
        "https://f005.backblazeb2.com/file/catalogo-gatos/Zezinho+(1)+-+QG.jpg",
        "https://f005.backblazeb2.com/file/catalogo-gatos/Augusto+(1).jpg",
        "https://f005.backblazeb2.com/file/catalogo-gatos/Poliana+(1).jpg",
        "https://f005.backblazeb2.com/file/catalogo-gatos/Tulio.jpg",
        "https://f005.backblazeb2.com/file/catalogo-gatos/Chaplin.jpeg"
    ]

    const voluntarios = [
        {
            nome: 'Flavi',
            funcao: 'Coordenação Geral & Resgates',
            img: 'https://f005.backblazeb2.com/file/voluntarios/WhatsApp+Image+2026-02-04+at+19.02.08.jpeg'
        },
        {
            nome: 'Ana Cristina',
            funcao: 'Fundadora',
            img: 'https://f005.backblazeb2.com/file/voluntarios/screenshot-2026-02-16_13-50-21.png'
        },
        {
            nome: 'Lane',
            funcao: 'Coordenação de Redes & Cuidados',
            img: 'https://f005.backblazeb2.com/file/voluntarios/WhatsApp+Image+2026-02-04+at+19.51.30.jpeg'
        },
        {
            nome: 'João Pedro (JP)',
            funcao: 'Tecnologia & Cuidados',
            img: 'https://f005.backblazeb2.com/file/voluntarios/WhatsApp+Image+2026-02-16+at+14.31.49.jpeg'
        },
        {
            nome: 'Isabella Ceron',
            funcao: 'Redes & Resgates',
            img: 'https://f005.backblazeb2.com/file/voluntarios/screenshot-2026-02-16_13-58-53.png'
        }
    ];

    return (
        <div className="font-sans text-base-content bg-base-100">
            <IntroducaoSection images={heroImages} voluntarios={voluntarios} />
            <QuemSomosSection />
            <OAbrigoSection />
            <VoluntariosSection voluntarios={voluntarios} />
            <AdoteSection images={heroImages} />
            <CertificadosSection />
            <Footer />
        </div>
    )
}
