import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Card } from '@/components/layout/daisy/data-display/card';
import { cn } from '@/components/layout/shared/helpers/class.helper';

interface SmallInfoCardProps {
  title: ReactNode;
  children: ReactNode;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export function SmallInfoCard({
  title,
  children,
  Icon,
  className,
}: SmallInfoCardProps) {
  return (
    <Card>
      <div
        data-testid="small-info-card"
        className={cn('p-4 flex items-center', className)}
      >
        {/* content area — 5/6 of card */}
        <div className="w-7/8 pr-3">
          <h5 className="font-semibold mb-2">{title}</h5>
          <p className="text-sm opacity-90">{children}</p>
        </div>

        {/* icon area — 1/6 of card, icon centered inside its own container */}
        <div
          data-testid="small-info-card-icon"
          className="w-1/8 flex items-center justify-center h-full"
        >
          <div className="flex items-center justify-center w-full h-full">
            {/* inner wrapper scaled to ~60% of container */}
            <div className="w-12 h-12 flex items-center justify-center">
              <Icon className="w-full h-full" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Named export only (project convention)
