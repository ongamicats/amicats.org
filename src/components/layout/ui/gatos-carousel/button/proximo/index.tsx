import { ChevronRight } from 'lucide-react'
import type {
  ComponentColor,
  ComponentShape,
} from '@/components/layout/shared/types/types.constants'
import { cn } from '@/components/layout/shared/helpers/class.helper'

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
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Próximo"
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
