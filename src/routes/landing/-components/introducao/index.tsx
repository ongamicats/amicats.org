import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Button } from '@/components/layout/daisy/actions/button';
import { ImageStack } from '@/components/layout/ui/image-stack';
import { Resgates } from '@/components/layout/ui/resgates';
import { Container } from '@/components/layout/ui/container';
import { Flex } from '@/components/layout/ui/flex';
import { Img } from '@/components/layout/ui/img';

import amicatsLogo from '@/assets/amicats-logo.png';
import amicatsNameLogo from '@/assets/amicats-name-logo.png';

export interface IntroducaoSectionProps {
    imageSrc?: string;
    images?: Array<string>;
    voluntarios?: Array<{
        nome: string;
        funcao: string;
        img: string;
    }>;
}

export function IntroducaoSection({ imageSrc, images = [], voluntarios = [] }: IntroducaoSectionProps) {
    const displayImages = images.length > 0 ? images : [imageSrc || ""]

    return (
        <>
            <Container fluid className={twMerge(clsx('bg-base-100', 'w-full', 'h-screen', 'relative', 'overflow-hidden', 'p-10', 'pl-10', 'pr-10'))}>
                <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 block rounded-l-[5rem] z-0"></div>
                <Flex className={'z-10 flex-row-reverse items-center h-full'}>
                    <div className={'w-1/2 min-w-0 shrink'}>
                        <ImageStack images={displayImages} />
                    </div>
                    <Flex direction='col' className="w-1/2 min-w-0 shrink h-full justify-center text-left pt-20 lg:pt-0 relative isolate">
                        <h1 className="text-5xl md:text-6xl font-black text-base-content leading-tight flex items-center gap-2">
                            <Img
                                src={amicatsNameLogo}
                                alt="AmiCat's"
                                className="h-64 w-96 object-contain"
                            />
                        </h1>
                        <h1 className="text-5xl md:text-6xl font-black text-base-content leading-tight mb-6">
                            Salvando Vidas Felinas
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
                        <Resgates socorristas={voluntarios} />
                    </Flex>
                </Flex>
            </Container>
        </>
    )
}
