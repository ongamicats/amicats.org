import { HeroContent } from './content'
import { HeroOverlay } from './overlay'

export interface HeroRootProps extends React.HTMLAttributes<HTMLDivElement> {
    backgroundImage?: string
}

function HeroRoot({ children, className, backgroundImage, style, ...props }: HeroRootProps) {
    const bgStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})`, ...style } : style

    return (
        <div
            className={`hero min-h-screen ${className || ''}`}
            style={bgStyle}
            {...props}
        >
            {children}
        </div>
    )
}

export const Hero = Object.assign(HeroRoot, {
    Content: HeroContent,
    Overlay: HeroOverlay
})
