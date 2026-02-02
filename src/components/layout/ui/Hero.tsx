export interface HeroProps {
    variant: 'centered' | 'split' | 'video'
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    imageSrc?: string
    overlay?: boolean
}

export function Hero({ variant, title, subtitle, ctaText, ctaLink, imageSrc, overlay = false }: HeroProps) {
    if (variant === 'video') {
        // Simulated video with CSS pattern background for Layout 3
        return (
            <div className="hero min-h-screen relative overflow-hidden bg-primary/5">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-base-100 to-base-100"></div>
                {/* Abstract shapes */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>

                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-center text-neutral-content relative z-10 w-full max-w-4xl">
                    <div className="max-w-2xl mx-auto">
                        <div className="badge badge-secondary mb-4 p-3 font-semibold shadow-md">Comunidade Apaixonada</div>
                        <h1 className="mb-6 text-5xl md:text-7xl font-extrabold text-base-content leading-tight">
                            {title}
                        </h1>
                        <p className="mb-8 text-xl md:text-2xl text-base-content/80 font-light">
                            {subtitle}
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <a href={ctaLink} className="btn btn-primary btn-lg rounded-full px-8 shadow-xl hover:scale-105 transition-transform">{ctaText}</a>
                            <a href="#about" className="btn btn-outline btn-lg rounded-full px-8">Saiba Mais</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'split') {
        // Side by Side for Layout 2
        return (
            <div className="hero min-h-screen bg-base-100 relative">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 hidden lg:block rounded-l-[5rem]"></div>
                <div className="hero-content flex-col lg:flex-row-reverse gap-12 p-0 w-full max-w-7xl mx-auto px-6">
                    <div className="lg:w-1/2 w-full relative">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-base-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src={imageSrc || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                                className="w-full h-[500px] object-cover"
                                alt="Gato feliz"
                            />
                        </div>
                        {/* Decor elements */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full -z-0 opacity-50 blur-xl"></div>
                    </div>

                    <div className="lg:w-1/2 w-full text-left pt-20 lg:pt-0">
                        <h1 className="text-5xl md:text-6xl font-black text-base-content leading-tight mb-6">
                            {title}
                        </h1>
                        <p className="py-6 text-lg text-base-content/70 leading-relaxed max-w-lg">
                            {subtitle}
                        </p>
                        <div className="flex gap-4">
                            <a href={ctaLink} className="btn btn-primary btn-lg shadow-lg hover:shadow-primary/50">{ctaText}</a>
                            <button className="btn btn-ghost btn-lg">Como funciona?</button>
                        </div>

                        <div className="mt-12 flex items-center gap-4">
                            <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                                <div className="avatar border-base-100">
                                    <div className="w-10">
                                        <img src="https://i.pravatar.cc/100?img=1" />
                                    </div>
                                </div>
                                <div className="avatar border-base-100">
                                    <div className="w-10">
                                        <img src="https://i.pravatar.cc/100?img=2" />
                                    </div>
                                </div>
                                <div className="avatar border-base-100">
                                    <div className="w-10">
                                        <img src="https://i.pravatar.cc/100?img=3" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm font-semibold opacity-70">+200 adoções este mês</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Centered (Layout 1 - Standard)
    return (
        <div
            className="hero min-h-screen relative"
            style={{
                backgroundImage: `url(${imageSrc || "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"})`,
            }}>
            <div className="hero-overlay bg-black/40 backdrop-blur-[2px]"></div>
            <div className="hero-content text-center text-neutral-content relative z-10 pt-20">
                <div className="max-w-2xl px-4">
                    <h1 className="mb-6 text-5xl md:text-8xl font-black text-white drop-shadow-lg tracking-tight">
                        {title}
                    </h1>
                    <p className="mb-10 text-xl md:text-2xl text-white/90 font-medium drop-shadow-md max-w-xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                    <a href={ctaLink} className="btn btn-primary btn-lg border-0 bg-primary/90 hover:bg-primary text-white font-bold px-10 rounded-full shadow-2xl hover:scale-105 transition-transform uppercase tracking-wider">
                        {ctaText}
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
        </div>
    )
}
