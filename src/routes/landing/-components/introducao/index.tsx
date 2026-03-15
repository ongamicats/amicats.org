import { Button } from '@/components/layout/daisy/actions/button';
import { ImageStack } from '@/components/layout/ui/image-stack';
import { Resgates } from '@/components/layout/ui/resgates';
import { Container } from '@/components/layout/ui/container';
import { Flex } from '@/components/layout/ui/flex';
import { Img } from '@/components/layout/ui/img';

import amicatsNameLogo from '@/assets/amicats-name-logo.png';
import { SectionContainer } from '@/components/layout/ui/container/section';

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
            <SectionContainer containerId={'intro'} sectionId={'introducao'}>
                <Container
                    id={'intro-inner'}
                    fluid
                    spacing='lg'
                    className={'bg-base-100 w-full h-screen overflow-hidden relative'}>
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 block rounded-l-[5rem] z-0"></div>
                    <Flex reverse align='stretch' gap={8} className={'z-10 h-full'}>
                        <Flex grow>
                            <ImageStack images={displayImages} />
                        </Flex>
                        <Flex direction='col' grow justify='center' className="text-left relative isolate py-10">
                            <Flex direction='col' className="pb-3 items-start text-left max-w-lg">
                                <h1 className="text-5xl md:text-6xl font-black text-base-content leading-tight flex items-baseline gap-2">
                                    <Img
                                        src={amicatsNameLogo}
                                        alt="AmiCat's"
                                        className="h-[15vh] w-auto object-contain"
                                    />
                                </h1>
                            </Flex>
                            <h1 className="text-4xl xl:text-5xl font-black text-base-content leading-tight mb-4">
                                Salvando Vidas Felinas
                            </h1>
                            <p className="py-3 text-base text-base-content/70 leading-relaxed max-w-lg">
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
            </SectionContainer>
        </>
    )
}
