import { cn } from "../../../shared/helpers/class.helper"

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AvatarGroup({ children, className, ...props }: AvatarGroupProps) {
    return (
        <div className={cn("avatar-group -space-x-6 rtl:space-x-reverse", className)} {...props}>
            {children}
        </div>
    )
}
