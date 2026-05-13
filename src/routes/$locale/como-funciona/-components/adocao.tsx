import { Trans, useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';
import { CalendarHeart, MessageCircleWarning } from 'lucide-react';
import { SmallInfoCard } from './small-info-card';
import { Card } from '@/components/layout/daisy/data-display/card';
import { Badge } from '@/components/layout/daisy/data-display/badge';
import { cn } from '@/components/layout/shared/helpers/class.helper';

export function AdocaoContent() {
  const { t } = useLingui();

  const STEPS = useMemo(
    () => [
      {
        key: 'login',
        title: t`Faça login`,
        desc: t`Acesse sua conta na plataforma`,
      },
      {
        key: 'form',
        title: t`Preencha o formulário`,
        desc: t`Complete o formulário de adoção`,
      },
      {
        key: 'avaliacao',
        title: t`Aguarde a avaliação`,
        desc: t`Nossa equipe analisará seu pedido`,
      },
      {
        key: 'visita',
        title: t`Converse com a equipe / visita`,
        desc: t`Agendaremos contato e visita quando necessário`,
      },
      {
        key: 'finalizar',
        title: t`Finalize a adoção`,
        desc: t`Leve seu novo amigo para casa com segurança`,
      },
    ],
    [t],
  );

  return (
    <div className={cn('space-y-6')}>
      {/* guide strip */}
      <div className="rounded-md p-4 bg-warning/10 border border-warning/20 flex items-start gap-4">
        <Badge className="badge-lg badge-warning" aria-hidden>
          🧡
        </Badge>
        <div>
          <h3 className="text-lg font-semibold">{t`Adotar com responsabilidade`}</h3>
          <p className="mt-1 text-sm opacity-90">{t`Guia de adoção`}</p>
          <p className="mt-1 text-sm opacity-85">{t`Adoção é um compromisso de cuidado permanente. Saiba as etapas abaixo.`}</p>
        </div>
      </div>

      {/* support blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmallInfoCard Icon={MessageCircleWarning} title={t`Antes de começar`}>
          <Trans>
            Certifique-se de que todos na residência concordam, que o ambiente é
            seguro e que você tem disponibilidade para os cuidados.
          </Trans>
        </SmallInfoCard>

        <SmallInfoCard
          Icon={CalendarHeart}
          title={t`Compromissos de longo prazo`}
        >
          <Trans>
            Adoção envolve custos veterinários, alimentação e atenção diária — é
            um compromisso para os próximos anos.
          </Trans>
        </SmallInfoCard>
      </div>

      {/* reminder strip */}
      <div className="rounded-md p-3 bg-base-200 text-sm">
        <strong className="mr-2">{t`Lembrete:`}</strong>
        <span>
          <Trans>
            A adoção transforma vidas — de quem recebe e de quem doa. Pense com
            carinho e responsabilidade.
          </Trans>
        </span>
      </div>

      {/* main process */}
      <Card>
        <div className="py-2 px-6">
          <h4 className="font-semibold text-base mb-4">{t`Processo`}</h4>
          <div className="divide-y">
            {STEPS.map((s, idx) => (
              <div key={s.key} className="py-4 flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-warning text-warning-content flex items-center justify-center font-bold">
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

export default AdocaoContent;
