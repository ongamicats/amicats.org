import { useEffect, useState } from 'react'
import { Container } from '../container'

export interface ImageStackProps {
  images: Array<string>
}

export function ImageStack({ images }: ImageStackProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [images.length])

  return (
    <Container
      id={'image-stack'}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div className="relative w-full max-w-[min(100%,60dvh)] aspect-2/3">
        {images.map((src, index) => {
          const offset =
            (index - currentImageIndex + images.length) % images.length
          const isActive = offset === 0
          const isNext = offset === 1
          const isLast = offset === images.length - 1

          let zIndex = 0
          let opacity = 0
          let transform = 'translate(100%, 0) rotate(10deg)'

          if (isActive) {
            zIndex = 40
            opacity = 1
            transform = 'translate(0, 0) rotate(0deg)'
          } else if (isNext) {
            zIndex = 30
            opacity = 0.8
            transform = 'translate(4%, 4%) rotate(6deg) scale(0.95)'
          } else if (offset === 2) {
            zIndex = 20
            opacity = 0.6
            transform = 'translate(8%, 8%) rotate(10deg) scale(0.9)'
          } else if (isLast) {
            zIndex = 0
            opacity = 0
            transform = 'translate(-4%, -4%) rotate(-4deg) scale(1.05)'
          }

          return (
            <div
              key={index}
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out border-4 border-base-100"
              style={{
                zIndex,
                opacity: isActive || isNext || offset === 2 ? opacity : 0,
                transform,
              }}
            >
              <img
                src={src}
                className="w-full h-full object-cover"
                alt={`Stack Image ${index + 1}`}
              />
            </div>
          )
        })}
      </div>
      <div className="absolute bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full -z-10 opacity-50 blur-xl animate-pulse"></div>
    </Container>
  )
}
