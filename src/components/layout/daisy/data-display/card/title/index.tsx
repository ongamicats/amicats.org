import { cn } from '@/components/layout/shared/helpers/class.helper';

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('card-title', className)} {...props}>
      {children}
    </h2>
  );
}
