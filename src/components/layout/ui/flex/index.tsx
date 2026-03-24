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
    mobileHidden?: boolean
    desktopHidden?: boolean
    mobileJustify?: 'start' | 'center' | 'end' | 'between' | 'around'
    mobileAlign?: 'start' | 'center' | 'end' | 'stretch'
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

const mobileJustifyClasses: Record<string, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
}

const desktopJustifyClasses: Record<string, string> = {
    start: 'md:justify-start',
    center: 'md:justify-center',
    end: 'md:justify-end',
    between: 'md:justify-between',
    around: 'md:justify-around',
}

const mobileAlignClasses: Record<string, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
}

const desktopAlignClasses: Record<string, string> = {
    start: 'md:items-start',
    center: 'md:items-center',
    end: 'md:items-end',
    stretch: 'md:items-stretch',
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
    mobileHidden = false,
    desktopHidden = false,
    mobileJustify,
    mobileAlign,
    ...props
}: FlexProps) {
    let directionClass: string
    if (stackAt && direction !== 'col') {
        const baseCol = reverse ? 'flex-col-reverse' : 'flex-col'
        directionClass = cn(baseCol, reverse ? stackAtReverseClasses[stackAt] : stackAtRowClasses[stackAt])
    } else {
        directionClass = direction === 'col' ? 'flex-col' : (reverse ? 'flex-row-reverse' : 'flex-row')
    }

    let alignClass: string
    if (mobileAlign && align) {
        alignClass = cn(mobileAlignClasses[mobileAlign], desktopAlignClasses[align])
    } else if (mobileAlign) {
        alignClass = mobileAlignClasses[mobileAlign]
    } else {
        alignClass = align ? `items-${align}` : ''
    }

    let justifyClass: string
    if (mobileJustify && justify) {
        justifyClass = cn(mobileJustifyClasses[mobileJustify], desktopJustifyClasses[justify])
    } else if (mobileJustify) {
        justifyClass = mobileJustifyClasses[mobileJustify]
    } else {
        justifyClass = justify ? `justify-${justify}` : ''
    }

    const gapClass = gap ? `gap-${gap}` : ''
    const growClass = growAt ? growAtClasses[growAt] : (grow ? 'flex-1 min-w-0' : '')
    const visibilityClass = mobileHidden ? 'hidden md:flex ' : desktopHidden ? 'md:hidden' : ''

    return (
        <div
            className={cn("flex", directionClass, alignClass, justifyClass, gapClass, growClass, visibilityClass, className)}
            {...props}
        >
            {children}
        </div>
    )
}
