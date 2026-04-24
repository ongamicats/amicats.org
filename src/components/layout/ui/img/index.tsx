import { cn } from '../../shared/helpers/class.helper'

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  mobileSrc?: string
  mobileClassName?: string
  landscapeSrc?: string
  landscapeClassName?: string
}

export function Img({
  className,
  src,
  alt,
  mobileSrc,
  mobileClassName,
  landscapeSrc,
  landscapeClassName,
  ...props
}: ImgProps) {
  return (
    <>
      <img
        src={mobileSrc ?? src}
        alt={alt}
        className={cn('block w-full md:hidden', mobileClassName)}
        {...props}
      />
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-auto hidden md:block',
          landscapeSrc ? 'landscape-mobile:hidden' : '',
          className,
        )}
        {...props}
      />
      {landscapeSrc && (
        <img
          src={landscapeSrc}
          alt={alt}
          className={cn('hidden landscape-mobile:block', landscapeClassName)}
          {...props}
        />
      )}
    </>
  )
}
