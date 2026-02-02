import { createFileRoute } from '@tanstack/react-router'
import { Footer } from './-components/footer'
import { IntroducaoSection } from './-components/introducao'
import { VoluntariosSection } from './-components/voluntarios'
import { QuemSomosSection } from './-components/quem-somos'
import { AdoteSection } from './-components/adote'

export const Route = createFileRoute('/landing/')({
    component: LandingPage,
})

export function LandingPage() {
    const heroImages = [
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1673785793672-3e8bb440ab2a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ]

    return (
        <div className="font-sans text-base-content bg-base-100">
            <IntroducaoSection images={heroImages} />
            <QuemSomosSection />
            <VoluntariosSection />
            <AdoteSection images={heroImages} />
            <Footer />
        </div>
    )
}
