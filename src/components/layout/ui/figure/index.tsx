import { cn } from '@/components/layout/shared/helpers/class.helper'

export interface FigureProps extends React.HTMLAttributes<HTMLElement> {}

export function Figure({ children, className, ...props }: FigureProps) {
  return (
    <figure className={cn(className)} {...props}>
      {children}
    </figure>
  )
}
