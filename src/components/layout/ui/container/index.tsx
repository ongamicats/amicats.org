import { cn } from "../../shared/helpers/class.helper";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    fluid?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses: Record<string, string> = {
    sm: 'px-4',
    md: 'px-8',
    lg: 'px-12',
}

export function Container({ id, fluid = false, size = 'xl', spacing, children, className, ...props }: ContainerProps) {
    const maxWidths = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
    }

    return (
        <div
            id={id}
            className={cn(
                `@container/${id}`,
                { 'max-w-none': fluid, [maxWidths[size]]: !fluid },
                spacing ? spacingClasses[spacing] : '',
                className)}
            {...props}
        >
            {children}
        </div>
    )
}
