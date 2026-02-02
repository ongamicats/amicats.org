import { createFileRoute } from '@tanstack/react-router'
import { LandingHeader } from '../components/layout/ui/LandingHeader'
import { LandingFooter } from '../components/layout/ui/LandingFooter'
import { Hero } from '../components/layout/ui/Hero'

export const Route = createFileRoute('/layout2')({
    component: Layout2,
})

function Layout2() {
    return (
        <div className="font-sans text-base-content bg-base-100">
            <LandingHeader />

            <Hero
                variant="split"
                title="AmiCat's: Salvando Vidas Felinas"
                subtitle="Junte-se a nós na missão de proteger, cuidar e encontrar lares para gatos em Campo Grande."
                ctaText="Começe sua jornada"
                ctaLink="#adopt"
            />

            {/* Modern Grid Section */}
            <section className="py-24 px-4 bg-base-200">
                <div className="container mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Por que adotar na AmiCat's?</h2>
                        <p className="opacity-70">
                            Oferecemos todo o suporte necessário para que sua experiência de adoção seja perfeita.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Cards */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20">
                                <figure className="h-48 overflow-hidden relative">
                                    <img src={`https://images.unsplash.com/photo-${i === 1 ? '1574158622643-355af2a3a712' : i === 2 ? '1548802673-380ab8ebc427' : i === 3 ? '1513245543132-31f507417b26' : '1533738363-b7f9aef128ce'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`} alt="Cat" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-2 right-2 badge badge-secondary">Disponível</div>
                                </figure >
                                <div className="card-body p-6">
                                    <h3 className="card-title text-xl">Gato {i}</h3>
                                    <p className="text-sm opacity-70 mb-4 line-clamp-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                    </p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-sm btn-outline btn-primary w-full">Ver Detalhes</button>
                                    </div>
                                </div>
                            </div >
                        ))}
                    </div >
                </div >
            </section >

            <LandingFooter />
        </div >
    )
}
