import { cn } from "../../shared/helpers/class.helper";

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    mobileSrc?: string
    mobileClassName?: string
}

export function Img({ className, src, alt, mobileSrc, mobileClassName, ...props }: ImgProps) {
    return (
        <>
            <img
                src={mobileSrc ?? src}
                alt={alt}
                className={cn("block w-full md:hidden", mobileClassName)}
                {...props}
            />
            <img
                src={src}
                alt={alt}
                className={cn("block w-full h-auto hidden md:block", className)}
                {...props}
            />
        </>
    )
}
