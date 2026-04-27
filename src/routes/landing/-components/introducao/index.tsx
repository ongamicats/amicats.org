import { useEffect, useState } from 'react'
import { Button } from '@/components/layout/daisy/actions/button'
import { LanguageSelect } from '@/components/layout/ui/language-select'
import { ImageStack } from '@/components/layout/ui/image-stack'
import { Resgates } from '@/components/layout/ui/resgates'
import { Container } from '@/components/layout/ui/container'
import { Flex } from '@/components/layout/ui/flex'
import { Img } from '@/components/layout/ui/img'

import amicatsLogoFull from '@/assets/amicats-logo-full.png'
import amicatsNameLogo from '@/assets/amicats-name-logo.png'
import { SectionContainer } from '@/components/layout/ui/container/section'
import { Trans } from '@lingui/react/macro'

export interface IntroducaoSectionProps {
  imageSrc?: string
  images?: Array<string>
  voluntarios?: Array<{
    nome: string
    funcao: string
    img: string
  }>
}

export function IntroducaoSection({
  imageSrc,
  images = [],
  voluntarios = [],
}: IntroducaoSectionProps) {
  const displayImages = images.length > 0 ? images : [imageSrc || '']
  const [showToggle, setShowToggle] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => setShowToggle(window.scrollY < 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <SectionContainer containerId={'intro'} sectionId={'introducao'}>
        <Container
          id={'intro-inner'}
          fluid
          spacing="lg"
          fullHeight
          overflow="hidden"
          className={'bg-base-100 w-full relative'}
        >
          {/* hero overlay language toggle (top-right) */}
          <div className="absolute right-4 top-4 z-20">
            {showToggle && <LanguageSelect />}
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 rounded-l-[5rem] z-0 hidden md:block"></div>
          <Flex reverse align="stretch" gap={8} className={'z-10 h-full'}>
            <Flex grow mobileHidden className="h-full overflow-hidden">
              <ImageStack images={displayImages} />
            </Flex>
            <Flex
              direction="col"
              grow
              mobileJustify="between"
              justify="center"
              mobileAlign="center"
              align="start"
              className="text-center md:text-left relative isolate py-10"
            >
              <div>
                <Flex
                  direction="col"
                  mobileAlign="center"
                  align="start"
                  className="pb-3 max-w-lg"
                >
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
                  <Trans>Salvando Vidas Felinas</Trans>
                </h1>
                <Flex mobileHidden className="landscape-mobile:hidden">
                  <p className="py-3 text-base text-base-content/70 leading-relaxed max-w-lg">
                    <Trans>
                      Junte-se a nós na missão de proteger, cuidar e encontrar
                      lares para gatos em Campo Grande.
                    </Trans>
                  </p>
                </Flex>
                <Flex gap={4} stackAt="md">
                  <Button
                    href="#adote"
                    variant="primary"
                    size="lg"
                    className="shadow-lg hover:shadow-primary/50"
                  >
                    <Trans>Comece sua Jornada</Trans>
                  </Button>
                  <Button variant="ghost" size="lg">
                    <Trans>Como funciona?</Trans>
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
