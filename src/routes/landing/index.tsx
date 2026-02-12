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

    return (
        <div className="font-sans text-base-content bg-base-100">
            <IntroducaoSection images={heroImages} />
            <QuemSomosSection />
            <OAbrigoSection />
            <VoluntariosSection />
            <AdoteSection images={heroImages} />
            <CertificadosSection />
            <Footer />
        </div>
    )
}
