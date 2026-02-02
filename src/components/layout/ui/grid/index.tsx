import { cn } from "@/components/layout/shared/helpers/class.helper"

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: number
}

export function Grid({ children, className, cols = 1, ...props }: GridProps) {
    const colsClass = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
    }[cols] || "grid-cols-1"

    return (
        <div className={cn("grid", colsClass, className)} {...props}>
            {children}
        </div>
    )
}
