import { Trans, useLingui } from '@lingui/react/macro';
import { Container } from '@/components/layout/ui/container';
import { GatoCard } from '@/components/layout/ui/gato-card';
import { Flex } from '@/components/layout/ui/flex';
import { SectionContainer } from '@/components/layout/ui/container/section';
import { GatosCarouselComponent as GatosCarousel } from '@/components/layout/ui/gatos-carousel';

export interface AdoteSectionProps {
  images: Array<string>;
}

export function AdoteSection({ images: _images }: AdoteSectionProps) {
  const { t } = useLingui();

  const gatos = [
    {
      nome: 'Zezinho',
      descricao: t`Ama um carinho e adora um abraço, galã de novela.`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/zezinho/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Augusto',
      descricao: t`A fofura do abrigo, distribuidor de amor. Esqueceu de desligar a fofura!`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/augusto/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Carlos',
      descricao: t`O ronronar mais alto do abrigo! Gosta de colo e de ser o centro das atenções. 😻`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/carlos/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Elvis',
      descricao: t`O rei do rock felino, sempre fazendo pose para as câmeras. Carisma infinito! 🎸`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/elvis/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Hayd',
      descricao: t`Tímido no início, mas quando ganha confiança é o maior grudento da casa. 💕`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/hayd/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Lucas',
      descricao: t`Aventureiro e curioso, adora explorar cada cantinho. Seu novo melhor amigo!`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/lucas/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Maninho',
      descricao: t`O irmãozinho mais fofo que você vai conhecer. Amor em forma de gato!`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/maninho/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Marilyn',
      descricao: t`A diva do abrigo, linda e sabedora disso. Merece uma vida de estrela! ⭐`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/marilyn/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Mario',
      descricao: t`O herói do dia a dia, sempre pronto para um cafuné e uma soneca.`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/mario/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Mayara',
      descricao: t`Doce e carinhosa, faz ronronar de felicidade só de ver você chegar.`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/mayara/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Miguel',
      descricao: t`O companheiro fiel, aquele que sempre estará ao seu lado. Amor puro!`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/miguel/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Mozart',
      descricao: t`Musical e cheio de energia, transforma cada momento em uma sinfonia de amor. 🎵`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/mozart/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Paola',
      descricao: t`A princesa mais charmosa do abrigo, digna de um conto de fadas.`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/paola/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Pirelli',
      descricao: t`Ágil e veloz, o atleta do abrigo. Vida boa é correr e brincar sem parar!`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/pirelli/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Raul',
      descricao: t`O sábio da casa, tranquilo e cheio de histórias para contar.`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/raul/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Rodolfo',
      descricao: t`Romântico e gentil, o galã que vai conquistar seu coração.`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/rodolfo/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Stallone',
      descricao: t`Fortão e corajoso, mas com um coração gigante. O Rocky felino! 🥊`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/stallone/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Star',
      descricao: t`A estrela mais brilhante do abrigo, ilumina qualquer lar com sua presença.`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/star/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Stefany',
      descricao: t`Energia contagiante e alegria de viver. Vai trazer vida para sua casa!`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/stefany/IMG_0001.jpg',
      status: t`Disponível`,
    },
    {
      nome: 'Tropeco',
      descricao: t`O travesso da turma, sempre aprontando alguma. Diversão garantida! 😹`,
      imagem:
        'https://f005.backblazeb2.com/file/catalogo-gatos/catalogo_gatos/tropeco/IMG_0001.jpg',
      status: t`Disponível`,
    },
  ];

  const WHATSAPP_PHONE = '5567999300401';
  const buildWhatsappUrl = (nome: string) => {
    const text = t`Quero apadrinhar o ${nome} e saber como funciona.`;
    const encoded = encodeURIComponent(text);
    return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encoded}&type=phone_number&app_absent=0`;
  };

  const ADOPTION_FORM =
    'https://docs.google.com/forms/d/e/1FAIpQLSfa1qdsHuOn6WeFLKrdMUYJrGzKsI6xW--c7XW-DPGQQbV4WA/viewform?pli=1';

  return (
    <SectionContainer
      containerId="c-adote"
      sectionId="adote"
      background="bg-base-200"
    >
      <Container
        fluid
        id="c-adote-gatinhos"
        spacing="lg"
        className="md:h-screen md:overflow-hidden landscape-mobile:h-auto landscape-mobile:overflow-visible"
      >
        <Flex
          direction="col"
          justify="center"
          className="md:h-full py-10 landscape-mobile:h-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-primary-content font-bold tracking-widest uppercase text-sm mb-2 block">
              {t`Nossos amiguinhos`}
            </span>
            <h2 className="text-xl md:text-3xl xl:text-4xl landscape-mobile:text-base text-primary font-bold mb-3">
              {t`Gatinhos Disponíveis`}
            </h2>
            <p className="text-sm md:text-base opacity-70">
              {t`Estes pequenos estão prontos para encher sua casa de alegria.`}
            </p>
          </div>

          <GatosCarousel buttonShape="circle" buttonColor="primary">
            {gatos.map((gato) => (
              <GatoCard
                key={gato.nome}
                nome={gato.nome}
                descricao={gato.descricao}
                imagem={gato.imagem}
                status={gato.status}
                hrefApadrinhar={buildWhatsappUrl(gato.nome)}
                hrefAdotar={ADOPTION_FORM}
              />
            ))}
          </GatosCarousel>
        </Flex>
      </Container>
    </SectionContainer>
  );
}
