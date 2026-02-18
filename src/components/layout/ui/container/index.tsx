export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    fluid?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Container({ children, className, fluid = false, size = 'xl', ...props }: ContainerProps) {
    const maxWidths = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
    }

    return (
        <div
            className={`mx-auto px-4 ${fluid ? 'max-w-none' : maxWidths[size]} ${className || ''}`}
            {...props}
        >
            {children}
        </div>
    )
}
