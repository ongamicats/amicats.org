import { useLingui } from '@lingui/react/macro';
import { msg } from '@lingui/core/macro';
import { Img } from '../img';
import { Avatar } from '@/components/layout/daisy/data-display/avatar';
import { AvatarGroup } from '@/components/layout/daisy/data-display/avatar-group';

type ResgatesProps = {
  count?: number;
  socorristas: Array<{
    nome: string;
    img: string;
  }>;
};

export function Resgates({ count = 400, socorristas }: ResgatesProps) {
  const { t } = useLingui();
  return (
    <div className="mt-12 flex items-center gap-4">
      <AvatarGroup>
        {socorristas.map((socorrista, index) => (
          <Avatar key={index} className="border-base-100">
            <Img src={socorrista.img} alt={t`Socorrista ${index + 1}`} />
          </Avatar>
        ))}
      </AvatarGroup>
      <p className="text-sm font-semibold opacity-70">
        <span className="font-semibold">+{count}</span> {t`resgates realizados`}
      </p>
    </div>
  );
}
