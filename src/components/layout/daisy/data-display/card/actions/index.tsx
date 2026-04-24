import { cn } from '@/components/layout/shared/helpers/class.helper'

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardActions({
  children,
  className,
  ...props
}: CardActionsProps) {
  return (
    <div className={cn('card-actions', className)} {...props}>
      {children}
    </div>
  )
}
