'use client'

import { useState, useRef, useEffect } from 'react'
import { ZoomIn, X } from 'lucide-react'

interface ImageZoomProps {
  src: string
  alt: string
  className?: string
}

export default function ImageZoom({ src, alt, className = "" }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    setPosition({ x: xPercent, y: yPercent })
  }

  const handleMouseEnter = () => setIsZoomed(true)
  const handleMouseLeave = () => setIsZoomed(false)

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-zoom-in group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-200"
          style={{
            transform: isZoomed ? 'scale(2)' : 'scale(1)',
            transformOrigin: `${position.x}% ${position.y}%`
          }}
        />
        
        {/* Zoom indicator */}
        <div className="absolute top-2 right-2 p-2 bg-dark-bg/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn className="h-4 w-4 text-text-light" />
        </div>
      </div>
    </div>
  )
}

interface FullscreenZoomProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function FullscreenZoom({ src, alt, isOpen, onClose }: FullscreenZoomProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-text-light hover:text-brand-gold transition-colors"
      >
        <X className="h-6 w-6" />
      </button>
      
      <div className="relative max-w-4xl max-h-full">
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  )
}
