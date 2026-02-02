export interface HeroContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export function HeroContent({ children, className, ...props }: HeroContentProps) {
    return (
        <div className={`hero-content ${className || ''}`} {...props}>
            {children}
        </div>
    )
}
