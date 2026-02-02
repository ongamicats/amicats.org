import { cn } from "../../../shared/helpers/class.helper"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    online?: boolean
    offline?: boolean
    placeholder?: boolean
    rounded?: boolean
}

export function Avatar({ children, className, online, offline, placeholder, rounded = false, ...props }: AvatarProps) {
    return (
        <div className={cn("avatar",
            online && "online",
            offline && "offline",
            placeholder && "placeholder",
            className
        )} {...props}>
            <div className={cn("w-10", rounded && "rounded-full")}>
                {children}
            </div>
        </div>
    )
}
