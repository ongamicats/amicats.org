import { cn } from "@/components/layout/shared/helpers/class.helper"

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'col'
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around'
    gap?: number
}

export function Flex({
    children,
    className,
    direction = 'row',
    align,
    justify,
    gap,
    ...props
}: FlexProps) {
    const directionClass = direction === 'col' ? 'flex-col' : 'flex-row'
    const alignClass = align ? `items-${align}` : ''
    const justifyClass = justify ? `justify-${justify}` : ''
    const gapClass = gap ? `gap-${gap}` : ''

    return (
        <div
            className={cn("flex", directionClass, alignClass, justifyClass, gapClass, className)}
            {...props}
        >
            {children}
        </div>
    )
}
