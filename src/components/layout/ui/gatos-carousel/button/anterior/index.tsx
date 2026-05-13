import { ChevronLeft } from 'lucide-react';
import { useLingui } from '@lingui/react/macro';
import type {
  ComponentColor,
  ComponentShape,
} from '@/components/layout/shared/types/types.constants';
import { cn } from '@/components/layout/shared/helpers/class.helper';

export interface AnteriorButtonProps {
  shape?: ComponentShape;
  color?: ComponentColor;
  onClick?: () => void;
  className?: string;
}

export function AnteriorButton({
  shape = 'circle',
  color = 'primary',
  onClick,
  className,
}: AnteriorButtonProps) {
  const { t } = useLingui();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t`Anterior`}
      className={cn(
        'btn',
        `btn-${color}`,
        shape === 'circle' && 'btn-circle',
        shape === 'square' && 'btn-square',
        'shadow-md',
        className,
      )}
    >
      <ChevronLeft size={20} />
    </button>
  );
}
