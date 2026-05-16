import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Trans, useLingui } from '@lingui/react/macro';
import { CreditCard, Repeat, Copy, FileText, Info } from 'lucide-react';
import { cn } from '@/components/layout/shared/helpers/class.helper';

interface Props {
  locale: string;
}

export function DonationCard({ locale }: Props) {
  const { t } = useLingui();
  const PIX = '27.806.981/0001-15';
  const boleto = 'https://www.asaas.com/c/905196576946';
  const recurring1 = 'https://www.asaas.com/c/259222385152';
  const recurring2 = 'https://apoia.se/resgateemanutencaoong';

  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(PIX);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <section className={cn('rounded-lg bg-base-200 p-6 shadow-sm')}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: One-time donation */}
        <div className={cn('bg-base-100 rounded-md p-4')}> 
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">{t`Doação Única`}</h3>
              <p className="text-base-content/80">{t`Contribua com qualquer valor através de PIX, boleto ou cartão`}</p>
            </div>
            <CreditCard className="text-primary" />
          </div>

          <div className="mt-4 rounded-md bg-base-200 p-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-base-content/80">{t`PIX (CNPJ):`}</div>
              <div className="font-mono font-medium">{PIX}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-ghost btn-sm flex items-center gap-2"
                onClick={handleCopy}
                aria-live="polite"
                aria-label={copied ? t`Copiado` : t`Copiar PIX`}
              >
                <Copy className="h-4 w-4" />
                {copied ? <Trans>Copiado</Trans> : <Trans>Copiar</Trans>}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <a className="btn btn-outline w-full sm:w-auto flex items-center gap-2" href={boleto} target="_blank" rel="noreferrer">
              <FileText className="h-4 w-4" />
              <Trans>Doe por Boleto</Trans>
            </a>
          </div>
        </div>

        {/* Right: Recurring donations */}
        <div className={cn('bg-base-100 rounded-md p-4')}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">{t`Doação Recorrente`}</h3>
              <p className="text-base-content/80">{t`Contribua mensalmente e nos ajude a planejar melhor`}</p>
              <p className="text-base-content/80 mt-2">{t`Escolha o valor mensal que cabe no seu orçamento`}</p>
            </div>
            <Repeat className="text-secondary" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            <a className="btn btn-outline flex items-center gap-2" href={recurring1} target="_blank" rel="noreferrer">
              <Repeat className="h-4 w-4" />
              <Trans>Doação recorrente (Asaas)</Trans>
            </a>
            <a className="btn btn-outline flex items-center gap-2" href={recurring2} target="_blank" rel="noreferrer">
              <Repeat className="h-4 w-4" />
              <Trans>Doação recorrente (Apoia.se)</Trans>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link to={`/${locale}/como-funciona/?section=apadrinhamento`} className="btn btn-ghost flex items-center gap-2">
          <Info className="h-4 w-4" />
          <Trans>Saiba como apadrinhar</Trans>
        </Link>
      </div>
    </section>
  );
}

// Note: no default export — components in this codebase use named exports
