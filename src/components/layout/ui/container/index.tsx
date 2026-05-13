import { cn } from '../../shared/helpers/class.helper';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  fluid?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'sm' | 'md' | 'lg';
  fullHeight?: boolean;
  overflow?: 'hidden' | 'auto' | 'scroll';
}

const spacingClasses: Record<string, string> = {
  sm: 'px-2 sm:px-4',
  md: 'px-4 sm:px-8',
  lg: 'px-4 sm:px-8 md:px-12',
};

const overflowClasses: Record<string, string> = {
  hidden: 'overflow-hidden',
  auto: 'overflow-auto',
  scroll: 'overflow-scroll',
};

export function Container({
  id,
  fluid = false,
  size = 'xl',
  spacing,
  fullHeight,
  overflow,
  children,
  className,
  ...props
}: ContainerProps) {
  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
  };

  return (
    <div
      id={id}
      className={cn(
        `@container/${id}`,
        { 'max-w-none': fluid, [maxWidths[size]]: !fluid },
        spacing ? spacingClasses[spacing] : '',
        fullHeight ? 'h-dvh' : '',
        overflow ? overflowClasses[overflow] : '',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
