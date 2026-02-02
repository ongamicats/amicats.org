import { createFileRoute } from '@tanstack/react-router'
import { LandingHeader } from '../components/layout/ui/LandingHeader'
import { LandingFooter } from '../components/layout/ui/LandingFooter'
import { Hero } from '../components/layout/ui/Hero'

export const Route = createFileRoute('/layout3')({
    component: Layout3,
})

function Layout3() {
    return (
        <div className="font-sans text-base-content bg-base-100">
            <LandingHeader />

            <Hero
                variant="video"
                title="Transforme o mundo com amor"
                subtitle="A AmiCat's é mais que um abrigo. Somos uma comunidade de protetores unidos por uma causa."
                ctaText="Seja Voluntário"
                ctaLink="#help"
            />

            {/* Alternating Features */}
            <section className="py-24 container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                    <div className="flex-1 order-2 md:order-1">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 blur-lg transform rotate-2"></div>
                            <img src="https://images.unsplash.com/photo-1596706059902-6e2dc0aee77f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Community" className="relative rounded-2xl shadow-xl w-full" />
                        </div>
                    </div>
                    <div className="flex-1 order-1 md:order-2">
                        <h2 className="text-4xl font-bold mb-6 text-primary">Comunidade Ativa</h2>
                        <p className="text-lg opacity-70 mb-6 leading-relaxed">
                            Nossa força vem da união. Voluntários, doadores e adotantes formam uma rede de solidariedade incrível.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <button className="btn btn-link text-primary p-0 text-lg">Conheça nossos projetos →</button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl font-bold mb-6 text-secondary">Transparência Total</h2>
                        <p className="text-lg opacity-70 mb-6 leading-relaxed">
                            Prestamos contas de cada centavo. Sua doação vai diretamente para ração, medicamentos e cuidados veterinários.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <button className="btn btn-link text-secondary p-0 text-lg">Ver prestação de contas →</button>
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-accent rounded-xl opacity-20 blur-lg transform -rotate-2"></div>
                            <div className="mockup-code relative shadow-xl bg-neutral text-neutral-content">
                                <pre data-prefix="$"><code>npm install amor-por-gatos</code></pre>
                                <pre data-prefix=">"><code>installing happiness...</code></pre>
                                <pre data-prefix=">"><code>Done! 100% Love</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    )
}
