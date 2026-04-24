import type React from 'react'
import { cn } from '@/components/layout/shared/helpers/class.helper'

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  snap?: 'start' | 'center' | 'end'
  vertical?: boolean
}

export function Carousel({
  children,
  className,
  snap = 'start',
  vertical = false,
  ...props
}: CarouselProps) {
  return (
    <div
      className={cn(
        'carousel',
        snap === 'center' && 'carousel-center',
        snap === 'end' && 'carousel-end',
        vertical && 'carousel-vertical',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CarouselItem({
  children,
  className,
  ...props
}: CarouselItemProps) {
  return (
    <div className={cn('carousel-item', className)} {...props}>
      {children}
    </div>
  )
}

export const CarouselComponent = Object.assign(Carousel, {
  Item: CarouselItem,
})
