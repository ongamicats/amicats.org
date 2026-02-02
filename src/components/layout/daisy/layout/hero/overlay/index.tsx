export interface HeroOverlayProps extends React.HTMLAttributes<HTMLDivElement> { }

export function HeroOverlay({ className, ...props }: HeroOverlayProps) {
    return <div className={`hero-overlay ${className || ''}`} {...props} />
}
