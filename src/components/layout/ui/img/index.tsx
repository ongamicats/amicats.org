import { cn } from "../../shared/helpers/class.helper";

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> { }

export function Img({ className, src, alt, ...props }: ImgProps) {
    return (
        <img
            src={src}
            alt={alt}
            className={cn("block w-full h-auto", className)}
            {...props}
        />
    )
}
