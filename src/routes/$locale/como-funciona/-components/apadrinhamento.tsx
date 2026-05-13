import { Trans, useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';
import { Cat, Handshake } from 'lucide-react';
import { SmallInfoCard } from './small-info-card';
import { Card } from '@/components/layout/daisy/data-display/card';
import { Badge } from '@/components/layout/daisy/data-display/badge';
import { cn } from '@/components/layout/shared/helpers/class.helper';

export function ApadrinhamentoContent() {
  const { t } = useLingui();

  const STEPS = useMemo(
    () => [
      {
        key: 'escolha',
        title: t`Escolha um gatinho`,
        desc: t`Encontre um gato para apoiar`,
      },
      {
        key: 'valor',
        title: t`Combine o valor mensal`,
        desc: t`Defina um valor que caiba no seu orçamento`,
      },
      {
        key: 'atualizacoes',
        title: t`Receba atualizações`,
        desc: t`Fotos e notícias do gatinho`,
      },
      {
        key: 'acompanhe',
        title: t`Acompanhe a jornada`,
        desc: t`Veja o progresso do gatinho durante o apoio`,
      },
    ],
    [t],
  );

  return (
    <div className={cn('space-y-6')}>
      <div className="rounded-md p-4 bg-secondary/10 border border-secondary/20 flex items-start gap-4">
        <Badge className="badge-lg badge-secondary" aria-hidden>
          💚
        </Badge>
        <div>
          <h3 className="text-lg font-semibold">{t`Ajude continuamente, sem precisar adotar`}</h3>
          <p className="mt-1 text-sm opacity-90">{t`Contribua com apoio mensal e acompanhe o gatinho.`}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmallInfoCard Icon={Cat} title={t`Como sua ajuda apoia o gatinho`}>
          <Trans>
            Sua contribuição ajuda em alimentação, medicação, higiene e cuidados
            essenciais para o bem-estar do gatinho.
          </Trans>
        </SmallInfoCard>

        <SmallInfoCard Icon={Handshake} title={t`O que você recebe em troca`}>
          <Trans>
            Atualizações regulares, fotos e a satisfação de saber que você faz a
            diferença na vida de um animal.
          </Trans>
        </SmallInfoCard>
      </div>

      <Card>
        <div className="p-6">
          <h4 className="font-semibold text-base mb-4">{t`Como funciona`}</h4>
          <div className="divide-y">
            {STEPS.map((s, idx) => (
              <div key={s.key} className="py-4 flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-content flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm opacity-90 mt-1">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ApadrinhamentoContent;
