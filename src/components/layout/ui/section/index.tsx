import { cn } from "@/components/layout/shared/helpers/class.helper"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> { }

export function Section({ children, className, ...props }: SectionProps) {
    return (
        <section className={cn(className)} {...props}>
            {children}
        </section>
    )
}
