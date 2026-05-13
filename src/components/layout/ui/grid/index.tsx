import { cn } from '@/components/layout/shared/helpers/class.helper';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number;
  smCols?: number;
  mdCols?: number;
  lgCols?: number;
  xlCols?: number;
}

const baseColsClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

const smColsClasses: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
};

const mdColsClasses: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

const lgColsClasses: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

const xlColsClasses: Record<number, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
};

export function Grid({
  children,
  className,
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  xlCols,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        baseColsClasses[cols] ?? 'grid-cols-1',
        smCols ? smColsClasses[smCols] : '',
        mdCols ? mdColsClasses[mdCols] : '',
        lgCols ? lgColsClasses[lgCols] : '',
        xlCols ? xlColsClasses[xlCols] : '',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
