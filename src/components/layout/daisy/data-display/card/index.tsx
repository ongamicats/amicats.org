import { cn } from "@/components/layout/shared/helpers/class.helper"
import { CardBody } from "./body"
import { CardTitle } from "./title"
import { CardActions } from "./actions"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'normal' | 'compact' | 'side'
}

export function Card({ children, className, variant = 'normal', ...props }: CardProps) {
    return (
        <div className={cn("card",
            variant === 'compact' && "card-compact",
            variant === 'side' && "card-side",
            "bg-base-100 shadow-xl",
            className)}
            {...props}>
            {children}
        </div>
    )
}

export const CardComponent = Object.assign(Card, {
    Body: CardBody,
    Title: CardTitle,
    Actions: CardActions
})
