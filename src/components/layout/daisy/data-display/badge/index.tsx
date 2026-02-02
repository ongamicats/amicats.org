import { cn } from "../../../shared/helpers/class.helper"
import { ComponentColor, ComponentSize } from "../../../shared/types/types.constants"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: ComponentColor
    size?: ComponentSize
    outline?: boolean
}

export function Badge({ children, className, variant, size, outline, ...props }: BadgeProps) {
    const variantClass = variant ? `badge-${variant}` : ''
    const sizeClass = size ? `badge-${size}` : ''
    const outlineClass = outline ? 'badge-outline' : ''

    return (
        <div
            className={cn("badge", variantClass, sizeClass, outlineClass, className)}
            {...props}
        >
            {children}
        </div>
    )
}
