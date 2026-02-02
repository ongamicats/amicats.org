import { Hero } from '@/components/layout/daisy/layout/hero'
import { Button } from '@/components/layout/daisy/actions/button'
import { ImageStack } from '@/components/layout/ui/image-stack'
import { Resgates } from '@/components/layout/ui/resgates'


export interface IntroducaoSectionProps {
    imageSrc?: string
    images?: string[]
}

export function IntroducaoSection({ imageSrc, images = [] }: IntroducaoSectionProps) {
    const displayImages = images.length > 0 ? images : [imageSrc || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]

    return (
        <Hero className="bg-base-100 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 hidden lg:block rounded-l-[5rem]"></div>
            <Hero.Content className="flex-col lg:flex-row-reverse gap-12 p-0 w-full max-w-7xl mx-auto px-6 relative z-10">
                <ImageStack images={displayImages} />
                <div className="lg:w-1/2 w-full text-left pt-20 lg:pt-0">
                    <h1 className="text-5xl md:text-6xl font-black text-base-content leading-tight mb-6">
                        AmiCat's: Salvando Vidas Felinas
                    </h1>
                    <p className="py-6 text-lg text-base-content/70 leading-relaxed max-w-lg">
                        Junte-se a nós na missão de proteger, cuidar e encontrar lares para gatos em Campo Grande.
                    </p>
                    <div className="flex gap-4">
                        <Button
                            href="#adote"
                            variant="primary"
                            size="lg"
                            className="shadow-lg hover:shadow-primary/50"
                        >
                            Começe sua jornada
                        </Button>
                        <Button
                            variant="ghost"
                            size="lg"
                        >
                            Como funciona?
                        </Button>
                    </div>
                    <Resgates />
                </div>
            </Hero.Content>
        </Hero>
    )
}
