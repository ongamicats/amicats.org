import { Trans, useLingui } from '@lingui/react/macro';
import { useMemo } from 'react';
import { HandFist, MessageCircleWarning } from 'lucide-react';
import { SmallInfoCard } from './small-info-card';
import { Card } from '@/components/layout/daisy/data-display/card';
import { Badge } from '@/components/layout/daisy/data-display/badge';
import { cn } from '@/components/layout/shared/helpers/class.helper';

export function VoluntariadoContent() {
  const { t } = useLingui();

  const STEPS = useMemo(
    () => [
      {
        key: 'interesse',
        title: t`Preencha seu interesse`,
        desc: t`Primeiro, você demonstra interesse e compartilha sua disponibilidade`,
      },
      {
        key: 'conversa',
        title: t`Conversa inicial`,
        desc: t`Nossa equipe faz um alinhamento inicial para apresentar a rotina e orientar os primeiros passos`,
      },
      {
        key: 'orientacoes',
        title: t`Receba orientações`,
        desc: t`Você receberá orientações e treinamentos para atuar com segurança e organização`,
      },
      {
        key: 'rotina',
        title: t`Entre na rotina`,
        desc: t`Após o alinhamento você pode começar a colaborar de forma organizada e segura`,
      },
    ],
    [t],
  );

  return (
    <div className={cn('space-y-6')}>
      {/* guide strip */}
      <div className="rounded-md p-4 bg-info/10 border border-info/20 flex items-start gap-4">
        <Badge className="badge-lg badge-info" aria-hidden>
          🤝
        </Badge>
        <div>
          <h3 className="text-lg font-semibold">{t`Sobre Voluntariado`}</h3>
          <p className="mt-1 text-sm opacity-90">{t`Participe da rotina de cuidado e apoio aos gatos resgatados`}</p>
          <p className="mt-1 text-sm opacity-85">{t`Voluntariado na AmiCat's — sua ajuda, de forma organizada e segura.`}</p>
        </div>
      </div>

      {/* support/info blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmallInfoCard Icon={MessageCircleWarning} title={t`Antes de começar`}>
          <Trans>
            Certifique-se de que sua disponibilidade se alinha com as
            necessidades e de que você segue orientações de segurança e
            bem-estar dos animais.
          </Trans>
        </SmallInfoCard>

        <SmallInfoCard Icon={HandFist} title={t`O que esperar`}>
          <Trans>
            Atividades em grupo, escalas de atividade e acompanhamento da equipe
            — sua ajuda será coordenada para gerar o maior impacto.
          </Trans>
        </SmallInfoCard>
      </div>

      {/* optional reminder */}
      <div className="rounded-md p-3 bg-base-200 text-sm">
        <strong className="mr-2">{t`Lembrete:`}</strong>
        <span>
          <Trans>
            Voluntariado transforma a nossa capacidade de ajudar — cada horário
            colaborado faz a diferença. Obrigado por considerar participar.
          </Trans>
        </span>
      </div>

      {/* main process */}
      <Card>
        <div className="py-2 px-6">
          <h4 className="font-semibold text-base mb-4">{t`Como funciona`}</h4>
          <div className="divide-y">
            {STEPS.map((s, idx) => (
              <div key={s.key} className="py-4 flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-info text-info-content flex items-center justify-center font-bold">
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

export default VoluntariadoContent;
