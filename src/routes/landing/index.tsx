import { createFileRoute } from '@tanstack/react-router'
import { LandingHeader } from '../../components/layout/ui/LandingHeader'
import { LandingFooter } from '../../components/layout/ui/LandingFooter'
import { Hero } from '../../components/layout/ui/Hero'
import { Heart, Home, Users } from 'lucide-react'

export const Route = createFileRoute('/landing/')({
    component: LandingPage,
})

export function LandingPage() {
    return (
        <div className="font-sans text-base-content antialiased">
            <LandingHeader />

            <Hero
                variant="centered"
                title="Amar é cuidar."
                subtitle="Transformamos a vida de gatos abandonados através do amor, cuidado e adoção responsável."
                ctaText="Adote um Amigo"
                ctaLink="#adopt"
                imageSrc="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            />

            <section id="about" className="py-24 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Nossa História</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Quem Somos</h2>
                        <p className="text-lg opacity-70">
                            A AmiCat's nasceu do desejo genuíno de mudar o destino de centenas de felinos nas ruas de Campo Grande.
                            Somos voluntários apaixonados que dedicam tempo e recursos para resgatar, tratar e encontrar lares amorosos.
                            Acreditamos que cada vida importa e que o amor pode curar as feridas mais profundas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-primary">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
                                    <Heart size={32} />
                                </div>
                                <h3 className="card-title text-2xl mb-2">Resgate & Cuidado</h3>
                                <p className="opacity-80">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-secondary">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-secondary/10 rounded-full mb-4 text-secondary">
                                    <Home size={32} />
                                </div>
                                <h3 className="card-title text-2xl mb-2">Lares Temporários</h3>
                                <p className="opacity-80">
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                                </p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-accent">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-accent/10 rounded-full mb-4 text-accent">
                                    <Users size={32} />
                                </div>
                                <h3 className="card-title text-2xl mb-2">Eventos & Adoção</h3>
                                <p className="opacity-80">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="adopt" className="py-24 bg-neutral text-neutral-content relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Gato olhando para cima"
                            className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-base-100/10"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Encontre seu novo melhor amigo</h2>
                        <p className="text-xl mb-8 opacity-80 leading-relaxed">
                            Adoção é um ato de amor e responsabilidade. Nossos gatinhos são castrados, vacinados e vermifugados,
                            apenas esperando por uma chance de fazer parte da sua família.
                        </p>
                        <ul className="space-y-4 mb-10 text-lg">
                            <li className="flex items-center gap-3"><span className="text-primary">✓</span> Processo rigoroso e seguro</li>
                            <li className="flex items-center gap-3"><span className="text-primary">✓</span> Acompanhamento pós-adoção</li>
                            <li className="flex items-center gap-3"><span className="text-primary">✓</span> Suporte veterinário parceiro</li>
                        </ul>
                        <button className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/20">Quero Adotar Agora</button>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    )
}
