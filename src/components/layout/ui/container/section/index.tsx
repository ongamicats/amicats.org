import { Container } from '..';
import { Section } from '../../section';
import { cn } from '@/components/layout/shared/helpers/class.helper';

type SectionContainerProps = {
  containerId: string;
  sectionId: string;
  children: React.ReactNode;
  background?: string;
  className?: string;
};

export const SectionContainer = ({
  containerId,
  sectionId,
  background = 'bg-base-100',
  children,
  className,
}: SectionContainerProps) => {
  return (
    <Container id={containerId} className={cn(className)} fluid>
      <Section id={sectionId} className={cn(background)}>
        {children}
      </Section>
    </Container>
  );
};
