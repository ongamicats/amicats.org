import { CardComponent as Card } from '@/components/layout/daisy/data-display/card'
import { Figure } from '@/components/layout/ui/figure'
import { Img } from '@/components/layout/ui/img'
import { Badge } from '@/components/layout/daisy/data-display/badge'
import { Button } from '@/components/layout/daisy/actions/button'

export interface GatoCardProps {
  nome: string
  descricao: string
  imagem: string
  status?: string
  onAdotar?: () => void
  onApadrinhar?: () => void
}

export function GatoCard({
  nome,
  descricao,
  imagem,
  status = 'Disponível',
  onAdotar,
  onApadrinhar,
}: GatoCardProps) {
  return (
    <Card className="bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20">
      <Figure className="h-42 overflow-hidden relative">
        <Img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge variant="secondary" className="absolute top-2 right-2">
          {status}
        </Badge>
      </Figure>
      <Card.Body className="p-6">
        <Card.Title className="text-sm md:text-lg">{nome}</Card.Title>
        <p className="text-xs opacity-70 mb-4 line-clamp-2">{descricao}</p>
        <Card.Actions>
          <Button
            variant="primary"
            size="sm"
            className="w-full btn-soft"
            onClick={onApadrinhar}
          >
            Apadrinhe
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="w-full btn-outline"
            onClick={onAdotar}
          >
            Quero Adotar
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  )
}
