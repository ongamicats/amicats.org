import { cn } from '@/components/layout/shared/helpers/class.helper';

export function CardBody({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('card-body', className)} {...props}>
      {children}
    </div>
  );
}
