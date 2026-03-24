import { Button } from '@/components/layout/daisy/actions/button';
import { ImageStack } from '@/components/layout/ui/image-stack';
import { Resgates } from '@/components/layout/ui/resgates';
import { Container } from '@/components/layout/ui/container';
import { Flex } from '@/components/layout/ui/flex';
import { Img } from '@/components/layout/ui/img';

import amicatsLogo from '@/assets/amicats-logo.png';
import amicatsLogoFull from '@/assets/amicats-logo-full.png';
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
                    fullHeight
                    overflow='hidden'
                    className={'bg-base-100 w-full relative'}>
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 rounded-l-[5rem] z-0 hidden md:block"></div>
                    <Flex reverse align='stretch' gap={8} className={'z-10 h-full'}>
                        <Flex grow mobileHidden className="h-full overflow-hidden">
                            <ImageStack images={displayImages} />
                        </Flex>
                        <Flex direction='col' grow mobileJustify='between' justify='center' mobileAlign='center' align='start' className="text-center md:text-left relative isolate py-10">
                            <div>
                                <Flex direction='col' mobileAlign='center' align='start' className="pb-3 max-w-lg">
                                    <h1 className="text-5xl md:text-6xl font-black text-base-content leading-tight flex items-baseline gap-2">
                                        <Img
                                            src={amicatsNameLogo}
                                            mobileSrc={amicatsLogoFull}
                                            landscapeSrc={amicatsNameLogo}
                                            alt="AmiCat's"
                                            className="h-[15vh] w-auto object-contain"
                                            mobileClassName="h-[40vh] w-auto object-contain"
                                            landscapeClassName="h-15 w-auto object-contain"
                                        />
                                    </h1>
                                </Flex>
                                <h1 className="text-3xl md:text-4xl xl:text-5xl landscape-mobile:text-xl font-black text-base-content leading-tight mb-4 whitespace-nowrap">
                                    Salvando Vidas Felinas
                                </h1>
                                <Flex mobileHidden className="landscape-mobile:hidden">
                                    <p className="py-3 text-base text-base-content/70 leading-relaxed max-w-lg">
                                        Junte-se a nós na missão de proteger, cuidar e encontrar lares para gatos em Campo Grande.
                                    </p>
                                </Flex>
                                <Flex gap={4} stackAt='md'>
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
                                </Flex>
                            </div>
                            <Resgates socorristas={voluntarios} />
                        </Flex>
                    </Flex>
                </Container>
            </SectionContainer>
        </>
    )
}
