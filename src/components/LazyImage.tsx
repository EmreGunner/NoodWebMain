import React, { useState, useEffect } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState('/placeholder.jpg')
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    let observer: IntersectionObserver
    let didCancel = false

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src)
                observer.unobserve(imageRef)
              }
            })
          },
          {
            threshold: 0.01,
            rootMargin: '75%'
          }
        )
        observer.observe(imageRef)
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        setImageSrc(src)
      }
    }
    return () => {
      didCancel = true
      if (observer && imageRef) {
        observer.unobserve(imageRef)
      }
    }
  }, [src, imageSrc, imageRef])

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`transition duration-500 ease-in-out ${className}`}
    />
  )
}

export default LazyImage