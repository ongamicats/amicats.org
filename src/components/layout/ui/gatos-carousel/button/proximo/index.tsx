import { ChevronRight } from 'lucide-react'
import type {
  ComponentColor,
  ComponentShape,
} from '@/components/layout/shared/types/types.constants'
import { cn } from '@/components/layout/shared/helpers/class.helper'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export interface ProximoButtonProps {
  shape?: ComponentShape
  color?: ComponentColor
  onClick?: () => void
  className?: string
}

export function ProximoButton({
  shape = 'circle',
  color = 'primary',
  onClick,
  className,
}: ProximoButtonProps) {
  const { i18n } = useLingui()

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={i18n._(t`Próximo`)}
      className={cn(
        'btn',
        `btn-${color}`,
        shape === 'circle' && 'btn-circle',
        shape === 'square' && 'btn-square',
        'shadow-md',
        className,
      )}
    >
      <ChevronRight size={20} />
    </button>
  )
}
