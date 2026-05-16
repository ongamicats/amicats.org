import { useLingui } from '@lingui/react/macro';
import { msg } from '@lingui/core/macro';
import { CardComponent as Card } from '@/components/layout/daisy/data-display/card';
import { Figure } from '@/components/layout/ui/figure';
import { Img } from '@/components/layout/ui/img';
import { Badge } from '@/components/layout/daisy/data-display/badge';
import { Button } from '@/components/layout/daisy/actions/button';

export interface GatoCardProps {
  nome: string;
  descricao: string;
  imagem: string;
  status?: string;
  onAdotar?: () => void;
  onApadrinhar?: () => void;
}

export function GatoCard({
  nome,
  descricao,
  imagem,
  status,
  onAdotar,
  onApadrinhar,
}: GatoCardProps) {
  const { t } = useLingui();
  const displayStatus = status ?? t`Disponível`;

  return (
    <Card className="bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20">
      <Figure className="h-42 overflow-hidden relative">
        <Img
          src={imagem}
          alt={nome}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge variant="secondary" className="absolute top-2 right-2">
          {displayStatus}
        </Badge>
      </Figure>
      <Card.Body className="p-6 flex flex-col flex-1">
        <Card.Title className="text-sm md:text-lg truncate">{nome}</Card.Title>
        <p className="text-xs opacity-70 mb-4 line-clamp-2">{descricao}</p>
        <Card.Actions className="mt-auto flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="w-full btn-soft"
            onClick={onApadrinhar}
          >
            {t`Apadrinhe`}
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="w-full btn-outline"
            onClick={onAdotar}
          >
            {t`Quero Adotar`}
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}
