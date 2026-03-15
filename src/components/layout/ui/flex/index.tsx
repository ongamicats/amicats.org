import { cn } from "@/components/layout/shared/helpers/class.helper"

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'col'
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around'
    gap?: number
    reverse?: boolean
    stackAt?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    grow?: boolean
    growAt?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const stackAtRowClasses: Record<string, string> = {
    sm: 'sm:flex-row',
    md: 'md:flex-row',
    lg: 'lg:flex-row',
    xl: 'xl:flex-row',
    '2xl': '2xl:flex-row',
}

const stackAtReverseClasses: Record<string, string> = {
    sm: 'sm:flex-row-reverse',
    md: 'md:flex-row-reverse',
    lg: 'lg:flex-row-reverse',
    xl: 'xl:flex-row-reverse',
    '2xl': '2xl:flex-row-reverse',
}

const growAtClasses: Record<string, string> = {
    sm: 'sm:flex-1 sm:min-w-0',
    md: 'md:flex-1 md:min-w-0',
    lg: 'lg:flex-1 lg:min-w-0',
    xl: 'xl:flex-1 xl:min-w-0',
    '2xl': '2xl:flex-1 2xl:min-w-0',
}

export function Flex({
    children,
    className,
    direction = 'row',
    align,
    justify,
    gap,
    reverse = false,
    stackAt,
    grow = false,
    growAt,
    ...props
}: FlexProps) {
    let directionClass: string
    if (stackAt && direction !== 'col') {
        // Use col-reverse when reverse so that in column layout the DOM-last child (text) appears on top
        const baseCol = reverse ? 'flex-col-reverse' : 'flex-col'
        directionClass = cn(baseCol, reverse ? stackAtReverseClasses[stackAt] : stackAtRowClasses[stackAt])
    } else {
        directionClass = direction === 'col' ? 'flex-col' : (reverse ? 'flex-row-reverse' : 'flex-row')
    }

    const alignClass = align ? `items-${align}` : ''
    const justifyClass = justify ? `justify-${justify}` : ''
    const gapClass = gap ? `gap-${gap}` : ''
    const growClass = growAt ? growAtClasses[growAt] : (grow ? 'flex-1 min-w-0' : '')

    return (
        <div
            className={cn("flex", directionClass, alignClass, justifyClass, gapClass, growClass, className)}
            {...props}
        >
            {children}
        </div>
    )
}
